'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MediaFrame } from './media-frame'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { PopUpEvent } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

function EventTitle({ project, locale }: { project: PopUpEvent; locale: Locale }) {
  const [brand, ...theme] = localize(project.title, locale).split(/\s[|I]\s/)
  return <>{brand}{theme.length > 0 && <span>{theme.join(' | ')}</span>}</>
}

function EventDates({ project, locale }: { project: PopUpEvent; locale: Locale }) {
  const city = localize(project.city, locale)
  if (!city && !project.startDate) return null
  return <p>{city}{city && project.startDate ? ' · ' : ''}{project.startDate && <time dateTime={project.startDate}>{project.startDate.replaceAll('-', '.')}</time>}{project.endDate && <> — <time dateTime={project.endDate}>{project.endDate.replaceAll('-', '.')}</time></>}</p>
}

export function EventPosterIndex({ projects, locale }: { projects: readonly PopUpEvent[]; locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeProject = projects[Math.min(activeIndex, projects.length - 1)]

  useEffect(() => {
    if (
      isPaused ||
      projects.length < 2 ||
      window.matchMedia('(max-width: 900px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % Math.min(projects.length, 3))
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, projects.length])

  if (!activeProject) return <p role="status">{locale === 'cn' ? '该分类暂无活动。' : 'No events in this category yet.'}</p>

  return (
    <section
      className={`event-poster-directory event-poster-directory--${Math.min(projects.length, 3)}`}
      aria-label={locale === 'cn' ? '活动目录' : 'Event directory'}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false)
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="event-poster-directory__posters">
        {projects.slice(0, 3).map((project, index) => (
          <Link
            className={`event-poster-directory__poster event-poster-directory__poster--${index + 1}`}
            data-preview={index === activeIndex ? 'true' : undefined}
            href={localePath(locale, `/pop-up-events/${project.slug}`)}
            key={project.slug}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <MediaFrame
              {...project.coverImage}
              alt={localize(project.coverImage.alt, locale)}
              priority={index === 0}
              sizes="(max-width: 640px) 92vw, (max-width: 900px) 44vw, 260px"
            />
            <span className="event-poster-directory__poster-label">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong><EventTitle project={project} locale={locale} /></strong>
            </span>
          </Link>
        ))}
      </div>

      <div className="event-poster-directory__identity">
        <p className="event-poster-directory__state">
          {activeProject.status ? localizeEditorialCategory(activeProject.status, locale) : locale === 'cn' ? '活动档案' : 'EVENT EDITION'}
        </p>
        <Link href={localePath(locale, `/pop-up-events/${activeProject.slug}`)}>
          <h2 key={activeProject.slug}><EventTitle project={activeProject} locale={locale} /></h2>
        </Link>
        <EventDates project={activeProject} locale={locale} />
        {localize(activeProject.venue, locale) && <p>{localize(activeProject.venue, locale)}</p>}
        <Link className="editorial-link" href={localePath(locale, `/pop-up-events/${activeProject.slug}`)}>
          {locale === 'cn' ? '查看活动 ↗' : 'VIEW EVENT ↗'}
        </Link>
      </div>

      <p className="event-poster-directory__hint">{locale === 'cn' ? '悬停预览 · 点击进入' : 'HOVER TO PREVIEW · SELECT TO OPEN'}</p>
      <p className="event-poster-directory__count" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, '0')} / {String(Math.min(projects.length, 3)).padStart(2, '0')}
      </p>
    </section>
  )
}
