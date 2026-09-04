'use client'

import { useRef, useState } from 'react'

import { MediaFrame } from './media-frame'
import { LookbookImageButton } from './lookbook-viewer'
import { normalizeLookIndex } from '@/lib/lookbook-index'
import type { Locale, LookbookItem } from '@/types/showroom'

export function LookbookIndexStage({ looks, name, season, locale }: {
  looks: readonly LookbookItem[]
  name: string
  season: string
  locale: Locale
}) {
  const [selected, setSelected] = useState(0)
  const touchStart = useRef<number | null>(null)
  if (!looks.length) return null

  const select = (index: number) => setSelected(normalizeLookIndex(index, looks.length))
  const active = looks[selected]
  const label = locale === 'cn' ? '选择造型' : 'Select look'

  return <section className="lookbook-index-stage" aria-label={`${name} ${season} look index`} tabIndex={0}
    onKeyDown={(event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      select(selected + (event.key === 'ArrowRight' ? 1 : -1))
    }}
    onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }}
    onTouchEnd={(event) => {
      if (touchStart.current === null) return
      const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current
      if (Math.abs(distance) > 44) select(selected + (distance < 0 ? 1 : -1))
      touchStart.current = null
    }}>
    <div className="lookbook-index-stage__identity">
      <span>{name}</span><span>{season}</span>
    </div>
    <div className="lookbook-index-stage__grid" aria-label={label}>
      {looks.map((look, index) => <button type="button" key={`${look.image}-${index}`} aria-label={`${label} ${index + 1}`} aria-pressed={selected === index} onClick={() => select(index)}>
        <MediaFrame src={look.image} alt="" ratio="2 / 3" sizes="(max-width: 640px) 22vw, 11vw" />
      </button>)}
    </div>
    <div className="lookbook-index-stage__focus">
      <LookbookImageButton index={selected} label={`${locale === 'cn' ? '查看大图' : 'View image'} — ${name} LOOK ${selected + 1}`}>
        <MediaFrame src={active.image} alt={`${name} LOOK ${String(selected + 1).padStart(2, '0')}`} ratio="2 / 3" sizes="(max-width: 640px) 72vw, 38vw" />
      </LookbookImageButton>
    </div>
    <p className="lookbook-index-stage__count" aria-live="polite"><span>LOOK</span> {String(selected + 1).padStart(2, '0')} / {String(looks.length).padStart(2, '0')}</p>
  </section>
}
