'use client'

import Image from 'next/image'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { clampView, pinchView, swipeDirection, type ImagePoint, type ImageView } from '@/lib/lookbook-image-gestures'

const initialView: ImageView = { scale: 1, x: 0, y: 0 }

export function LookbookImageStage({ src, alt, sizes, cn, onNavigate, onVerticalDrag, children }: {
  src: string; alt: string; sizes: string; cn: boolean; onNavigate: (direction: number) => void; onVerticalDrag: (delta: number) => void; children?: ReactNode
}) {
  const surface = useRef<HTMLButtonElement>(null)
  const [view, setView] = useState(initialView)
  const current = useRef(initialView)
  const pointers = useRef(new Map<number, ImagePoint>())
  const gesture = useRef({ start: { x: 0, y: 0 }, last: { x: 0, y: 0 }, multi: false, moved: false, vertical: false })
  const pinch = useRef<{ view: ImageView; center: ImagePoint; distance: number } | null>(null)
  const suppressClick = useRef(false)
  const update = (next: ImageView) => { current.current = next; setView(next) }
  const toggleZoom = () => update(current.current.scale > 1 ? initialView : { scale: 2, x: 0, y: 0 })
  const point = (event: PointerEvent<HTMLButtonElement>) => ({ x: event.clientX, y: event.clientY })
  const pair = () => {
    const [a, b] = [...pointers.current.values()]
    const rect = surface.current!.getBoundingClientRect()
    return { center: { x: (a.x + b.x) / 2 - rect.left - rect.width / 2, y: (a.y + b.y) / 2 - rect.top - rect.height / 2 }, distance: Math.hypot(a.x - b.x, a.y - b.y) }
  }
  const down = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || pointers.current.size >= 2) return
    const p = point(event)
    pointers.current.set(event.pointerId, p)
    event.currentTarget.setPointerCapture(event.pointerId)
    if (pointers.current.size === 1) {
      gesture.current = { start: p, last: p, multi: false, moved: false, vertical: false }
      suppressClick.current = false
    } else {
      gesture.current.multi = true
      suppressClick.current = true
      pinch.current = { view: current.current, ...pair() }
    }
  }
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    const p = point(event)
    pointers.current.set(event.pointerId, p)
    const rect = event.currentTarget.getBoundingClientRect()
    if (pointers.current.size === 2 && pinch.current) {
      const next = pair()
      update(pinchView(pinch.current.view, pinch.current.center, next.center, pinch.current.distance, next.distance, rect.width, rect.height))
      return
    }
    const g = gesture.current
    const dx = p.x - g.start.x
    const dy = p.y - g.start.y
    if (Math.hypot(dx, dy) > 6) { g.moved = true; suppressClick.current = true }
    if (current.current.scale > 1) {
      update(clampView({ ...current.current, x: current.current.x + p.x - g.last.x, y: current.current.y + p.y - g.last.y }, rect.width, rect.height))
    } else if (!g.multi && event.pointerType !== 'mouse') {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.3) g.vertical = true
      if (g.vertical) onVerticalDrag(g.last.y - p.y)
    }
    g.last = p
  }
  const end = (event: PointerEvent<HTMLButtonElement>, cancelled = false) => {
    if (!pointers.current.has(event.pointerId)) return
    const p = point(event)
    pointers.current.delete(event.pointerId)
    if (pointers.current.size) {
      gesture.current.last = [...pointers.current.values()][0]
      pinch.current = null
      return
    }
    const g = gesture.current
    const direction = cancelled || g.vertical ? 0 : swipeDirection(p.x - g.start.x, p.y - g.start.y, current.current.scale, g.multi)
    suppressClick.current = cancelled || g.multi || g.moved || direction !== 0
    pinch.current = null
    if (direction) onNavigate(direction)
  }

  const zoomLabel = view.scale > 1 ? (cn ? '恢复完整图片' : 'Reset image zoom') : (cn ? '放大查看细节' : 'Zoom image details')
  return <div className="lookbook-viewer__image">
    <button ref={surface} type="button" className="lookbook-viewer__image-surface" aria-label={`${zoomLabel} — ${alt}`} aria-pressed={view.scale > 1}
      onPointerDown={down} onPointerMove={move} onPointerUp={event => end(event)} onPointerCancel={event => end(event, true)} onLostPointerCapture={event => end(event, true)}
      onClick={event => { if (event.detail === 0 || !suppressClick.current) toggleZoom() }}>
      <Image src={src} alt={alt} fill sizes={sizes} draggable={false} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }} />
    </button>
    {children}
    <button type="button" className="lookbook-viewer__zoom" onClick={toggleZoom} aria-label={zoomLabel}>
      {view.scale > 1 ? <ZoomOut size={18} strokeWidth={1.25} aria-hidden="true" /> : <ZoomIn size={18} strokeWidth={1.25} aria-hidden="true" />}
      <span>{Math.round(view.scale * 100)}%</span>
    </button>
  </div>
}
