'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const profiles = [
  [1.3, 1.06, 0.7, 0.7, 0.7],
  [0.88, 1.3, 0.88, 0.7, 0.7],
  [0.7, 0.88, 1.3, 0.88, 0.7],
  [0.7, 0.7, 0.88, 1.3, 0.88],
  [0.7, 0.7, 0.7, 1.06, 1.3],
]

export function LookbookDock({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = panel.current
    if (!element || element.children.length !== 5) return
    const media = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (min-width: 641px) and (prefers-reduced-motion: no-preference)')
    let current = [...profiles[2]]
    let target = [...profiles[2]]
    let frame = 0
    let previousTime = 0
    const animate = (time: number) => {
      const amount = 1 - Math.exp(-Math.min(time - previousTime || 16, 64) / 95)
      previousTime = time
      current = current.map((value, index) => value + (target[index] - value) * amount)
      element.style.gridTemplateColumns = current.map(value => `${value}fr`).join(' ')
      if (current.some((value, index) => Math.abs(target[index] - value) > 0.001)) frame = requestAnimationFrame(animate)
      else { frame = 0; previousTime = 0 }
    }
    const update = (values: number[]) => {
      target = values
      if (!frame) frame = requestAnimationFrame(animate)
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === 'touch') return
      const rect = element.getBoundingClientRect()
      const position = Math.max(0, Math.min(4, (event.clientX - rect.left) / rect.width * 5 - 0.5))
      const left = Math.floor(position)
      const right = Math.min(4, left + 1)
      update(profiles[left].map((value, index) => value + (profiles[right][index] - value) * (position - left)))
    }
    const leave = () => { if (media.matches) update([...profiles[2]]) }
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      current = [...profiles[2]]
      target = [...profiles[2]]
      element.style.removeProperty('grid-template-columns')
    }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', leave)
    media.addEventListener('change', reset)
    return () => {
      reset()
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', leave)
      media.removeEventListener('change', reset)
    }
  }, [])
  return <section ref={panel} className="lookbook-brand__panel">{children}</section>
}
