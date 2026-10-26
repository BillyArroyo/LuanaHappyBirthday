import type { PhotoCredit } from '../../config/types';
import { createElement, requireElement } from '../../core/dom';

function createCreditItem({ title, artist, license, descriptionUrl }: PhotoCredit): HTMLLIElement {
  const item = createElement('li');
  const link = createElement('a', '', title.replace(/\.[a-z]+$/i, ''));
  link.href = descriptionUrl;
  link.target = '_blank';
  link.rel = 'noopener';
  item.append(link, ` · ${artist || 'Autor desconocido'} · ${license || 'Wikimedia Commons'}`);
  return item;
}

export function renderCredits(credits: readonly PhotoCredit[]): void {
  if (credits.length === 0) return;
  requireElement('#credits-list').append(...credits.map(createCreditItem));
  requireElement('#credits').hidden = false;
}
