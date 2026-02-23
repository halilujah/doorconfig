export function captureCanvasScreenshot(): string | null {
  const canvas = document.querySelector('canvas');
  if (!canvas) return null;
  return canvas.toDataURL('image/jpeg', 0.85);
}
