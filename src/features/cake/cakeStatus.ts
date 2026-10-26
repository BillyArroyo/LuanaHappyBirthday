export function cakeStatusText(remaining: number, total: number): string {
  if (remaining <= 0) return `¡Apagaste las ${total}!`;
  if (remaining === total) return 'Toca cada vela para apagarla.';
  return `Te faltan ${remaining} ${remaining === 1 ? 'vela' : 'velas'}.`;
}
