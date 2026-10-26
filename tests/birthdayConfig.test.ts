import { describe, expect, it } from 'vitest';
import { birthdayConfig } from '../src/config/birthday.config';
import { namedAudio } from '../src/config/localMedia';

describe('birthdayConfig', () => {
  it('has one wish per year', () => {
    expect(birthdayConfig.wishes).toHaveLength(birthdayConfig.age);
  });

  it('uses unique world ids for the chapter anchors', () => {
    const ids = birthdayConfig.worlds.map((world) => world.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every speaker a message', () => {
    birthdayConfig.worlds.forEach((world) => {
      expect(world.speakers.length).toBeGreaterThan(0);
      world.speakers.forEach((speaker) => expect(speaker.message.trim()).not.toBe(''));
    });
  });

  it('finds an audio file for every configured song', () => {
    const songs = [birthdayConfig.favoriteSong, ...birthdayConfig.worlds.flatMap((world) => (world.song ? [world.song] : []))];
    expect(songs.length).toBeGreaterThan(1);
    songs.forEach((song) => expect(namedAudio('canciones', song.audio)).toBeDefined());
  });
});
