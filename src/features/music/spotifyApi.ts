const SPOTIFY_API_URL = 'https://open.spotify.com/embed/iframe-api/v1';

interface SpotifyPlaybackUpdate {
  readonly data: { readonly isPaused: boolean };
}

export interface SpotifyController {
  pause(): void;
  addListener(event: 'playback_update', listener: (update: SpotifyPlaybackUpdate) => void): void;
}

interface SpotifyControllerOptions {
  readonly uri: string;
  readonly width: string;
  readonly height: number;
}

export interface SpotifyIframeApi {
  createController(
    element: HTMLElement,
    options: SpotifyControllerOptions,
    callback: (controller: SpotifyController) => void,
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

let apiPromise: Promise<SpotifyIframeApi> | null = null;

export function loadSpotifyApi(): Promise<SpotifyIframeApi> {
  apiPromise ??= new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement('script');
    script.src = SPOTIFY_API_URL;
    script.async = true;
    script.onerror = () => reject(new Error('No se pudo cargar Spotify'));
    document.head.append(script);
  });
  return apiPromise;
}
