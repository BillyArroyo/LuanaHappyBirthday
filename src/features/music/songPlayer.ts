import { createElement } from '../../core/dom';
import { formatTime } from '../../core/formatTime';

const PROGRESS_MAX = 100;

export interface SongPlayer {
  readonly element: HTMLElement;
  play(): void;
}

export function createSongPlayer(src: string, title: string, host: HTMLElement): SongPlayer {
  const element = createElement('div', 'song-player');
  const audio = createElement('audio');
  audio.src = src;
  audio.preload = 'metadata';
  audio.dataset.song = title;

  const toggle = createElement('button', 'song-player__toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-label', `Reproducir ${title}`);
  const icon = createElement('span', 'song-player__icon');
  icon.setAttribute('aria-hidden', 'true');
  toggle.append(icon);

  const progress = createElement('input', 'song-player__progress');
  progress.type = 'range';
  progress.min = '0';
  progress.max = String(PROGRESS_MAX);
  progress.step = '0.1';
  progress.value = '0';
  progress.setAttribute('aria-label', `Avance de ${title}`);

  const current = createElement('span', '', '0:00');
  const duration = createElement('span', '', '0:00');
  const time = createElement('p', 'song-player__time');
  time.append(current, ' / ', duration);

  const track = createElement('div', 'song-player__track');
  track.append(progress, time);
  element.append(toggle, track, audio);

  const play = (): void => {
    audio.play().catch(() => element.classList.add('is-waiting'));
  };

  const setPlaying = (isPlaying: boolean): void => {
    host.classList.toggle('is-playing', isPlaying);
    if (isPlaying) element.classList.remove('is-waiting');
    toggle.setAttribute('aria-label', `${isPlaying ? 'Pausar' : 'Reproducir'} ${title}`);
  };

  toggle.addEventListener('click', () => (audio.paused ? play() : audio.pause()));
  audio.addEventListener('play', () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progress.value = String((audio.currentTime / audio.duration) * PROGRESS_MAX);
    current.textContent = formatTime(audio.currentTime);
  });
  progress.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(progress.value) / PROGRESS_MAX) * audio.duration;
  });

  return { element, play };
}
