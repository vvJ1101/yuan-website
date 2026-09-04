'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { localePath } from '@/lib/showroom-routing'
import type { Locale } from '@/types/showroom'

const destinations = [
  {
    path: '/now/lookbook',
    cn: '参展品牌',
    en: 'LOOKBOOK',
    preview: '/images/showroom/now/event-architecture-20260904.png',
    fit: 'cover',
  },
  {
    path: '/now/floor-map',
    cn: '楼层介绍',
    en: 'FLOOR GUIDE',
    preview: '/images/showroom/now/floor-map.webp',
    fit: 'contain',
  },
  {
    path: '/now/appointment',
    cn: '预约通道',
    en: 'APPOINTMENT',
    preview: '/images/showroom/now/event.webp',
    fit: 'cover',
  },
] as const

interface NowEventDirectoryProps {
  locale: Locale
  eventTitle: string
  season: string
}

export function NowEventDirectory({ locale, eventTitle, season }: NowEventDirectoryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeDestination = destinations[activeIndex]

  return (
    <main className="now-event">
      <Link
        className="now-event__preview"
        href={localePath(locale, activeDestination.path)}
        aria-label={`${locale === 'cn' ? activeDestination.cn : activeDestination.en} — ${eventTitle}`}
      >
        {destinations.map((destination, index) => (
          <Image
            className="now-event__preview-image"
            data-active={activeIndex === index ? 'true' : 'false'}
            data-fit={destination.fit}
            key={destination.path}
            src={destination.preview}
            alt={locale === 'cn' ? destination.cn : destination.en}
            fill
            sizes="(max-width: 900px) 100vw, 70vw"
            priority={index === 0}
            unoptimized
          />
        ))}
        <span className="now-event__preview-caption" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, '0')} / 03
        </span>
      </Link>

      <aside className="now-event__sidebar">
        <section className="now-event__summary" aria-labelledby="now-event-title">
          <p className="now-event__eyebrow">NOW</p>
          <h1 id="now-event-title">{eventTitle}</h1>
          <p className="now-event__season">{season}</p>
        </section>

        <nav className="now-event__destinations" aria-label={locale === 'cn' ? '当前订货会' : 'Current event'}>
          {destinations.map((destination, index) => (
            <Link
              href={localePath(locale, destination.path)}
              key={destination.path}
              aria-current={activeIndex === index ? 'true' : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="now-event__destination-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="now-event__destination-copy">
                <strong>{locale === 'cn' ? destination.cn : destination.en}</strong>
                <span>{locale === 'cn' ? destination.en : destination.cn}</span>
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </main>
  )
}
