'use client'

import { useState } from 'react'

import { buildLookbookLeadStrip, normalizeLookIndex } from '@/lib/lookbook-index'
import type { Locale, LookbookItem } from '@/types/showroom'
import { LookbookImageButton } from './lookbook-viewer'
import { MediaFrame } from './media-frame'

export function LookbookMobileLead({ looks, name, locale }: {
  looks: readonly LookbookItem[]
  name: string
  locale: Locale
}) {
  const [selected, setSelected] = useState(0)
  if (!looks.length) return null

  const active = normalizeLookIndex(selected, looks.length)
  const strip = buildLookbookLeadStrip(looks.length, active)
  const viewLabel = locale === 'cn' ? '查看大图' : 'View full screen'
  const selectLabel = locale === 'cn' ? '选择造型' : 'Select look'

  return <section className="lookbook-mobile-lead" aria-label={`${name} LOOKBOOK`}>
    <div className="lookbook-mobile-lead__main" key={`${looks[active].image}-${active}`}>
      <LookbookImageButton index={active} label={`${viewLabel} — ${name} LOOK ${active + 1}`}>
        <MediaFrame
          src={looks[active].image}
          alt={`${name} LOOK ${String(active + 1).padStart(2, '0')}`}
          ratio="2 / 3"
          sizes="(max-width: 640px) 78vw, 1px"
          priority
        />
        <span className="lookbook-mobile-lead__expand" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
          </svg>
        </span>
      </LookbookImageButton>
      <span className="lookbook-mobile-lead__number" aria-hidden="true">
        {String(active + 1).padStart(2, '0')} / {String(looks.length).padStart(2, '0')}
      </span>
    </div>
    <div className="lookbook-mobile-lead__strip" aria-label={selectLabel}>
      {strip.map(index => <button type="button" key={looks[index].image}
        aria-label={`${selectLabel} ${index + 1}`} onClick={() => setSelected(index)}>
        <MediaFrame src={looks[index].image} alt="" ratio="2 / 3" sizes="20vw" />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </button>)}
    </div>
  </section>
}
