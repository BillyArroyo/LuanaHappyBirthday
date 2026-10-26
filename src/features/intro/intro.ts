import { requireElement } from '../../core/dom';

const INTRO_REMOVE_DELAY_MS = 900;

export function mountIntro(onOpen: () => void): void {
  const intro = requireElement('#intro');
  requireElement('#open-gift').addEventListener('click', () => {
    intro.classList.add('is-open');
    document.body.classList.remove('is-locked');
    onOpen();
    window.setTimeout(() => intro.remove(), INTRO_REMOVE_DELAY_MS);
  }, { once: true });
}
