import confetti from 'canvas-confetti';
import { createElement, prefersReducedMotion, requireElement } from '../../core/dom';

const STAR_COUNT = 90;
const CONFETTI_COLORS = ['#b6ff3b', '#9b4dff', '#ff7ac6', '#7cc8ff', '#fff6e9'];
const CONFETTI_SECOND_WAVE_MS = 350;
const REVEAL_THRESHOLD = 0.1;

export function createStars(): void {
  const stars = Array.from({ length: STAR_COUNT }, () => {
    const star = createElement('span', 'star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--size', `${1 + Math.random() * 3}px`);
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    star.style.setProperty('--delay', `${-Math.random() * 6}s`);
    return star;
  });
  requireElement('.sky').append(...stars);
}

export function observeReveals(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: REVEAL_THRESHOLD });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

export function launchConfetti(): void {
  if (prefersReducedMotion()) return;

  const shoot = (originX: number, angle: number): void => {
    void confetti({ particleCount: 120, spread: 80, angle, origin: { x: originX, y: 0.7 }, colors: CONFETTI_COLORS });
  };

  shoot(0, 60);
  shoot(1, 120);
  window.setTimeout(() => shoot(0.5, 90), CONFETTI_SECOND_WAVE_MS);
}
