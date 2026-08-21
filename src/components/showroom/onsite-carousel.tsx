'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OnSiteCarouselProps {
  images: readonly string[]
  label: string
}

export function OnSiteCarousel({ images, label }: OnSiteCarouselProps) {
  const [active, setActive] = useState(0)

  if (images.length === 0) return null

  const previous = () => setActive((index) => (index - 1 + images.length) % images.length)
  const next = () => setActive((index) => (index + 1) % images.length)

  return (
    <div className="onsite-carousel" aria-roledescription="carousel" aria-label={label}>
      <div className="onsite-carousel__viewport">
        <Image
          src={images[active]}
          alt={`${label} — ${active + 1} / ${images.length}`}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          priority={active === 0}
        />
      </div>

      <button className="onsite-carousel__arrow onsite-carousel__arrow--previous" type="button" onClick={previous} aria-label={`${label} — Previous`}>
        <span aria-hidden="true">‹</span>
      </button>
      <button className="onsite-carousel__arrow onsite-carousel__arrow--next" type="button" onClick={next} aria-label={`${label} — Next`}>
        <span aria-hidden="true">›</span>
      </button>

      <div className="onsite-carousel__dots" aria-label={`${label} slides`}>
        {images.map((_, index) => (
          <button
            type="button"
            aria-label={`${label} — ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
            key={`${label}-${index + 1}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{active + 1} / {images.length}</p>
    </div>
  )
}
