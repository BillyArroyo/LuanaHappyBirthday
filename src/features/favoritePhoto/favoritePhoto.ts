import { namedPhoto } from '../../config/localMedia';
import type { FavoritePhotoConfig } from '../../config/types';
import { requireElement, setText } from '../../core/dom';
import type { Lightbox } from '../lightbox/lightbox';

export function renderFavoritePhoto(config: FavoritePhotoConfig, lightbox: Lightbox): void {
  const src = namedPhoto(config.folder, config.photo);
  if (!src) return;

  setText('#favorite-photo-kicker', config.kicker);
  setText('#favorite-photo-title', config.title);
  setText('#favorite-photo-caption', config.caption);

  const image = requireElement<HTMLImageElement>('#favorite-photo-image');
  image.src = src;
  image.alt = config.title;

  const button = requireElement('#favorite-photo-button');
  button.setAttribute('aria-label', `Ver en grande: ${config.title}`);
  button.addEventListener('click', () => lightbox.open([src], 0));

  requireElement('#foto-favorita').hidden = false;
}
