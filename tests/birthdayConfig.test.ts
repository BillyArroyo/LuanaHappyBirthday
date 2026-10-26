import { describe, expect, it } from 'vitest';
import { birthdayConfig } from '../src/config/birthday.config';

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

  it('gives every chapter song a YouTube video and a Spotify fallback', () => {
    const songs = birthdayConfig.worlds.flatMap((world) => (world.song ? [world.song] : []));
    expect(songs.length).toBeGreaterThan(0);
    songs.forEach((song) => {
      expect(song.youtubeId).toMatch(/^[\w-]{11}$/);
      expect(song.spotifyTrackId).toMatch(/^[0-9A-Za-z]{22}$/);
    });
  });

  it('points the favorite song to YouTube', () => {
    expect(birthdayConfig.favoriteSong.youtubeId).toMatch(/^[\w-]{11}$/);
    expect(birthdayConfig.favoriteSong.fallbackYoutubeId).toMatch(/^[\w-]{11}$/);
    expect(birthdayConfig.favoriteSong.originalUrl).toMatch(/^https:\/\/www\.youtube\.com\//);
  });
});
