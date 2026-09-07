'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { MediaFrame } from './media-frame'
import { collaborationTriptych } from '@/lib/editorial'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { EditorialProject } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

export function CollaborationIndex({ projects, locale }: { projects: readonly EditorialProject[]; locale: Locale }) {
  const collaborationProjects = useMemo(() => projects.filter(project => project.kind === 'collaboration'), [projects])
  const [selectedSlug, setSelectedSlug] = useState(collaborationProjects[0]?.slug)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const selected = collaborationProjects.find(project => project.slug === selectedSlug) ?? collaborationProjects[0]
  const projectHref = (slug: string) => localePath(locale, `/collaborations/${slug}`)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)
    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reduceMotion || isInteracting || collaborationProjects.length < 2) return
    let timer: ReturnType<typeof setInterval> | undefined
    const start = () => {
      if (document.hidden || timer) return
      timer = setInterval(() => {
        setSelectedSlug(current => {
          const currentIndex = collaborationProjects.findIndex(project => project.slug === current)
          return collaborationProjects[(currentIndex + 1) % collaborationProjects.length].slug
        })
      }, 4000)
    }
    const stop = () => {
      if (timer) clearInterval(timer)
      timer = undefined
    }
    const handleVisibility = () => document.hidden ? stop() : start()
    start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [collaborationProjects, isInteracting, reduceMotion])

  if (!selected) return <p role="status">{locale === 'cn' ? '该分类暂无项目。' : 'No projects in this category yet.'}</p>

  return <div
    className="collaboration-directory"
    data-paused={isInteracting}
    onMouseEnter={() => setIsInteracting(true)}
    onMouseLeave={() => setIsInteracting(false)}
    onFocusCapture={() => setIsInteracting(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false)
    }}
  >
    <div className="collaboration-directory__list" role="tablist" aria-label={locale === 'cn' ? '合作项目列表' : 'Collaboration projects'}>
      {collaborationProjects.map((project, index) => <article key={project.slug}>
        <button className="collaboration-directory__entry" type="button" role="tab" data-preview={selected.slug === project.slug} aria-selected={selected.slug === project.slug} aria-controls="collaboration-preview" onClick={() => setSelectedSlug(project.slug)} onMouseEnter={() => setSelectedSlug(project.slug)} onFocus={() => setSelectedSlug(project.slug)}>
          <span className="collaboration-directory__eyebrow" lang="en">{`YUAN SHOWROOM × ${project.partner}`}</span>
          <span className="collaboration-directory__title">{localize(project.title, locale)}</span>
          <span className="collaboration-directory__meta">{localizeEditorialCategory(project.category, locale)} · {project.year}{project.isSample ? ` · ${String(index + 1).padStart(2, '0')}` : ''}</span>
        </button>
      </article>)}
    </div>
    <aside id="collaboration-preview" className="collaboration-directory__preview" role="tabpanel" aria-label={locale === 'cn' ? '项目图片预览' : 'Project image preview'}>
      <Link className="collaboration-directory__visual" href={projectHref(selected.slug)} aria-label={locale === 'cn' ? `查看 YUAN SHOWROOM × ${selected.partner} 项目` : `View YUAN SHOWROOM × ${selected.partner} project`}>
        {collaborationProjects.map(project => <div key={project.slug} className="collaboration-directory__triptych" data-visible={project.slug === selected.slug} aria-hidden={project.slug !== selected.slug}>
          {collaborationTriptych(project).map((image, index) => <MediaFrame key={`${image.src}-${index}`} {...image} alt={localize(image.alt, locale)} priority={project === projects[0]} sizes="(max-width: 640px) 54vw, (max-width: 1100px) 34vw, 420px" className={`collaboration-directory__image collaboration-directory__image--${index + 1}`} />)}
        </div>)}
      </Link>
      <div className="collaboration-directory__caption">
        <span className="collaboration-directory__identity" aria-live="polite" aria-atomic="true">{localizeEditorialCategory(selected.category, locale)} / {selected.year}</span>
        <Link className="editorial-link" href={projectHref(selected.slug)}>{locale === 'cn' ? '查看项目 ↗' : 'VIEW PROJECT ↗'}</Link>
      </div>
    </aside>
  </div>
}
