import { createElement, requireElement } from '../../core/dom';

export function renderWishes(wishes: readonly string[]): void {
  requireElement('#wish-list').append(...wishes.map((wish) => createElement('li', '', wish)));
}
