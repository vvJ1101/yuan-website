'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

import { MediaFrame } from './media-frame'
import { buildLookbookStageSlots, buildLookbookStageWings, getLookbookChapterLabel, getLookbookCutoutPath, getLookbookIndexInitialSelection, getLookbookStageMediaKind, normalizeLookIndex } from '@/lib/lookbook-index'
import type { Locale, LookbookItem } from '@/types/showroom'

export function LookbookIndexStage({ looks, name, season, locale }: {
  looks: readonly LookbookItem[]
  name: string
  season: string
  locale: Locale
}) {
  const [selected, setSelected] = useState(() => getLookbookIndexInitialSelection(looks.length))
  const touchStart = useRef<number | null>(null)
  const stage = useRef<HTMLElement>(null)
  if (!looks.length) return null

  const select = (index: number, alignStage = false) => {
    setSelected(normalizeLookIndex(index, looks.length))
    if (alignStage) requestAnimationFrame(() => stage.current?.scrollIntoView({ block: 'start', behavior: 'auto' }))
  }
  const active = looks[selected]
  const activeCutout = getLookbookCutoutPath(active.image)
  const activeMediaKind = getLookbookStageMediaKind(active.image)
  const stageSlots = buildLookbookStageSlots(looks.length, 18)
  const stageWings = buildLookbookStageWings(stageSlots.length)
  const label = locale === 'cn' ? '选择造型' : 'Select look'
  const interactionHint = locale === 'cn' ? '轻触造型 · 左右滑动' : 'Tap a look · Swipe'
  const activeLabel = `${name} LOOK ${String(selected + 1).padStart(2, '0')} / ${String(looks.length).padStart(2, '0')}`
  const renderLook = (position: number) => {
    const index = stageSlots[position]
    return <button type="button" key={`look-${index}`} aria-label={`${label} ${index + 1}`}
      aria-pressed={selected === index} data-number={String(index + 1).padStart(2, '0')}
      data-media-kind={getLookbookStageMediaKind(looks[index].image)} onClick={() => select(index, true)}>
      <MediaFrame src={getLookbookCutoutPath(looks[index].image)} alt="" ratio="2 / 3" sizes="(max-width: 640px) 22vw, 14vw" />
    </button>
  }

  return <section ref={stage} id="look-index" className="lookbook-index-stage" aria-label={`${name} ${season} look index`} tabIndex={0}
    onKeyDown={(event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      select(selected + (event.key === 'ArrowRight' ? 1 : -1), true)
    }}
    onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }}
    onTouchEnd={(event) => {
      if (touchStart.current === null) return
      const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current
      if (Math.abs(distance) > 44) select(selected + (distance < 0 ? 1 : -1), true)
      touchStart.current = null
    }}>
    <div className="lookbook-index-stage__meta lookbook-index-stage__meta--left">
      <span>[</span><strong>{getLookbookChapterLabel('index', locale, season, looks.length)}</strong><span>]</span>
    </div>
    <div className="lookbook-index-stage__meta lookbook-index-stage__meta--right">
      <span>[</span><strong>{season}</strong><span>]</span>
    </div>
    <div className="lookbook-index-stage__grid" aria-label={label}>
      <div className="lookbook-index-stage__wing lookbook-index-stage__wing--left">
        {stageWings.left.map(renderLook)}
      </div>
      <div className="lookbook-index-stage__wing lookbook-index-stage__wing--right">
        {stageWings.right.map(renderLook)}
      </div>
    </div>
    <div className="lookbook-index-stage__focus" key={`${active.image}-${selected}`} data-media-kind={activeMediaKind}>
      <div className="lookbook-index-stage__portrait lookbook-index-stage__portrait--single">
        <Image
          src={activeCutout}
          alt={`${name} LOOK ${String(selected + 1).padStart(2, '0')}`}
          fill
          sizes="(max-width: 640px) 88vw, 60vw"
          className="lookbook-index-stage__portrait-image"
          priority
        />
      </div>
    </div>
    <p className="lookbook-index-stage__title" aria-hidden="true"><span>NEW</span><span>LOOK</span></p>
    <p className="lookbook-index-stage__hint">{interactionHint}</p>
    <p className="lookbook-index-stage__count" aria-hidden="true">{name} · {String(selected + 1).padStart(2, '0')} / {String(looks.length).padStart(2, '0')}</p>
    <span className="sr-only" role="status" aria-live="polite">{activeLabel}</span>
  </section>
}
