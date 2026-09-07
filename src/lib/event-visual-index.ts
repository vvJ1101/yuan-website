export function nextEventVisualIndex(current: number, direction: number, length: number) {
  if (length <= 0) return 0
  return (current + direction + length) % length
}
