'use client'

import { useState, type FormEvent } from 'react'

import { contactLocations, contactMethods, type ContactMethodId } from '@/data/contact'
import { localize } from '@/lib/showroom-i18n'
import type { Locale } from '@/types/showroom'

const copy = {
  cn: {
    inquiry: '咨询表单',
    directContact: '直接联系方式',
    name: '姓名',
    company: '品牌 / 公司',
    email: '邮箱',
    contact: '微信或电话（选填）',
    type: '咨询类型',
    message: '留言内容',
    attachment: '添加附件（选填）',
    send: '发送咨询',
    selectedFile: '已选择文件',
    submitting: '正在提交…',
    unavailable: '后台接收接口尚未启用，当前信息未保存。',
    error: '提交失败，请稍后重试。',
    base: 'BASED IN',
    connect: '关注 / 联系',
    wechat: '企业微信',
    qrPending: '二维码待替换',
  },
  en: {
    inquiry: 'Inquiry form',
    directContact: 'Direct contact',
    name: 'Name',
    company: 'Brand / company',
    email: 'Email',
    contact: 'WeChat or phone (optional)',
    type: 'Inquiry type',
    message: 'Message',
    attachment: 'Attach file (optional)',
    send: 'Send inquiry',
    selectedFile: 'Selected file',
    submitting: 'Submitting…',
    unavailable: 'The inquiry storage service is not connected yet. Your information was not saved.',
    error: 'Submission failed. Please try again later.',
    base: 'BASED IN',
    connect: 'Follow / connect',
    wechat: 'WeChat',
    qrPending: 'QR placeholder',
  },
} as const

const qrCells = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]

const socialPlatforms = [
  { id: 'wechat', name: 'WeChat' },
  { id: 'xiaohongshu', name: '小红书', href: 'https://www.xiaohongshu.com/user/profile/608794f1000000000100917f' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'douyin', name: '抖音' },
] as const

function SocialIcon({ platform }: { platform: (typeof socialPlatforms)[number]['id'] }) {
  if (platform === 'wechat') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.2 5.2c-4 0-7.2 2.5-7.2 5.7 0 1.8 1 3.4 2.7 4.5l-.7 2.2 2.6-1.3c.8.2 1.7.4 2.6.4 4 0 7.2-2.6 7.2-5.8s-3.2-5.7-7.2-5.7Z"/><path d="M14.7 10c3.5 0 6.3 2.2 6.3 5 0 1.6-.9 3-2.3 3.9l.6 1.9-2.2-1.1c-.8.2-1.5.3-2.4.3-2.7 0-5-1.3-5.9-3.3.5.1.9.1 1.4.1 4.1 0 7.4-2.6 7.4-5.9v-.3c-.9-.4-1.9-.6-2.9-.6Z"/><circle cx="7.8" cy="9.7" r=".7"/><circle cx="12.2" cy="9.7" r=".7"/></svg>
  }

  if (platform === 'instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r="1" className="social-icon__fill"/></svg>
  }

  if (platform === 'douyin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.3 3.5v11.2a4.4 4.4 0 1 1-3.6-4.3v3.1a1.5 1.5 0 1 0 .6 1.2V3.5h3Z"/><path d="M14.3 3.5c.6 2.7 2.2 4.3 4.8 4.8v3c-2-.1-3.6-.8-4.8-1.8"/></svg>
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4" width="19" height="16" rx="4"/><text x="12" y="14.6" textAnchor="middle">小红书</text></svg>
}

function RequiredMark() {
  return <span className="contact-required" aria-hidden="true">*</span>
}

