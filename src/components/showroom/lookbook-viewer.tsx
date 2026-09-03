'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { resolveLookProducts } from '@/lib/lookbook-products'
import { LookbookImageStage } from './lookbook-image-stage'
import type { Locale, LookbookItem, LookbookProduct } from '@/types/showroom'

const categories = {
  top: { cn: '上装', en: 'Top' }, bottom: { cn: '下装', en: 'Bottom' },
  dress: { cn: '连衣裙', en: 'Dress' }, outerwear: { cn: '外套', en: 'Outerwear' },
  shoes: { cn: '鞋履', en: 'Shoes' }, bag: { cn: '包袋', en: 'Bag' },
  accessory: { cn: '配饰', en: 'Accessory' },
}

const OpenLook = createContext<(index: number) => void>(() => {})

export function LookbookImageButton({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  const open = useContext(OpenLook)
  return <button type="button" className="lookbook-image-button" aria-label={label} onClick={() => open(index)}>{children}</button>
}

export function LookbookViewer({ looks, products, name, season, locale, children }: {
  looks: readonly LookbookItem[]; products?: readonly LookbookProduct[]; name: string; season: string; locale: Locale; children: ReactNode
}) {
  const [active, setActive] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const productList = useRef<HTMLElement>(null)
  const opened = active !== null
  const cn = locale === 'cn'
  const look = active === null ? undefined : looks[active]
  const linkedProducts = look ? resolveLookProducts(look, products) : []
  const selected = linkedProducts.find(product => product.id === selectedId)
  const showLook = (index: number) => {
    if (!looks[index]) return
    setSelectedId(null)
    setActive(index)
    content.current?.scrollTo({ top: 0 })
    productList.current?.scrollTo({ top: 0 })
  }
  const move = (direction: number) => {
    if (active !== null && looks.length) showLook((active + direction + looks.length) % looks.length)
  }
  const close = () => { setActive(null); setSelectedId(null) }
  const returnToLook = () => {
    productList.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus()
    setSelectedId(null)
    content.current?.scrollTo({ top: 0 })
  }

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

  return <OpenLook.Provider value={showLook}>
    {children}
    <dialog ref={dialog} className="lookbook-viewer" aria-label={`${name} Lookbook`}
      onCancel={(event) => {
        if (selected) { event.preventDefault(); returnToLook() }
        else close()
      }} onClose={close}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
      {active !== null && look && <>
        <header className="lookbook-viewer__header">
          <div className="lookbook-viewer__identity"><span lang="en">{name}</span><span lang="en">{season} LOOKBOOK</span></div>
          <button type="button" autoFocus onClick={close} aria-label={cn ? '关闭' : 'Close'}><X size={20} strokeWidth={1.25} aria-hidden="true" /></button>
        </header>
        <div ref={content} className={`lookbook-viewer__content${linkedProducts.length ? ' lookbook-viewer__content--styled' : ''}`}>
          <LookbookImageStage key={`${active}-${selected?.id ?? 'look'}`} src={selected?.image ?? look.image}
            alt={selected ? selected.name[locale] : `${name} LOOK ${String(active + 1).padStart(2, '0')}`}
            sizes={linkedProducts.length ? '(max-width: 900px) 90vw, 62vw' : '90vw'} cn={cn} onNavigate={move}
            onVerticalDrag={delta => { if (content.current) content.current.scrollTop += delta }}>
            {selected && <button type="button" className="lookbook-viewer__return" onClick={returnToLook}>
              <span className="lookbook-viewer__look-thumb"><Image src={look.image} alt="" fill sizes="72px" /></span>
              <span>{cn ? '完整造型' : 'Complete look'}</span><ArrowLeft size={14} strokeWidth={1.25} aria-hidden="true" />
            </button>}
          </LookbookImageStage>
          {linkedProducts.length > 0 && <aside ref={productList} className="lookbook-viewer__styling" aria-label={cn ? '造型搭配单品' : 'Pieces in this look'}>
            <div className="lookbook-viewer__styling-heading">
              <h2>{cn ? '造型搭配' : 'In this look'}</h2>
              <span>{String(linkedProducts.length).padStart(2, '0')} {cn ? '件单品' : 'pieces'}</span>
            </div>
            <div className="lookbook-viewer__products">
              {linkedProducts.map(product => <button type="button" key={product.id}
                className="lookbook-viewer__product" aria-pressed={selected?.id === product.id}
                onClick={() => { setSelectedId(product.id); content.current?.scrollTo({ top: 0 }) }}>
                <span className="lookbook-viewer__product-image"><Image src={product.image} alt="" fill sizes="(max-width: 900px) 40vw, 160px" /></span>
                <span className="lookbook-viewer__product-copy">
                  <span className="lookbook-viewer__category">{categories[product.category][locale]}</span>
                  <span>{product.name[locale]}</span>
                  {product.styleNumber && <span className="lookbook-viewer__sku">{cn ? '款号' : 'Style'} {product.styleNumber}</span>}
                </span>
              </button>)}
            </div>
            {selected && <div className="lookbook-viewer__product-detail" aria-live="polite">
              <h3>{selected.name[locale]}</h3>
              {(selected.material?.[locale] || selected.color?.[locale]) && <dl>
                {selected.material?.[locale] && <div><dt>{cn ? '材质' : 'Material'}</dt><dd>{selected.material[locale]}</dd></div>}
                {selected.color?.[locale] && <div><dt>{cn ? '颜色' : 'Colour'}</dt><dd>{selected.color[locale]}</dd></div>}
              </dl>}
              {selected.description?.[locale] && <p>{selected.description[locale]}</p>}
            </div>}
          </aside>}
        </div>
        <footer className="lookbook-viewer__footer">
          <button type="button" disabled={looks.length < 2} onClick={() => move(-1)} aria-label={cn ? '上一张' : 'Previous image'}><ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" /></button>
          <span aria-live="polite"><span lang="en">LOOK </span>{String(active + 1).padStart(2, '0')} / {String(looks.length).padStart(2, '0')}</span>
          <button type="button" disabled={looks.length < 2} onClick={() => move(1)} aria-label={cn ? '下一张' : 'Next image'}><ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" /></button>
        </footer>
      </>}
    </dialog>
  </OpenLook.Provider>
}
