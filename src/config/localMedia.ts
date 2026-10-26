import { firstNamedUrl, firstUrl, namedUrl, numberedUrls } from './mediaIndex';

const photoModules = import.meta.glob<string>('../photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const audioModules = import.meta.glob<string>('../audio/*/*.{mp3,m4a,aac,wav,ogg,MP3,M4A,AAC,WAV,OGG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function numberedPhotos(folder: string): string[] {
  return numberedUrls(photoModules, 'photos', folder);
}

export function namedPhoto(folder: string, name: string): string | undefined {
  return namedUrl(photoModules, 'photos', folder, name);
}

export function firstNamedPhoto(folder: string, names: readonly string[]): string | undefined {
  return firstNamedUrl(photoModules, 'photos', folder, names);
}

export function firstAudioIn(folder: string): string | undefined {
  return firstUrl(audioModules, 'audio', folder);
}
