import { numberedPhotos } from '../../config/localMedia';
import type { FamilyConfig } from '../../config/types';
import { requireElement, setText } from '../../core/dom';
import { createPhotoButton, renderGallery } from '../gallery/gallery';
import type { Lightbox } from '../lightbox/lightbox';

export function renderFamily(config: FamilyConfig, lightbox: Lightbox): void {
  const photos = numberedPhotos('familia');
  if (photos.length === 0) return;

  setText('#family-title', config.title);
  setText('#family-lead', config.lead);
  setText('#family-promise', config.promise);
  setText('#family-signature', config.signature);

  requireElement('#family-collage').append(
    ...photos.map((_, index) =>
      createPhotoButton(photos, index, lightbox, { className: 'family-photo', label: `Ver foto de la familia ${index + 1}` }),
    ),
  );
  requireElement('#mis-reinas').hidden = false;
}

export function renderLuanaGallery(lightbox: Lightbox): void {
  const photos = numberedPhotos('luana');
  if (photos.length === 0) return;
  const section = requireElement('#luana-gallery');
  renderGallery(requireElement('[data-gallery]', section), photos, 'foto', lightbox);
  section.hidden = false;
}
