const SONG_SELECTOR = 'audio[data-song]';
const DUCKED_VOLUME = 0.2;
const FULL_VOLUME = 1;

function songs(): NodeListOf<HTMLAudioElement> {
  return document.querySelectorAll<HTMLAudioElement>(SONG_SELECTOR);
}

export function keepOneSongPlaying(): void {
  document.addEventListener('play', (event) => {
    const started = event.target;
    if (!(started instanceof HTMLAudioElement) || !started.matches(SONG_SELECTOR)) return;
    songs().forEach((song) => {
      if (song !== started) song.pause();
    });
  }, true);
}

export function duckSongs(shouldDuck: boolean): void {
  songs().forEach((song) => {
    song.volume = shouldDuck ? DUCKED_VOLUME : FULL_VOLUME;
  });
}

export function pauseSongs(): void {
  songs().forEach((song) => song.pause());
}
