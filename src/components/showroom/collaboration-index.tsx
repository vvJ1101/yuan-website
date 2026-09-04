'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MediaFrame } from './media-frame'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { EditorialProject } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

export function CollaborationIndex({ projects, locale }: { projects: readonly EditorialProject[]; locale: Locale }) {
  const collaborationProjects = useMemo(() => projects.filter(project => project.kind === 'collaboration'), [projects])
  const [selectedSlug, setSelectedSlug] = useState(collaborationProjects[0]?.slug)
  const [isInteracting, setIsInteracting] = useState(false)
  const selected = collaborationProjects.find(project => project.slug === selectedSlug) ?? collaborationProjects[0]
  const projectHref = (slug: string) => localePath(locale, `/collaborations/${slug}`)

  useEffect(() => {
    if (isInteracting || collaborationProjects.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setSelectedSlug(current => {
        const currentIndex = collaborationProjects.findIndex(project => project.slug === current)
        return collaborationProjects[(currentIndex + 1) % collaborationProjects.length].slug
      })
    }, 3000)

    return () => window.clearInterval(timer)
  }, [collaborationProjects, isInteracting])

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
    <div className="collaboration-directory__list" role="region" aria-label={locale === 'cn' ? '合作项目列表' : 'Collaboration projects'} tabIndex={0}>
      {collaborationProjects.map((project, index) => <article key={project.slug}>
        <Link className="collaboration-directory__entry" href={projectHref(project.slug)} data-preview={selected.slug === project.slug} aria-current={selected.slug === project.slug ? 'true' : undefined} onMouseEnter={() => setSelectedSlug(project.slug)} onFocus={() => setSelectedSlug(project.slug)}>
          <span className="collaboration-directory__eyebrow" lang="en">{`YUAN SHOWROOM × ${project.partner}`}</span>
          <span className="collaboration-directory__title">{localize(project.title, locale)}</span>
          <span className="collaboration-directory__meta">{localizeEditorialCategory(project.category, locale)} · {project.year}{project.isSample ? ` · ${String(index + 1).padStart(2, '0')}` : ''}</span>
        </Link>
      </article>)}
    </div>
    <aside id="collaboration-preview" className="collaboration-directory__preview" aria-label={locale === 'cn' ? '项目图片预览' : 'Project image preview'}>
        <Link className="collaboration-directory__visual" href={projectHref(selected.slug)} aria-label={locale === 'cn' ? `查看 YUAN SHOWROOM × ${selected.partner} 项目` : `View YUAN SHOWROOM × ${selected.partner} project`}>
          {collaborationProjects.map(project => <div key={project.slug} className="collaboration-directory__image" data-visible={project.slug === selected.slug} aria-hidden={project.slug !== selected.slug}>
            <MediaFrame {...project.coverImage} alt={localize(project.coverImage.alt, locale)} priority={project === projects[0]} sizes="(max-width: 1300px) 52vw, 680px" />
          </div>)}
        </Link>
        <div className="collaboration-directory__caption">
          {selected.kind === 'collaboration' && <span className="collaboration-directory__identity" aria-live="polite" aria-atomic="true">{localizeEditorialCategory(selected.category, locale)} / {selected.year}</span>}
          <Link className="editorial-link" href={projectHref(selected.slug)}>{locale === 'cn' ? '查看项目 ↗' : 'VIEW PROJECT ↗'}</Link>
        </div>
    </aside>
  </div>
}
