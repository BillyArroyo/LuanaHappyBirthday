import './styles/base.css';
import './styles/intro.css';
import './styles/voice.css';
import './styles/song.css';
import './styles/cake.css';
import './styles/wishes.css';
import './styles/family.css';
import './styles/letter.css';
import './styles/favorite-photo.css';
import './styles/hero.css';
import './styles/chapters.css';
import './styles/mobile.css';

import { birthdayConfig } from './config/birthday.config';
import { photoCredits } from './config/photoCredits';
import { prefersReducedMotion } from './core/dom';
import { setupCake } from './features/cake/cake';
import { renderChapters } from './features/chapters/chapters';
import { observeTypedMessages } from './features/chapters/typing';
import { renderCredits } from './features/credits/credits';
import { createStars, launchConfetti, observeReveals } from './features/effects/effects';
import { renderFamily, renderLuanaGallery } from './features/family/family';
import { renderFavoritePhoto } from './features/favoritePhoto/favoritePhoto';
import { playOpening, renderHero } from './features/hero/hero';
import { mountIntro } from './features/intro/intro';
import { renderLetter } from './features/letter/letter';
import { mountLightbox } from './features/lightbox/lightbox';
import { mountFavoriteSong } from './features/music/favoriteSong';
import { duckSongs, keepOneSongPlaying } from './features/music/playback';
import { mountVoiceMessage } from './features/voice/voiceMessage';
import { renderWishes } from './features/wishes/wishes';

const OPENING_CONFETTI_DELAY_MS = 1400;

function bootstrap(): void {
  const config = birthdayConfig;
  const lightbox = mountLightbox();

  const favoriteSong = mountFavoriteSong(config.favoriteSong);
  const voice = mountVoiceMessage(config.voiceMessage, duckSongs);
  keepOneSongPlaying();

  createStars();
  renderHero(config);
  renderChapters(config.worlds, lightbox);
  setupCake(config.age, launchConfetti);
  renderWishes(config.wishes);
  renderLuanaGallery(lightbox);
  renderFamily(config.family, lightbox);
  renderLetter(config.letter);
  renderFavoritePhoto(config.favoritePhoto, lightbox);
  renderCredits(photoCredits);

  mountIntro(() => {
    playOpening();
    voice?.play();
    favoriteSong?.play();
    window.setTimeout(launchConfetti, OPENING_CONFETTI_DELAY_MS);
  });

  observeReveals();
  observeTypedMessages(!prefersReducedMotion());
}

bootstrap();
