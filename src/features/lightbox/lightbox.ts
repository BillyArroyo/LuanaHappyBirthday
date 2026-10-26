import { requireElement } from '../../core/dom';

type LightboxAction = 'prev' | 'next' | 'close';

export interface Lightbox {
  open(photos: readonly string[], index: number): void;
}

export function mountLightbox(): Lightbox {
  const dialog = requireElement<HTMLDialogElement>('#lightbox');
  const image = requireElement<HTMLImageElement>('#lightbox-image');
  const download = requireElement<HTMLAnchorElement>('#lightbox-download');
  let photos: readonly string[] = [];
  let currentIndex = 0;

  const show = (index: number): void => {
    currentIndex = (index + photos.length) % photos.length;
    const src = photos[currentIndex] ?? '';
    image.src = src;
    download.href = src;
  };

  const actions: Record<LightboxAction, () => void> = {
    prev: () => show(currentIndex - 1),
    next: () => show(currentIndex + 1),
    close: () => dialog.close(),
  };

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
      return;
    }
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-lightbox]') : null;
    const action = target?.dataset.lightbox as LightboxAction | undefined;
    if (action) actions[action]();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') actions.prev();
    if (event.key === 'ArrowRight') actions.next();
  });

  return {
    open(nextPhotos, index) {
      photos = nextPhotos;
      show(index);
      dialog.showModal();
    },
  };
}
