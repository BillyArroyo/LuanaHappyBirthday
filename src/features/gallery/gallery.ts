import { createElement } from '../../core/dom';
import type { Lightbox } from '../lightbox/lightbox';

interface PhotoButtonOptions {
  readonly className: string;
  readonly label: string;
}

export function createPhotoButton(
  photos: readonly string[],
  index: number,
  lightbox: Lightbox,
  { className, label }: PhotoButtonOptions,
): HTMLButtonElement {
  const button = createElement('button', className);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.addEventListener('click', () => lightbox.open(photos, index));

  const image = createElement('img');
  image.src = photos[index] ?? '';
  image.alt = '';
  image.loading = 'lazy';
  button.append(image);
  return button;
}

export function renderGallery(container: HTMLElement, photos: readonly string[], altPrefix: string, lightbox: Lightbox): void {
  photos.forEach((_, index) => {
    container.append(
      createPhotoButton(photos, index, lightbox, { className: 'gallery-item', label: `Ver ${altPrefix} ${index + 1}` }),
    );
  });
}
