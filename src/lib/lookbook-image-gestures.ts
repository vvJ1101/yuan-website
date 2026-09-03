export interface ImageView { scale: number; x: number; y: number }
export interface ImagePoint { x: number; y: number }

export function clampView(view: ImageView, width: number, height: number): ImageView {
  const scale = Math.max(1, Math.min(3, view.scale))
  const maxX = Math.max(0, width * (scale - 1) / 2)
  const maxY = Math.max(0, height * (scale - 1) / 2)
  return { scale, x: Math.max(-maxX, Math.min(maxX, view.x)), y: Math.max(-maxY, Math.min(maxY, view.y)) }
}

export function pinchView(view: ImageView, start: ImagePoint, current: ImagePoint, distance: number, nextDistance: number, width: number, height: number): ImageView {
  if (distance <= 0) return view
  const scale = Math.max(1, Math.min(3, view.scale * nextDistance / distance))
  return clampView({ scale, x: current.x - (start.x - view.x) * scale / view.scale, y: current.y - (start.y - view.y) * scale / view.scale }, width, height)
}

export function swipeDirection(dx: number, dy: number, scale: number, multiplePointers: boolean): number {
  if (multiplePointers || scale > 1 || Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.3) return 0
  return dx < 0 ? 1 : -1
}
