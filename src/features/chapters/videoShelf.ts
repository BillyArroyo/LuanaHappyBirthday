import type { VideoShelf, WorldVideo } from '../../config/types';
import { createElement } from '../../core/dom';

const EMBED_URL = 'https://www.youtube-nocookie.com/embed';
const THUMBNAIL_URL = 'https://i.ytimg.com/vi';

function createVideoFrame(video: WorldVideo): HTMLIFrameElement {
  const frame = createElement('iframe', 'video-card__frame');
  frame.src = `${EMBED_URL}/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`;
  frame.title = video.title;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  return frame;
}

function createVideoCard(video: WorldVideo, onPlay: () => void): HTMLElement {
  const card = createElement('article', 'video-card');
  const poster = createElement('button', 'video-card__poster');
  poster.type = 'button';
  poster.setAttribute('aria-label', `Ver video: ${video.title}`);

  const thumbnail = createElement('img');
  thumbnail.src = `${THUMBNAIL_URL}/${video.youtubeId}/hqdefault.jpg`;
  thumbnail.alt = '';
  thumbnail.loading = 'lazy';

  const playIcon = createElement('span', 'video-card__play');
  playIcon.setAttribute('aria-hidden', 'true');
  poster.append(thumbnail, playIcon);

  poster.addEventListener('click', () => {
    onPlay();
    poster.replaceWith(createVideoFrame(video));
  }, { once: true });

  card.append(poster, createElement('p', 'video-card__title', video.title));
  return card;
}

export function createVideoShelf(shelf: VideoShelf, onPlay: () => void): HTMLElement[] {
  const list = createElement('div', 'video-shelf');
  list.append(...shelf.videos.map((video) => createVideoCard(video, onPlay)));
  return [createElement('h3', 'gallery-title', shelf.title), list];
}
