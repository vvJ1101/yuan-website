'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MediaFrame } from './media-frame'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import { nextPreviewIndex } from '@/lib/collaboration-preview'
import type { EditorialProject } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

export function CollaborationIndex({ projects, locale }: { projects: readonly EditorialProject[]; locale: Locale }) {
  const collaborationProjects = useMemo(() => projects.filter(project => project.kind === 'collaboration'), [projects])
  const [selectedSlug, setSelectedSlug] = useState(collaborationProjects[0]?.slug)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const selected = collaborationProjects.find(project => project.slug === selectedSlug) ?? collaborationProjects[0]
  const previewImages = selected?.previewImages?.length ? selected.previewImages : selected ? [selected.coverImage] : []
  const projectHref = (slug: string) => localePath(locale, `/collaborations/${slug}`)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)
    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reduceMotion || isInteracting || previewImages.length < 2) return
    let timer: ReturnType<typeof setInterval> | undefined
    const start = () => {
      if (document.hidden || timer) return
      timer = setInterval(() => setPreviewIndex((current) => nextPreviewIndex(current, previewImages.length)), 5200)
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
  }, [isInteracting, previewImages.length, reduceMotion, selectedSlug])

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
        <button type="button" className="collaboration-directory__entry" data-preview={selected.slug === project.slug}
          aria-pressed={selected.slug === project.slug} aria-controls="collaboration-preview"
          onClick={() => { setSelectedSlug(project.slug); setPreviewIndex(0) }}>
          <span className="collaboration-directory__eyebrow" lang="en">{`YUAN SHOWROOM × ${project.partner}`}</span>
          <span className="collaboration-directory__title">{localize(project.title, locale)}</span>
          <span className="collaboration-directory__meta">{localizeEditorialCategory(project.category, locale)} · {project.year}{project.isSample ? ` · ${String(index + 1).padStart(2, '0')}` : ''}</span>
        </button>
      </article>)}
    </div>
    <aside id="collaboration-preview" className="collaboration-directory__preview" aria-label={locale === 'cn' ? '项目图片预览' : 'Project image preview'}>
        <div className="collaboration-directory__visual" key={selected.slug}>
          {previewImages.map((image, index) => <div key={`${selected.slug}-${image.src}`} className="collaboration-directory__image" data-visible={index === previewIndex} aria-hidden={index !== previewIndex}>
            <MediaFrame {...image} alt={localize(image.alt, locale)} priority={selected === collaborationProjects[0] && index === 0} sizes="(max-width: 1300px) 52vw, 680px" />
          </div>)}
        </div>
        <div className="collaboration-directory__caption">
          {selected.kind === 'collaboration' && <span className="collaboration-directory__identity" aria-live="polite" aria-atomic="true">{localizeEditorialCategory(selected.category, locale)} / {selected.year}</span>}
          <Link className="editorial-link" href={projectHref(selected.slug)}>{locale === 'cn' ? '查看项目 ↗' : 'VIEW PROJECT ↗'}</Link>
        </div>
    </aside>
  </div>
}
