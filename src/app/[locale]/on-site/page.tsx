import { notFound } from 'next/navigation'

import { OnSiteCarousel } from '@/components/showroom/onsite-carousel'
import { onSiteServices } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

export default async function OnSitePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="onsite-page">
      {onSiteServices.map((service) => (
        <article className="onsite-service" key={service.id}>
          <section className="onsite-service__copy" aria-labelledby={`onsite-${service.id}`}>
            <p className="onsite-service__number">{locale === 'cn' ? '现场 · 休憩与交流' : 'On-site · A moment to pause'}</p>
            <h1 id={`onsite-${service.id}`}>{service.name}</h1>
            <p className="onsite-service__description">{localize(service.description, locale)}</p>
          </section>
          <OnSiteCarousel images={service.images} label={service.name} locale={locale} />
            <dl className="onsite-service__details">
              <div><dt>{locale === 'cn' ? '位置' : 'LOCATION'}</dt><dd>{localize(service.location, locale)}</dd></div>
              <div><dt>{locale === 'cn' ? '供应' : 'OFFERING'}</dt><dd>{localize(service.offering, locale)}</dd></div>
              <div><dt>{locale === 'cn' ? '时段' : 'HOURS'}</dt><dd>{localize(service.hours, locale)}</dd></div>
            </dl>
        </article>
      ))}
    </main>
  )
}
