export function nextPreviewIndex(current: number, length: number): number {
  if (length <= 1) return 0
  return (current + 1) % length
}
