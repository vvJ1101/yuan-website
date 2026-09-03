'use client'

import Image from 'next/image'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

const OpenLook = createContext<(index: number) => void>(() => {})

export function LookbookImageButton({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  const open = useContext(OpenLook)
  return <button type="button" className="lookbook-image-button" aria-label={label} onClick={() => open(index)}>{children}</button>
}

export function LookbookViewer({ images, name, locale, children }: { images: string[]; name: string; locale: 'cn' | 'en'; children: ReactNode }) {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opened = active !== null
  const cn = locale === 'cn'
  const move = (direction: number) => setActive((index) => index === null ? null : (index + direction + images.length) % images.length)

  useEffect(() => {
    if (!opened) return
    const element = dialog.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element?.showModal()
    return () => {
      element?.close()
      document.body.style.overflow = overflow
    }
  }, [opened])

  return <OpenLook.Provider value={setActive}>
    {children}
    <dialog ref={dialog} className="lookbook-viewer" aria-label={`${name} Lookbook`}
      onCancel={() => setActive(null)} onClose={() => setActive(null)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
      {active !== null && <>
        <header className="lookbook-viewer__header">
          <span>{name}</span>
          <button type="button" autoFocus onClick={() => setActive(null)}>{cn ? '关闭' : 'Close'}</button>
        </header>
        <div className="lookbook-viewer__image">
          <Image src={images[active]} alt={`${name} LOOK ${String(active + 1).padStart(2, '0')}`} fill sizes="90vw" />
        </div>
        <footer className="lookbook-viewer__footer">
          <button type="button" onClick={() => move(-1)} aria-label={cn ? '上一张' : 'Previous image'}>←</button>
          <span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label={cn ? '下一张' : 'Next image'}>→</button>
        </footer>
      </>}
    </dialog>
  </OpenLook.Provider>
}
