'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { LookbookImageStage } from './lookbook-image-stage'

interface OnSiteServiceViewerProps {
  serviceName: string
  label: string
  images: readonly string[]
  cn: boolean
}

export function OnSiteServiceViewer({ serviceName, label, images, cn }: OnSiteServiceViewerProps) {
  const [opened, setOpened] = useState(false)
  const [active, setActive] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  const navigate = (direction: number) => {
    if (images.length < 2) return
    setActive((index) => (index + direction + images.length) % images.length)
  }

  useEffect(() => {
    if (!opened) return
    const element = dialog.current
    const opener = trigger.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element?.showModal()
    return () => {
      element?.close()
      document.body.style.overflow = overflow
      opener?.focus({ preventScroll: true })
    }
  }, [opened])

  if (images.length === 0) return null

  return <>
    <button ref={trigger} className="onsite-service__view" type="button" aria-haspopup="dialog" onClick={() => setOpened(true)}>
      {label}
    </button>
    <dialog ref={dialog} className="lookbook-viewer onsite-service-viewer" aria-label={`${serviceName} — ${label}`}
      onClose={() => setOpened(false)} onCancel={() => setOpened(false)} onKeyDown={event => {
        if (event.key === 'ArrowLeft') navigate(-1)
        if (event.key === 'ArrowRight') navigate(1)
      }} onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpened(false)
      }}>
      {opened && <>
        <LookbookImageStage src={images[active]} alt={`${serviceName} — ${active + 1} / ${images.length}`}
          sizes="92vw" cn={cn} onNavigate={navigate} onVerticalDrag={() => {}}>
          <span className="onsite-service-viewer__count" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        </LookbookImageStage>
        <button className="onsite-service-viewer__close" type="button" autoFocus aria-label={cn ? '关闭' : 'Close'} onClick={() => setOpened(false)}>
          <X size={21} strokeWidth={1.25} aria-hidden="true" />
        </button>
        {images.length > 1 && <>
          <button className="onsite-service-viewer__previous" type="button" aria-label={cn ? '上一张' : 'Previous image'} onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth={1.25} aria-hidden="true" />
          </button>
          <button className="onsite-service-viewer__next" type="button" aria-label={cn ? '下一张' : 'Next image'} onClick={() => navigate(1)}>
            <ChevronRight size={24} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </>}
      </>}
    </dialog>
  </>
}
