'use client'

import { useRef } from 'react'

import { MediaFrame } from './media-frame'
import type { Locale } from '@/types/showroom'

export interface CollaborationContactData {
  qrImage: string
}

export function CollaborationContact({ locale, contact }: { locale: Locale; contact: CollaborationContactData | null }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  return (
    <section className="editorial-contact">
      <h2>{locale === 'cn' ? '一起合作' : 'LET’S COLLABORATE'}</h2>
      {contact ? <>
        <button className="editorial-link" ref={trigger} type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
          {locale === 'cn' ? '微信联系' : 'CONTACT ON WECHAT'}
        </button>
        <dialog className="editorial-contact__dialog" ref={dialog} aria-labelledby="contact-title" onClose={() => trigger.current?.focus()} onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect()
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close()
          }
        }}>
          <button className="editorial-link" type="button" onClick={() => dialog.current?.close()} autoFocus>{locale === 'cn' ? '关闭' : 'CLOSE'}</button>
          <h2 id="contact-title">{locale === 'cn' ? '微信合作咨询' : 'CONNECT ON WECHAT'}</h2>
          <MediaFrame src={contact.qrImage} alt={locale === 'cn' ? 'YUAN SHOWROOM 合作咨询微信二维码' : 'YUAN SHOWROOM collaboration WeChat QR code'} ratio="1 / 1" sizes="280px" unoptimized />
          <p>{locale === 'cn' ? '使用微信扫描二维码' : 'Scan this code with WeChat'}</p>
        </dialog>
      </> : <p>{locale === 'cn' ? '合作咨询微信二维码待提供。' : 'Collaboration WeChat QR code to be supplied.'}</p>}
    </section>
  )
}
