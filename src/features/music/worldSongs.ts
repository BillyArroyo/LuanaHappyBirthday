import { createElement } from '../../core/dom';
import { loadSpotifyApi } from './spotifyApi';
import { loadYouTubeApi, YOUTUBE_STATE_PLAYING } from './youtubeApi';

const SPOTIFY_PLAYER_HEIGHT = 152;

export interface WorldSongPlayers {
  pauseAll(): void;
}

interface SongSlot {
  readonly element: HTMLElement;
  readonly card: Element | null;
  readonly youtubeId: string;
  readonly spotifyTrackId: string;
}

type Pause = () => void;

function readSlots(): SongSlot[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-youtube-id]')).map((element) => ({
    element,
    card: element.closest('.record'),
    youtubeId: element.dataset.youtubeId ?? '',
    spotifyTrackId: element.dataset.spotifyTrack ?? '',
  }));
}

export function mountWorldSongs(onSongPlay: () => void): WorldSongPlayers {
  const pausers = new Set<Pause>();

  const handlePlaying = (slot: SongSlot, current: Pause, isPlaying: boolean): void => {
    slot.card?.classList.toggle('is-playing', isPlaying);
    if (!isPlaying) return;
    pausers.forEach((pause) => {
      if (pause !== current) pause();
    });
    onSongPlay();
  };

  const mountSpotify = (slot: SongSlot): void => {
    slot.element.classList.add('is-spotify');
    const target = createElement('div');
    slot.element.replaceChildren(target);
    loadSpotifyApi()
      .then((api) => {
        api.createController(
          target,
          { uri: `spotify:track:${slot.spotifyTrackId}`, width: '100%', height: SPOTIFY_PLAYER_HEIGHT },
          (controller) => {
            const pause: Pause = () => controller.pause();
            pausers.add(pause);
            controller.addListener('playback_update', ({ data }) => handlePlaying(slot, pause, !data.isPaused));
          },
        );
      })
      .catch(() => slot.card?.classList.add('is-offline'));
  };

  const mountYouTube = (slot: SongSlot): void => {
    const target = createElement('div');
    target.id = `song-${slot.youtubeId}`;
    slot.element.replaceChildren(target);
    loadYouTubeApi()
      .then((YT) => {
        let pause: Pause = () => undefined;
        new YT.Player(target.id, {
          videoId: slot.youtubeId,
          playerVars: { rel: 0, playsinline: 1 },
          events: {
            onReady: ({ target: player }) => {
              pause = () => player.pauseVideo();
              pausers.add(pause);
            },
            onStateChange: ({ data }) => handlePlaying(slot, pause, data === YOUTUBE_STATE_PLAYING),
            onError: () => {
              pausers.delete(pause);
              mountSpotify(slot);
            },
          },
        });
      })
      .catch(() => mountSpotify(slot));
  };

  readSlots().forEach(mountYouTube);

  return {
    pauseAll: () => pausers.forEach((pause) => pause()),
  };
}
