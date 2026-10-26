import { createElement } from '../../core/dom';
import { loadSpotifyApi, type SpotifyController } from './spotifyApi';

const SPOTIFY_PLAYER_HEIGHT = 152;

export interface WorldSongPlayers {
  pauseAll(): void;
}

function mountFallbackEmbed(slot: HTMLElement, trackId: string): void {
  const iframe = createElement('iframe');
  iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
  iframe.height = String(SPOTIFY_PLAYER_HEIGHT);
  iframe.loading = 'lazy';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.title = 'Reproductor de Spotify';
  slot.replaceChildren(iframe);
}

export function mountWorldSongs(onSongPlay: () => void): WorldSongPlayers {
  const controllers: SpotifyController[] = [];
  const slots = Array.from(document.querySelectorAll<HTMLElement>('[data-spotify-track]'));

  const pauseOthers = (current: SpotifyController): void => {
    controllers.filter((controller) => controller !== current).forEach((controller) => controller.pause());
  };

  loadSpotifyApi()
    .then((api) => {
      slots.forEach((slot) => {
        const trackId = slot.dataset.spotifyTrack ?? '';
        const card = slot.closest('.record');
        const target = createElement('div');
        slot.replaceChildren(target);

        api.createController(
          target,
          { uri: `spotify:track:${trackId}`, width: '100%', height: SPOTIFY_PLAYER_HEIGHT },
          (controller) => {
            controllers.push(controller);
            controller.addListener('playback_update', ({ data }) => {
              card?.classList.toggle('is-playing', !data.isPaused);
              if (data.isPaused) return;
              pauseOthers(controller);
              onSongPlay();
            });
          },
        );
      });
    })
    .catch(() => {
      slots.forEach((slot) => mountFallbackEmbed(slot, slot.dataset.spotifyTrack ?? ''));
    });

  return {
    pauseAll: () => controllers.forEach((controller) => controller.pause()),
  };
}
