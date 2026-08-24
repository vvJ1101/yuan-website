import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="appointment-page">
      <section aria-labelledby="appointment-title">
        <h1 id="appointment-title">{localize(currentEvent.title, locale)}</h1>
        <p className="appointment-page__season">{currentEvent.season}</p>
        <MediaFrame
          className="appointment-page__qr"
          src={currentEvent.appointmentQrImage}
          alt={locale === 'cn' ? '上海时装周订货会预约二维码' : 'Shanghai Fashion Week appointment QR code'}
          ratio="1 / 1"
          sizes="360px"
          priority
        />
      </section>
    </main>
  )
}
