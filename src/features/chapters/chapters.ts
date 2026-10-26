import { namedPhoto, numberedPhotos } from '../../config/localMedia';
import type { Speaker, World, WorldSong } from '../../config/types';
import { createElement, requireElement } from '../../core/dom';
import { renderGallery } from '../gallery/gallery';
import type { Lightbox } from '../lightbox/lightbox';

function createSpeaker(speaker: Speaker, avatarSrc: string | undefined): HTMLElement {
  const article = createElement('article', 'speaker');
  const avatar = createElement('div', 'speaker-avatar');

  if (avatarSrc) {
    const image = createElement('img');
    image.src = avatarSrc;
    image.alt = speaker.name;
    avatar.append(image);
  } else {
    avatar.textContent = speaker.name.charAt(0);
  }

  const bubble = createElement('div', 'speaker-bubble');
  const header = createElement('p', 'speaker-name', speaker.name);
  header.append(createElement('span', 'speaker-role', speaker.role));

  const message = createElement('p', 'speaker-message');
  const typed = createElement('span', 'typed');
  typed.setAttribute('aria-hidden', 'true');
  typed.dataset.text = speaker.message;
  message.append(createElement('span', 'sr-only', speaker.message), typed);

  bubble.append(header, message);
  article.append(avatar, bubble);
  return article;
}

function createSongCard(song: WorldSong): HTMLElement {
  const card = createElement('article', 'record');
  const vinyl = createElement('div', 'vinyl');
  vinyl.setAttribute('aria-hidden', 'true');
  vinyl.append(createElement('span', 'vinyl-label'));

  const info = createElement('div', 'record-info');
  info.append(
    createElement('span', 'record-number', 'Su canción para ti'),
    createElement('h3', 'record-title', song.title),
    createElement('p', 'record-artist', song.artist),
  );

  const player = createElement('div', 'record-player');
  player.dataset.youtubeId = song.youtubeId;
  player.dataset.spotifyTrack = song.spotifyTrackId;

  card.append(vinyl, info, player);
  return card;
}

function createChapter(world: World, lightbox: Lightbox): HTMLElement {
  const wallpapers = numberedPhotos(world.id);
  const background = namedPhoto(world.id, 'fondo') ?? wallpapers[0];

  const section = createElement('section', `chapter chapter--${world.id} reveal`);
  section.id = world.id;

  const backgroundLayer = createElement('div', 'chapter-bg');
  backgroundLayer.setAttribute('aria-hidden', 'true');
  if (background) backgroundLayer.style.backgroundImage = `url("${background}")`;

  const decor = createElement('div', 'chapter-decor');
  decor.setAttribute('aria-hidden', 'true');

  const speakers = createElement('div', 'speakers');
  speakers.append(...world.speakers.map((speaker) => createSpeaker(speaker, namedPhoto(world.id, speaker.photo))));

  const inner = createElement('div', 'chapter-inner');
  inner.append(
    createElement('span', 'world-tag', world.tag),
    createElement('h2', 'chapter-title', world.title),
    createElement('p', 'chapter-subtitle', world.subtitle),
    speakers,
  );

  if (world.song) inner.append(createSongCard(world.song));

  if (wallpapers.length > 0) {
    const gallery = createElement('div', 'gallery');
    renderGallery(gallery, wallpapers, `fondo de ${world.tag}`, lightbox);
    inner.append(createElement('h3', 'gallery-title', 'Fondos de pantalla para ti'), gallery);
  }

  section.append(backgroundLayer, decor, inner);
  return section;
}

export function renderChapters(worlds: readonly World[], lightbox: Lightbox): void {
  requireElement('#chapters').append(...worlds.map((world) => createChapter(world, lightbox)));
}
