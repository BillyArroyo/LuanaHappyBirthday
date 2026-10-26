import { createElement, requireElement } from '../../core/dom';
import { cakeStatusText } from './cakeStatus';

function setCandleOut(candle: HTMLButtonElement, isOut: boolean): void {
  candle.classList.toggle('is-out', isOut);
  candle.setAttribute('aria-pressed', String(isOut));
}

export function setupCake(candleCount: number, onAllCandlesOut: () => void): void {
  const candlesContainer = requireElement('#candles');
  const status = requireElement('#cake-status');
  const wish = requireElement('#wish');

  const updateStatus = (): void => {
    const remaining = candlesContainer.querySelectorAll('.candle:not(.is-out)').length;
    status.textContent = cakeStatusText(remaining, candleCount);
    if (remaining > 0) return;
    wish.hidden = false;
    onAllCandlesOut();
  };

  for (let index = 1; index <= candleCount; index++) {
    const candle = createElement('button', 'candle');
    candle.type = 'button';
    candle.setAttribute('aria-label', `Apagar vela ${index}`);
    setCandleOut(candle, false);
    candle.addEventListener('click', () => {
      if (candle.classList.contains('is-out')) return;
      setCandleOut(candle, true);
      updateStatus();
    });
    candlesContainer.append(candle);
  }

  requireElement('#relight').addEventListener('click', () => {
    candlesContainer.querySelectorAll<HTMLButtonElement>('.candle').forEach((candle) => setCandleOut(candle, false));
    wish.hidden = true;
    updateStatus();
  });
}
