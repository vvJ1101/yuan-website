'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface OnSiteCarouselProps {
  images: readonly string[]
  label: string
  locale: 'cn' | 'en'
}

export function OnSiteCarousel({ images, label, locale }: OnSiteCarouselProps) {
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(false)
  const [interaction, setInteraction] = useState(0)
  const [dragging, setDragging] = useState(false)
  const viewport = useRef<HTMLDivElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [visible, setVisible] = useState(true)
  const [loaded, setLoaded] = useState<readonly string[]>([])
  const cn = locale === 'cn'
  const count = images.length
  const nextIndex = count ? (active + 1) % count : 0
  const change = useCallback((direction: number) => {
    if (count < 2) return
    setActive((index) => (index + direction + count) % count)
    setInteraction(Date.now())
  }, [count])

  useEffect(() => {
    const element = viewport.current
    if (!element || count < 2) return
    let total = 0
    let lastEvent = 0
    let switched = false
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (!delta) return
      event.preventDefault()
      const now = Date.now()
      if (now - lastEvent > 200) { total = 0; switched = false }
      lastEvent = now
      if (switched) return
      total += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1)
      if (Math.abs(total) >= 45) { change(total > 0 ? 1 : -1); switched = true }
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [change, count])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motion = () => setReducedMotion(query.matches)
    const visibility = () => setVisible(!document.hidden)
    motion()
    visibility()
    query.addEventListener('change', motion)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      query.removeEventListener('change', motion)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  useEffect(() => {
    if (count < 2 || focused || dragging || reducedMotion || !visible || !loaded.includes(images[nextIndex])) return
    const delay = Math.max(4500, 6500 - (Date.now() - interaction))
    const timer = window.setTimeout(() => setActive(nextIndex), delay)
    return () => window.clearTimeout(timer)
  }, [count, focused, dragging, interaction, reducedMotion, visible, loaded, images, nextIndex])

  if (images.length === 0) return null

  return (
    <div className="onsite-carousel" role="region" aria-roledescription="carousel" aria-label={label}
      onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
      <div ref={viewport} className="onsite-carousel__viewport" tabIndex={count > 1 ? 0 : undefined}
        aria-label={cn ? '滑动切换图片，或使用左右方向键' : 'Swipe to browse images, or use the left and right arrow keys'}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            change(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return
          pointer.current = { x: event.clientX, y: event.clientY }
          setDragging(true)
          setFocused(false)
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={(event) => {
          const start = pointer.current
          pointer.current = null
          setDragging(false)
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) change(dx < 0 ? 1 : -1)
        }}
        onPointerCancel={() => { pointer.current = null; setDragging(false) }}
        onLostPointerCapture={() => { pointer.current = null; setDragging(false) }}>
        {images.map((src, index) => (
          <Image key={src} src={src} alt={index === active ? `${label} — ${index + 1} / ${count}` : ''}
            aria-hidden={index !== active} draggable={false} fill sizes="(max-width: 900px) 90vw, 60vw"
            priority={index === 0} loading={index === 0 ? undefined : 'eager'}
            className={index === active ? 'is-active' : undefined}
            onLoad={() => setLoaded((current) => current.includes(src) ? current : [...current, src])} />
        ))}
      </div>

      {count > 1 && <div className="onsite-carousel__dots" role="group" aria-label={cn ? '选择图片' : 'Choose image'}>
        {images.map((src, index) => (
          <button key={src} type="button" aria-label={cn ? `第 ${index + 1} 张图片` : `Image ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => { setActive(index); setInteraction(Date.now()) }}>
            <span aria-hidden="true" />
          </button>
        ))}
      </div>}
      <span className="sr-only" aria-live={focused ? 'polite' : 'off'}>{active + 1} / {count}</span>
    </div>
  )
}
