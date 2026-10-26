import { firstNamedPhoto, namedPhoto } from '../../config/localMedia';
import type { BirthdayConfig, World } from '../../config/types';
import { createElement, requireElement, setText } from '../../core/dom';

function createOpeningStrip(world: World, index: number): HTMLAnchorElement {
  const strip = createElement('a', `strip strip--${world.id}`);
  strip.href = `#${world.id}`;
  strip.style.setProperty('--i', String(index));
  strip.setAttribute('aria-label', `Ir a ${world.tag}`);

  const photoLayer = createElement('div', 'strip-photo');
  const photo = firstNamedPhoto(world.id, world.panel.photos);
  if (photo) photoLayer.style.backgroundImage = `url("${photo}")`;

  const speedLines = createElement('div', 'strip-lines');
  const sfx = createElement('span', 'strip-sfx', world.panel.sfx);
  [speedLines, sfx].forEach((element) => element.setAttribute('aria-hidden', 'true'));

  strip.append(
    photoLayer,
    speedLines,
    sfx,
    createElement('p', 'bubble', world.panel.bubble),
    createElement('span', 'strip-tag', world.tag),
  );
  return strip;
}

export function renderHero(config: BirthdayConfig): void {
  setText('#hero-name', config.name);
  setText('#hero-second-name', config.secondName);
  setText('#hero-age', String(config.age));
  setText('#hero-surname', config.surname);

  requireElement('#opening').append(...config.worlds.map(createOpeningStrip));

  const portrait = namedPhoto('luana', 'retrato');
  if (!portrait) return;
  requireElement<HTMLImageElement>('#hero-portrait-image').src = portrait;
  requireElement('#hero-portrait').hidden = false;
}

export function playOpening(): void {
  requireElement('.hero').classList.add('is-playing');
}
