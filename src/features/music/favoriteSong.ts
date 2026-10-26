import { namedAudio } from '../../config/localMedia';
import type { FavoriteSong } from '../../config/types';
import { requireElement, setText } from '../../core/dom';
import { createSongPlayer, type SongPlayer } from './songPlayer';

export function mountFavoriteSong(song: FavoriteSong): SongPlayer | null {
  const src = namedAudio('canciones', song.audio);
  if (!src) return null;

  const section = requireElement('#cancion');
  setText('#song-title', song.title);
  setText('#song-artist', song.artist);

  const player = createSongPlayer(src, song.title, section);
  requireElement('#song-player').append(player.element);
  section.hidden = false;
  return player;
}
