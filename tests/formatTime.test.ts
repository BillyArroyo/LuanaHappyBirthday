import { describe, expect, it } from 'vitest';
import { formatTime } from '../src/features/voice/formatTime';

describe('formatTime', () => {
  it('formats seconds as m:ss', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(5.9)).toBe('0:05');
    expect(formatTime(274)).toBe('4:34');
  });

  it('falls back to 0:00 for invalid durations', () => {
    expect(formatTime(Number.NaN)).toBe('0:00');
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe('0:00');
    expect(formatTime(-3)).toBe('0:00');
  });
});
