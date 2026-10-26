import { describe, expect, it } from 'vitest';
import { cakeStatusText } from '../src/features/cake/cakeStatus';

describe('cakeStatusText', () => {
  it('invites to blow the candles when all are lit', () => {
    expect(cakeStatusText(13, 13)).toBe('Toca cada vela para apagarla.');
  });

  it('counts the remaining candles with the right plural', () => {
    expect(cakeStatusText(5, 13)).toBe('Te faltan 5 velas.');
    expect(cakeStatusText(1, 13)).toBe('Te faltan 1 vela.');
  });

  it('celebrates when every candle is out', () => {
    expect(cakeStatusText(0, 13)).toBe('¡Apagaste las 13!');
  });
});
