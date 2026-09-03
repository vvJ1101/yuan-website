'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MediaFrame } from './media-frame'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { EditorialProject } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

export function CollaborationIndex({ projects, locale }: { projects: readonly EditorialProject[]; locale: Locale }) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug)
  const selected = projects.find(project => project.slug === selectedSlug) ?? projects[0]
  if (!selected) return <p role="status">{locale === 'cn' ? '该分类暂无项目。' : 'No projects in this category yet.'}</p>

  return <div className="collaboration-directory">
    <div className="collaboration-directory__list" role="region" aria-label={locale === 'cn' ? '合作项目列表' : 'Collaboration projects'} tabIndex={0}>
      {projects.map(project => project.kind === 'collaboration' && <article key={project.slug}>
        <button type="button" className="collaboration-directory__entry" data-preview={selected.slug === project.slug} aria-pressed={selected.slug === project.slug} aria-controls="collaboration-preview" onClick={() => setSelectedSlug(project.slug)}>
          <span className="collaboration-directory__title" lang="en">YUAN × {project.partner}</span>
          <span className="collaboration-directory__meta">{localizeEditorialCategory(project.category, locale)} / {project.year}</span>
        </button>
      </article>)}
    </div>
    <aside id="collaboration-preview" className="collaboration-directory__preview" aria-label={locale === 'cn' ? '项目图片预览' : 'Project image preview'}>
        <div className="collaboration-directory__visual">
          {projects.map(project => <div key={project.slug} className="collaboration-directory__image" data-visible={project.slug === selected.slug} aria-hidden={project.slug !== selected.slug}>
            <MediaFrame {...project.coverImage} alt={localize(project.coverImage.alt, locale)} priority={project === projects[0]} sizes="(max-width: 1300px) 52vw, 680px" />
          </div>)}
        </div>
        <div className="collaboration-directory__caption">
          {selected.kind === 'collaboration' && <span className="collaboration-directory__identity" aria-live="polite" aria-atomic="true">
            <span lang="en">YUAN × {selected.partner}</span>
            <span>{localizeEditorialCategory(selected.category, locale)} / {selected.year}</span>
          </span>}
          <Link className="editorial-link" href={localePath(locale, `/collaborations/${selected.slug}`)}>{locale === 'cn' ? '查看项目' : 'VIEW PROJECT'}</Link>
        </div>
    </aside>
  </div>
}
