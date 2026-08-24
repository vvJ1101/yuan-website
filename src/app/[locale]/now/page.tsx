import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

const destinations = [
  { path: '/now/lookbook', cn: '参展品牌', en: 'LOOKBOOK' },
  { path: '/now/floor-map', cn: '楼层介绍', en: 'FLOOR GUIDE' },
  { path: '/now/appointment', cn: '预约通道', en: 'APPOINTMENT' },
] as const

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="now-event">
      <section className="now-event__summary" aria-labelledby="now-event-title">
        <p className="now-event__city">{localize(currentEvent.city, locale)}</p>
        <h1 id="now-event-title">{localize(currentEvent.title, locale)}</h1>
        <p className="now-event__season">{currentEvent.season}</p>
        <p className="now-event__dates">{localize(currentEvent.dates, locale)}</p>
      </section>

      <MediaFrame
        className="now-event__image"
        src={currentEvent.heroImage}
        alt={`${localize(currentEvent.title, locale)} ${locale === 'cn' ? '展厅现场' : 'showroom'}`}
        ratio="4 / 3"
        sizes="(max-width: 900px) 100vw, 64vw"
        priority
      />

      <nav className="now-event__destinations" aria-label={locale === 'cn' ? '当前订货会' : 'Current event'}>
        {destinations.map((destination) => (
          <Link href={localePath(locale, destination.path)} key={destination.path}>
            <strong>{locale === 'cn' ? destination.cn : destination.en}</strong>
            <span>{locale === 'cn' ? destination.en : destination.cn}</span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
