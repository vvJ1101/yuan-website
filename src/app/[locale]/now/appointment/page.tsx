import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { appointmentContent, currentEvent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="appointment-page">
      <section className="appointment-page__invitation" aria-labelledby="appointment-title">
        <div className="appointment-page__meta">
          <p>{localize(appointmentContent.label, locale)}</p>
          <p>{appointmentContent.edition} · {localize(appointmentContent.location, locale)}</p>
          <Link className="appointment-page__close" href={localePath(locale, '/now')}>
            CLOSE
          </Link>
        </div>

        <header className="appointment-page__theme">
          <h1 id="appointment-title">
            <span>ECHOES</span>
            <span>OF DECO</span>
          </h1>
          <div className="appointment-page__identity">
            <p>YUAN SHOWROOM</p>
            <p>{appointmentContent.season}</p>
          </div>
        </header>

        <div className="appointment-page__action">
          <MediaFrame
            className="appointment-page__qr"
            src={currentEvent.appointmentQrImage}
            alt={locale === 'cn' ? '27PS 上海订货会预约小程序码' : '27PS Shanghai ordering season appointment mini-program code'}
            ratio="1 / 1"
            sizes="(max-width: 640px) 78vw, 420px"
            priority
            unoptimized
          />
          <p className="appointment-page__scan">{localize(appointmentContent.scan, locale)}</p>
        </div>

        <ol className="appointment-page__steps">
          {appointmentContent.steps.map((step, index) => (
            <li key={step.en}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{localize(step, locale)}</p>
            </li>
          ))}
        </ol>

        <p className="appointment-page__review">{localize(appointmentContent.review, locale)}</p>
      </section>
    </main>
  )
}
