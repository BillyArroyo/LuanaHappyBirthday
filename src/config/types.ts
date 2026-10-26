export type WorldId = 'zombies' | 'descendientes' | 'billie' | 'sabrina';

export interface Speaker {
  readonly name: string;
  readonly role: string;
  readonly photo: string;
  readonly message: string;
}

export interface WorldSong {
  readonly title: string;
  readonly artist: string;
  readonly audio: string;
}

export interface OpeningPanel {
  readonly bubble: string;
  readonly sfx: string;
  readonly photos: readonly string[];
}

export interface World {
  readonly id: WorldId;
  readonly tag: string;
  readonly title: string;
  readonly subtitle: string;
  readonly panel: OpeningPanel;
  readonly song?: WorldSong;
  readonly speakers: readonly Speaker[];
}

export interface FavoriteSong {
  readonly audio: string;
  readonly title: string;
  readonly artist: string;
}

export interface VoiceMessageConfig {
  readonly title: string;
}

export interface FamilyConfig {
  readonly title: string;
  readonly lead: string;
  readonly promise: string;
  readonly signature: string;
}

export interface LetterConfig {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly signature: string;
}

export interface BirthdayConfig {
  readonly name: string;
  readonly secondName: string;
  readonly surname: string;
  readonly age: number;
  readonly favoriteSong: FavoriteSong;
  readonly voiceMessage: VoiceMessageConfig;
  readonly worlds: readonly World[];
  readonly wishes: readonly string[];
  readonly family: FamilyConfig;
  readonly letter: LetterConfig;
}

export interface PhotoCredit {
  readonly title: string;
  readonly artist: string;
  readonly license: string;
  readonly descriptionUrl: string;
}
