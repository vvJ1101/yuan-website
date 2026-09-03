import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale } from '@/lib/showroom-i18n'

export default async function FloorMapPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="floor-map-page">
      <header>
        <h1 lang="en">FLOOR GUIDE</h1>
        <p>楼层介绍</p>
      </header>
      <MediaFrame
        className="floor-map-page__image"
        src={currentEvent.floorMapImage}
        alt={locale === 'cn' ? 'YUAN SHOWROOM 三层楼层导览图' : 'YUAN SHOWROOM three-floor guide map'}
        ratio="6 / 7"
        sizes="100vw"
        priority
      />
    </main>
  )
}