export function ContactPage({ locale }: { locale: Locale }) {
  const text = copy[locale]
  const [methodId, setMethodId] = useState<ContactMethodId>(contactMethods[0].id)
  const [attachmentName, setAttachmentName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'unavailable' | 'error'>('idle')
  const method = contactMethods.find((item) => item.id === methodId) ?? contactMethods[0]

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/inquiries', { method: 'POST', body: new FormData(event.currentTarget) })
      setStatus(response.status === 501 ? 'unavailable' : response.ok ? 'idle' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="contact-page">
      <div className="contact-page__main">
        <section className="contact-directory" aria-labelledby="contact-title">
          <h1 id="contact-title">Let&apos;s<br />connect.</h1>
          <div className="contact-directory__methods" role="group" aria-label={locale === 'cn' ? '咨询类别' : 'Inquiry types'}>
            {contactMethods.map((item, index) => {
              const active = item.id === method.id
              return (
                <button
                  key={item.id}
                  type="button"
                  data-active={active}
                  aria-pressed={active}
                  onClick={() => setMethodId(item.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{localize(item.description, locale)}</small>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="contact-form" aria-labelledby="contact-form-title">
          <header className="contact-form__header">
            <div>
              <p>{text.inquiry}</p>
              <h2 id="contact-form-title">{method.title}</h2>
              <span>{localize(method.description, locale)}</span>
            </div>
          </header>

          <form onSubmit={submit}>
            <div className="contact-form__grid">
              <label><span>{text.name}<RequiredMark /></span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>{text.company}<RequiredMark /></span><input name="company" type="text" autoComplete="organization" required /></label>
              <label><span>{text.email}<RequiredMark /></span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>{text.contact}</span><input name="contact" type="text" autoComplete="tel" /></label>
              <label className="contact-form__wide">
                <span>{text.type}<RequiredMark /></span>
                <select name="methodId" value={methodId} required onChange={(event) => setMethodId(event.target.value as ContactMethodId)}>
                  {contactMethods.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>
              <label className="contact-form__wide"><span>{text.message}<RequiredMark /></span><textarea name="message" rows={2} required /></label>
            </div>

            <div className="contact-form__actions">
              <label className="contact-form__attachment">
                <input
                  type="file"
                  name="attachment"
                  onChange={(event) => setAttachmentName(event.target.files?.[0]?.name ?? '')}
                />
                <span>＋ {text.attachment}</span>
              </label>
              <div className="contact-form__submit-group">
                <p className="contact-form__direct"><span>{text.directContact}</span><strong>{method.email}</strong></p>
                <button type="submit" disabled={status === 'submitting'}>{text.send} ↗</button>
              </div>
            </div>
            <p className="contact-form__notice" aria-live="polite">
              {status === 'submitting' && text.submitting}
              {status === 'unavailable' && text.unavailable}
              {status === 'error' && text.error}
              {status === 'idle' && attachmentName && `${text.selectedFile}: ${attachmentName}`}
            </p>
          </form>
        </section>
      </div>

      <footer className="contact-locations">
        <section className="contact-locations__base">
          <p>{text.base}</p>
          <h2>
            <span>{contactLocations[0].name}</span>
            <span className="contact-locations__separator" aria-hidden="true">/</span>
            <span>{contactLocations[1].name}</span>
          </h2>
        </section>
        <section className="contact-locations__connect">
          <div className="contact-connect__identity">
            <p>{text.connect}</p>
            <h2>YUANSHOWROOM</h2>
          </div>
          <div className="contact-socials" aria-label={text.connect}>
            {socialPlatforms.map((platform) => {
              const content = <><SocialIcon platform={platform.id} /><span>{platform.name}</span></>

              return 'href' in platform ? (
                <a key={platform.id} className="contact-socials__item" href={platform.href} target="_blank" rel="noreferrer" aria-label={`${platform.name} · YUAN SHOWROOM`}>
                  {content}
                </a>
              ) : (
                <span key={platform.id} className="contact-socials__item" title={`${platform.name} · ${text.qrPending}`}>
                  {content}
                </span>
              )
            })}
          </div>
        </section>
        <section className="contact-locations__qr">
          <p>{text.wechat}</p>
          <div className="contact-qr-placeholder" aria-label={text.qrPending}>
            {qrCells.map((cell, index) => <span key={index} data-filled={cell === 1} />)}
          </div>
        </section>
      </footer>
    </main>
  )
}
