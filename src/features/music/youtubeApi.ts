const YOUTUBE_API_URL = 'https://www.youtube.com/iframe_api';

export const YOUTUBE_STATE_PLAYING = 1;

export interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(videoId: string): void;
  setVolume(volume: number): void;
}

interface YouTubePlayerEvent {
  readonly target: YouTubePlayer;
}

interface YouTubeStateChangeEvent {
  readonly data: number;
}

interface YouTubePlayerOptions {
  readonly videoId: string;
  readonly playerVars?: Readonly<Record<string, number | string>>;
  readonly events?: {
    readonly onReady?: (event: YouTubePlayerEvent) => void;
    readonly onStateChange?: (event: YouTubeStateChangeEvent) => void;
    readonly onError?: (event: YouTubePlayerEvent) => void;
  };
}

export interface YouTubeNamespace {
  Player: new (elementId: string, options: YouTubePlayerOptions) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeNamespace> | null = null;

export function loadYouTubeApi(): Promise<YouTubeNamespace> {
  apiPromise ??= new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) resolve(window.YT);
      else reject(new Error('YouTube API sin inicializar'));
    };
    const script = document.createElement('script');
    script.src = YOUTUBE_API_URL;
    script.onerror = () => reject(new Error('No se pudo cargar YouTube'));
    document.head.append(script);
  });
  return apiPromise;
}
