import { firstAudioIn } from '../../config/localMedia';
import type { VoiceMessageConfig } from '../../config/types';
import { createElement, requireElement, setText } from '../../core/dom';
import { formatTime } from '../../core/formatTime';

const WAVE_BAR_COUNT = 28;
const PROGRESS_MAX = 100;

export interface VoiceMessage {
  play(): void;
}

function renderWaveBars(container: HTMLElement): void {
  for (let index = 0; index < WAVE_BAR_COUNT; index++) {
    const bar = createElement('span', 'voice-bar');
    bar.style.setProperty('--h', `${30 + Math.random() * 70}%`);
    bar.style.setProperty('--i', String(index));
    container.append(bar);
  }
}

export function mountVoiceMessage(
  config: VoiceMessageConfig,
  onPlayingChange: (isPlaying: boolean) => void,
): VoiceMessage | null {
  const source = firstAudioIn('voz');
  if (!source) return null;

  const section = requireElement('#mensaje-voz');
  const audio = requireElement<HTMLAudioElement>('#voice-audio');
  const playButton = requireElement('#voice-play');
  const progress = requireElement<HTMLInputElement>('#voice-progress');
  const current = requireElement('#voice-current');
  const duration = requireElement('#voice-duration');

  audio.src = source;
  setText('#voice-title', config.title);
  renderWaveBars(requireElement('.voice-wave', section));

  const play = (): void => {
    audio.play().catch(() => section.classList.add('is-waiting'));
  };

  const setPlaying = (isPlaying: boolean): void => {
    section.classList.toggle('is-playing', isPlaying);
    if (isPlaying) section.classList.remove('is-waiting');
    playButton.setAttribute('aria-label', isPlaying ? 'Pausar mensaje' : 'Reproducir mensaje');
    onPlayingChange(isPlaying);
  };

  playButton.addEventListener('click', () => (audio.paused ? play() : audio.pause()));
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

  section.hidden = false;
  return { play };
}
