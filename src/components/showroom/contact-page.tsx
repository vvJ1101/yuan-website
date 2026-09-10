'use client'

import { useState, type FormEvent } from 'react'

import { contactLocations, contactMethods, type ContactMethodId } from '@/data/contact'
import { localize } from '@/lib/showroom-i18n'
import type { Locale } from '@/types/showroom'

const copy = {
  cn: {
    introduction: '品牌合作、订货与样衣、媒体及特别项目，请选择咨询类别，我们会将信息发送给对应联系人。',
    inquiry: '咨询表单',
    directedTo: '发送至',
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
    showroom: '展厅',
    wechat: '微信联系',
    qrPending: '二维码待替换',
  },
  en: {
    introduction: 'For brand partnerships, buying appointments, press and special projects. Select an inquiry type and we will direct your message to the right contact.',
    inquiry: 'Inquiry form',
    directedTo: 'Directed to',
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
    showroom: 'Showroom',
    wechat: 'WeChat',
    qrPending: 'QR placeholder',
  },
} as const

const qrCells = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]

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
      <header className="contact-page__intro">
        <p>CONTACT / {locale === 'cn' ? '联系我们' : 'YUAN SHOWROOM'}</p>
        <p>{text.introduction}</p>
      </header>

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
            <p className="contact-form__recipient"><span>{text.directedTo}</span><strong>{method.email}</strong></p>
          </header>

          <form onSubmit={submit}>
            <div className="contact-form__grid">
              <label><span>{text.name}</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>{text.company}</span><input name="company" type="text" autoComplete="organization" required /></label>
              <label><span>{text.email}</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>{text.contact}</span><input name="contact" type="text" autoComplete="tel" /></label>
              <label className="contact-form__wide">
                <span>{text.type}</span>
                <select name="methodId" value={methodId} onChange={(event) => setMethodId(event.target.value as ContactMethodId)}>
                  {contactMethods.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>
              <label className="contact-form__wide"><span>{text.message}</span><textarea name="message" rows={2} required /></label>
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
              <button type="submit" disabled={status === 'submitting'}>{text.send} ↗</button>
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
        {contactLocations.map((location, index) => (
          <section key={location.name}>
            <p>{text.showroom} {String(index + 1).padStart(2, '0')}</p>
            <h2>{location.name}</h2>
            <span>{location.access}</span>
          </section>
        ))}
        <section className="contact-locations__wechat">
          <div><p>{text.wechat}</p><h2>YUAN</h2><span>{text.qrPending}</span></div>
          <div className="contact-qr-placeholder" aria-label={text.qrPending}>
            {qrCells.map((cell, index) => <span key={index} data-filled={cell === 1} />)}
          </div>
        </section>
      </footer>
    </main>
  )
}
