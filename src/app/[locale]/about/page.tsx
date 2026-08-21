import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { aboutContent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <main className="showroom-about">
      <div className="showroom-about__intro">
        <section className="showroom-about__copy" aria-labelledby="about-title">
          <h1 id="about-title">ABOUT</h1>
          <span className="showroom-about__rule" aria-hidden="true" />
          <div className="showroom-about__body">
            {aboutContent.introduction.map((paragraph) => (
              <p key={paragraph.en}>{localize(paragraph, locale)}</p>
            ))}
          </div>
          <a className="showroom-about__more" href="#about-statistics">
            {localize(aboutContent.readMoreLabel, locale)}
          </a>
        </section>

        <MediaFrame
          className="showroom-about__media"
          src={aboutContent.image}
          alt={localize(aboutContent.imageAlt, locale)}
          ratio="56 / 37"
          priority
        />
      </div>

      <section
        className="showroom-about__statistics"
        id="about-statistics"
        aria-label={locale === 'cn' ? 'YUAN SHOWROOM 数据' : 'YUAN SHOWROOM statistics'}
      >
        {aboutContent.statistics.map((statistic) => (
          <article className="showroom-about__statistic" key={statistic.value}>
            <strong>{statistic.value}</strong>
            <h2>{localize(statistic.label, locale)}</h2>
            <p>{localize(statistic.description, locale)}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
