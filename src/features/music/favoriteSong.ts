import type { FavoriteSong } from '../../config/types';
import { requireElement, setText } from '../../core/dom';
import { loadYouTubeApi, YOUTUBE_STATE_PLAYING, type YouTubePlayer } from './youtubeApi';

const SONG_DUCK_VOLUME = 20;
const SONG_FULL_VOLUME = 100;

export interface FavoriteSongPlayer {
  play(): void;
  pause(): void;
  duck(shouldDuck: boolean): void;
}

interface FavoriteSongHooks {
  readonly isVoicePlaying: () => boolean;
  readonly onPlay: () => void;
}

export function mountFavoriteSong(song: FavoriteSong, { isVoicePlaying, onPlay }: FavoriteSongHooks): FavoriteSongPlayer {
  const section = requireElement('#cancion');
  setText('#song-title', song.title);
  setText('#song-artist', song.artist);
  requireElement<HTMLAnchorElement>('#song-link').href = song.originalUrl;
  section.hidden = false;

  let player: YouTubePlayer | null = null;
  let wantsPlay = false;

  const duck = (shouldDuck: boolean): void => {
    player?.setVolume(shouldDuck ? SONG_DUCK_VOLUME : SONG_FULL_VOLUME);
  };

  const play = (): void => {
    if (!player) {
      wantsPlay = true;
      return;
    }
    player.playVideo();
  };

  const markOffline = (): void => section.classList.add('is-offline');
  let isUsingFallback = false;

  const switchToFallback = (failedPlayer: YouTubePlayer): void => {
    if (isUsingFallback) {
      markOffline();
      return;
    }
    isUsingFallback = true;
    failedPlayer.loadVideoById(song.fallbackYoutubeId);
  };

  loadYouTubeApi()
    .then((YT) => {
      new YT.Player('song-player', {
        videoId: song.youtubeId,
        playerVars: { rel: 0, playsinline: 1 },
        events: {
          onReady: (event) => {
            player = event.target;
            duck(isVoicePlaying());
            if (wantsPlay) play();
          },
          onStateChange: (event) => {
            if (event.data === YOUTUBE_STATE_PLAYING) onPlay();
          },
          onError: (event) => switchToFallback(event.target),
        },
      });
    })
    .catch(markOffline);

  const pause = (): void => {
    wantsPlay = false;
    player?.pauseVideo();
  };

  return { play, pause, duck };
}
