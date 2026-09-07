import { notFound } from 'next/navigation'
import Image from 'next/image'

import { OnSiteServiceViewer } from '@/components/showroom/onsite-service-viewer'
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
      <header className="onsite-page__intro">
        <div>
          <p>{locale === 'cn' ? '订货会期间' : 'During the showroom'}</p>
          <h1>{locale === 'cn' ? '现场配套服务' : 'On-site Services'}</h1>
        </div>
        <nav aria-label={locale === 'cn' ? '现场服务索引' : 'On-site service index'}>
          {onSiteServices.map((service, index) => (
            <a key={service.id} href={`#${service.id}`}>
              {String(index + 1).padStart(2, '0')} {localize(service.category, locale)}
            </a>
          ))}
        </nav>
      </header>

      <div className="onsite-page__services">
        {onSiteServices.map((service, index) => (
          <article id={service.id} className={`onsite-service${index % 2 ? ' onsite-service--reversed' : ''}`} key={service.id}>
            <section className="onsite-service__copy" aria-labelledby={`onsite-${service.id}`}>
              <span className="onsite-service__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="onsite-service__category">{localize(service.category, locale)}</p>
                <h1 id={`onsite-${service.id}`} lang="en">{service.name}</h1>
                <p className="onsite-service__description">{localize(service.description, locale)}</p>
                <dl className="onsite-service__details">
                  <div><dt>{locale === 'cn' ? '位置' : 'LOCATION'}</dt><dd>{localize(service.location, locale)}</dd></div>
                  <div><dt>{locale === 'cn' ? '供应' : 'OFFERING'}</dt><dd>{localize(service.offering, locale)}</dd></div>
                  <div><dt>{locale === 'cn' ? '时段' : 'HOURS'}</dt><dd>{localize(service.hours, locale)}</dd></div>
                </dl>
                <OnSiteServiceViewer serviceName={service.name} label={localize(service.detailLabel, locale)} images={service.detailImages} cn={locale === 'cn'} />
              </div>
            </section>
            <div className="onsite-service__media">
              {service.images.slice(0, 2).map((src, imageIndex) => (
                <div className="onsite-service__image" key={src}>
                  <Image
                    src={src}
                    alt={`${service.name} — ${locale === 'cn' ? '现场服务' : 'on-site service'} ${imageIndex + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
