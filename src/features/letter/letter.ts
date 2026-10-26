import type { LetterConfig } from '../../config/types';
import { createElement, requireElement, setText } from '../../core/dom';

export function renderLetter(letter: LetterConfig): void {
  setText('#letter-title', letter.title);
  setText('#letter-signature', letter.signature);
  requireElement('#letter-body').append(...letter.paragraphs.map((paragraph) => createElement('p', '', paragraph)));
}
