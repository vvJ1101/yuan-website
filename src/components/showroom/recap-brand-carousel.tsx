'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Locale } from '@/types/showroom'

export function RecapBrandCarousel({ images, name, id, locale }: { images: readonly string[]; name: string; id: string; locale: Locale }) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const frame = viewport.current
    const strip = track.current
    const group = strip?.firstElementChild
    if (!frame || !strip || !group) return
    let visible = false
    const updatePlayback = () => { strip.style.animationPlayState = visible && !document.hidden ? 'running' : 'paused' }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback() })
    const resize = new ResizeObserver(() => {
      // Constant speed across desktop and mobile: 28px per second.
      strip.style.setProperty('--recap-strip-duration', `${group.getBoundingClientRect().width / 28}s`)
    })
    observer.observe(frame)
    resize.observe(group)
    document.addEventListener('visibilitychange', updatePlayback)
    return () => { observer.disconnect(); resize.disconnect(); document.removeEventListener('visibilitychange', updatePlayback) }
  }, [])

  return <div className="recap-brand-film" id={`gallery-${id}`} ref={viewport} role="region" aria-label={`${name} ${locale === 'cn' ? '现场陈列影像带' : 'on-site filmstrip'}`} tabIndex={0}>
    <div className="recap-brand-film__track" ref={track}>
      {[0, 1].map(copy => <div className="recap-brand-film__group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {images.map((src, index) => <figure key={src}>
          <Image src={src} alt={copy === 1 ? '' : `${name} ${locale === 'cn' ? '现场陈列' : 'on-site display'} ${index + 1}`} width={1080} height={1622} sizes="(max-width: 640px) 76vw, 27vw" />
        </figure>)}
      </div>)}
    </div>
  </div>
}
