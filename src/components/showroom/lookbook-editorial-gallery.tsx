'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import {
  getCampaignReelDirection,
  getCampaignReelTapTarget,
  getLookbookChapterLabel,
  normalizeLookIndex,
  type CampaignReelDirection,
} from '@/lib/lookbook-index'
import { shouldBypassImageOptimization } from '@/lib/image-delivery'
import type { Locale } from '@/types/showroom'

const campaignFrames = [
  { src: '/images/showroom/brand-books/ranyepersonal/page-02.webp', kind: 'landscape', position: 'center 48%' },
  { src: '/images/showroom/now/lookbook/campaign-preview/portrait-01.webp', kind: 'portrait', position: 'center' },
  { src: '/images/showroom/now/lookbook/campaign-preview/portrait-02.webp', kind: 'portrait', position: 'center' },
  { src: '/images/showroom/now/lookbook/campaign-preview/portrait-03.webp', kind: 'portrait', position: 'center' },
  { src: '/images/showroom/now/lookbook/campaign-preview/portrait-04.webp', kind: 'portrait', position: 'center' },
  { src: '/images/showroom/brands/ranyepersonal-campaign-20260903.jpg', kind: 'portrait', position: 'center 32%' },
] as const

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> }
}

function frameTransitionStyle(index: number) {
  return { viewTransitionName: `campaign-frame-${index}` }
}

export function LookbookEditorialGallery({ name, season, locale }: { name: string; season: string; locale: Locale }) {
  const [selected, setSelected] = useState(0)
  const [direction, setDirection] = useState<CampaignReelDirection>('forward')
  const [sharedTransition, setSharedTransition] = useState(false)
  const touchStart = useRef<number | null>(null)
  const pointerStart = useRef<number | null>(null)
  const viewer = useRef<HTMLDialogElement>(null)
  const frameAt = (offset: number) => normalizeLookIndex(selected + offset, campaignFrames.length)
  const previous = frameAt(-1)
  const next = frameAt(1)
  const active = campaignFrames[selected]
  const select = (index: number) => {
    const target = normalizeLookIndex(index, campaignFrames.length)
    if (target === selected) return
    const nextDirection = getCampaignReelDirection(selected, target, campaignFrames.length)
    const commit = (useSharedTransition: boolean) => {
      setSharedTransition(useSharedTransition)
      setDirection(nextDirection)
      setSelected(target)
    }
    const transitionDocument = document as ViewTransitionDocument
    if (!transitionDocument.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      commit(false)
      return
    }

    transitionDocument.startViewTransition(() => flushSync(() => commit(true)))
  }
  const openViewer = () => viewer.current?.showModal()

  return (
    <section
      id="editorial-gallery"
      className="lookbook-campaign-reel"
      aria-label={`${name} campaign gallery`}
      data-active-kind={active.kind}
      data-shared-transition={sharedTransition ? 'true' : undefined}
      tabIndex={0}
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
      }}
    >
      <p className="lookbook-campaign-reel__chapter">[ {getLookbookChapterLabel('campaign', locale, season, campaignFrames.length)} ]</p>
      <button type="button" className="lookbook-campaign-reel__preview lookbook-campaign-reel__preview--previous"
        onClick={() => select(previous)} aria-label={`Previous ${name} campaign image`}
        style={frameTransitionStyle(previous)}>
        <Image src={campaignFrames[previous].src} alt="" fill sizes="16vw" unoptimized={shouldBypassImageOptimization(campaignFrames[previous].src)} style={{ objectPosition: campaignFrames[previous].position }} />
      </button>

      <figure key={`${active.src}-${selected}`} className="lookbook-campaign-reel__hero" data-kind={active.kind}
        data-direction={direction} style={frameTransitionStyle(selected)}>
        <Image src={active.src} alt={`${name} campaign image ${selected + 1}`} fill priority={selected === 0}
          sizes="(max-width: 640px) 76vw, 70vw" unoptimized={shouldBypassImageOptimization(active.src)} style={{ objectPosition: active.position }} />
        <button type="button" className="lookbook-campaign-reel__hero-action" aria-label={`View ${name} campaign image ${selected + 1} full screen`}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') pointerStart.current = event.clientX
          }}
          onPointerUp={(event) => {
            if (event.pointerType !== 'touch') {
              openViewer()
              return
            }
            const travel = pointerStart.current === null ? 0 : event.clientX - pointerStart.current
            pointerStart.current = null
            if (Math.abs(travel) > 44) return
            event.preventDefault()
            const bounds = event.currentTarget.getBoundingClientRect()
            select(getCampaignReelTapTarget(event.clientX, bounds.left, bounds.width, selected, campaignFrames.length))
          }}
          onClick={(event) => { if (event.detail === 0) openViewer() }} />
        <button type="button" className="lookbook-campaign-reel__expand"
          aria-label={`View ${name} campaign image ${selected + 1} full screen`} onClick={openViewer}>
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
          </svg>
        </button>
      </figure>

      <button type="button" className="lookbook-campaign-reel__preview lookbook-campaign-reel__preview--next"
        onClick={() => select(next)} aria-label={`Next ${name} campaign image`}
        style={frameTransitionStyle(next)}>
        <Image src={campaignFrames[next].src} alt="" fill sizes="16vw" unoptimized={shouldBypassImageOptimization(campaignFrames[next].src)} style={{ objectPosition: campaignFrames[next].position }} />
      </button>

      <div className="lookbook-campaign-reel__progress" aria-label={`${selected + 1} of ${campaignFrames.length}`}>
        {campaignFrames.map((frame, index) => (
          <button key={frame.src} type="button" aria-label={`View ${name} campaign image ${index + 1}`}
            aria-current={index === selected ? 'true' : undefined} onClick={() => select(index)} />
        ))}
      </div>
      <span className="sr-only" role="status" aria-live="polite">{`${name} campaign image ${selected + 1} of ${campaignFrames.length}`}</span>

      <dialog ref={viewer} className="lookbook-campaign-viewer" aria-label={`${name} full-screen campaign viewer`}>
        <button type="button" className="lookbook-campaign-viewer__close" onClick={() => viewer.current?.close()}>CLOSE</button>
        <button type="button" className="lookbook-campaign-viewer__step lookbook-campaign-viewer__step--previous"
          onClick={() => select(selected - 1)} aria-label={`Previous ${name} campaign image`} />
        <figure data-kind={active.kind}>
          <Image src={active.src} alt={`${name} campaign image ${selected + 1}`} fill sizes="100vw" unoptimized={shouldBypassImageOptimization(active.src)} style={{ objectPosition: active.position }} />
        </figure>
        <button type="button" className="lookbook-campaign-viewer__step lookbook-campaign-viewer__step--next"
          onClick={() => select(selected + 1)} aria-label={`Next ${name} campaign image`} />
      </dialog>
    </section>
  )
}
