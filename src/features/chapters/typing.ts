const TYPING_DELAY_MS = 28;
const TYPING_VISIBILITY_THRESHOLD = 0.6;

function typeMessage(element: HTMLElement, shouldAnimate: boolean): void {
  const text = element.dataset.text ?? '';
  if (!shouldAnimate) {
    element.textContent = text;
    return;
  }

  let position = 0;
  const timer = window.setInterval(() => {
    position++;
    element.textContent = text.slice(0, position);
    if (position >= text.length) window.clearInterval(timer);
  }, TYPING_DELAY_MS);
}

export function observeTypedMessages(shouldAnimate: boolean): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
      typeMessage(entry.target, shouldAnimate);
      observer.unobserve(entry.target);
    });
  }, { threshold: TYPING_VISIBILITY_THRESHOLD });

  document.querySelectorAll<HTMLElement>('.typed').forEach((element) => observer.observe(element));
}
