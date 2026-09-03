'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LookbookImageStage } from './lookbook-image-stage'

const menuImage = '/images/showroom/on-site/aano-cafe-menu-20260903.jpg'
const noNavigation = () => {}

export function OnSiteMenu({ cn }: { cn: boolean }) {
  const [opened, setOpened] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

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

  return <>
    <section className="onsite-menu" aria-label={cn ? '咖啡厅菜单' : 'Café menu'}>
      <h2>Menu</h2>
      <p>{cn ? '咖啡、甜品与精选周边，为选品间隙留一点时间。' : 'Coffee, desserts and selected merchandise. A little time for yourself between selections.'}</p>
      <button className="onsite-menu__trigger" ref={trigger} type="button" aria-haspopup="dialog" onClick={() => setOpened(true)}>
        <Image src={menuImage} width={3508} height={2480} alt={cn ? 'Aano Café 完整菜单缩略图' : 'Aano Café full menu thumbnail'} sizes="260px" />
        <span>{cn ? '点击查看菜单' : 'View menu'}</span>
      </button>
    </section>
    <dialog ref={dialog} className="lookbook-viewer onsite-menu-lightbox" aria-label={cn ? 'Aano Café 菜单' : 'Aano Café menu'}
      onClose={() => setOpened(false)} onCancel={() => setOpened(false)} onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpened(false)
      }}>
      {opened && <>
        <button className="onsite-menu-lightbox__close" type="button" autoFocus aria-label={cn ? '关闭菜单' : 'Close menu'} onClick={() => setOpened(false)}><X size={20} strokeWidth={1.25} aria-hidden="true" /></button>
        <LookbookImageStage src={menuImage} alt={cn ? '咖啡、饮品、甜品、咖啡豆与周边菜单及价格' : 'Coffee, drinks, desserts, beans and merchandise menu with prices'} sizes="92vw" cn={cn} onNavigate={noNavigation} onVerticalDrag={noNavigation} />
      </>}
    </dialog>
  </>
}
