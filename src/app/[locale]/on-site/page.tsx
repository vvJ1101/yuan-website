import { notFound } from 'next/navigation'

import { OnSiteCarousel } from '@/components/showroom/onsite-carousel'
import { OnSiteMenu } from '@/components/showroom/onsite-menu'
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
            <h1 id={`onsite-${service.id}`} lang="en">{service.name}</h1>
            <p className="onsite-service__description">{localize(service.description, locale)}</p>
            <dl className="onsite-service__details">
              <div><dt>{locale === 'cn' ? '位置' : 'LOCATION'}</dt><dd>{localize(service.location, locale)}</dd></div>
              <div><dt>{locale === 'cn' ? '供应' : 'OFFERING'}</dt><dd>{localize(service.offering, locale)}</dd></div>
              <div><dt>{locale === 'cn' ? '时段' : 'HOURS'}</dt><dd>{localize(service.hours, locale)}</dd></div>
            </dl>
          </section>
          <OnSiteCarousel images={service.images} label={service.name} locale={locale} />
          <OnSiteMenu cn={locale === 'cn'} />
        </article>
      ))}
    </main>
  )
}
