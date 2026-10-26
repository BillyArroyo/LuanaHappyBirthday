import { describe, expect, it } from 'vitest';
import { firstNamedUrl, firstUrl, namedUrl, numberedUrls } from '../src/config/mediaIndex';

const modules = {
  '../photos/zombies/10.jpg': 'z10',
  '../photos/zombies/02.png': 'z02',
  '../photos/zombies/01.jpg': 'z01',
  '../photos/zombies/zed.jpg': 'zed',
  '../photos/zombies/fondo.png': 'fondo',
  '../photos/zombie-extra/01.jpg': 'other',
  '../audio/voz/mensaje.mp3': 'voz',
};

describe('numberedUrls', () => {
  it('returns only numbered files in natural order', () => {
    expect(numberedUrls(modules, 'photos', 'zombies')).toEqual(['z01', 'z02', 'z10']);
  });

  it('does not leak files from folders with a similar name', () => {
    expect(numberedUrls(modules, 'photos', 'zombie-extra')).toEqual(['other']);
  });

  it('returns an empty list for missing folders', () => {
    expect(numberedUrls(modules, 'photos', 'familia')).toEqual([]);
  });
});

describe('namedUrl', () => {
  it('finds a file by name ignoring the extension and case', () => {
    expect(namedUrl(modules, 'photos', 'zombies', 'ZED')).toBe('zed');
    expect(namedUrl(modules, 'photos', 'zombies', 'fondo')).toBe('fondo');
  });

  it('returns undefined when the file does not exist', () => {
    expect(namedUrl(modules, 'photos', 'zombies', 'addison')).toBeUndefined();
  });
});

describe('firstNamedUrl', () => {
  it('returns the first candidate that exists', () => {
    expect(firstNamedUrl(modules, 'photos', 'zombies', ['addison', '02', 'zed'])).toBe('z02');
  });
});

describe('firstUrl', () => {
  it('returns the first file of a folder', () => {
    expect(firstUrl(modules, 'audio', 'voz')).toBe('voz');
    expect(firstUrl(modules, 'audio', 'vacio')).toBeUndefined();
  });
});
