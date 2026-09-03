import Link from 'next/link'

import { MediaFrame } from './media-frame'
import { CollaborationContact } from './collaboration-contact'
import { collaborationContact } from '@/data/editorial'
import { featureFirst, filterProjects, projectCategory, sectionPath } from '@/lib/editorial'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { EditorialProject, EditorialSection } from '@/types/editorial'
import type { Locale, LocalizedText } from '@/types/showroom'

const titles = { 'pop-up-events': 'POP-UP EVENTS', collaborations: 'COLLABORATIONS' }

function ProjectName({ project, locale }: { project: EditorialProject; locale: Locale }) {
  return project.kind === 'event' ? localize(project.title, locale) : `YUAN × ${project.partner}`
}

function ProjectMeta({ project, locale }: { project: EditorialProject; locale: Locale }) {
  return project.kind === 'event' ? (
    <p>{localize(project.city, locale)} · <time dateTime={project.startDate}>{project.startDate.replaceAll('-', '.')}</time> — <time dateTime={project.endDate}>{project.endDate.replaceAll('-', '.')}</time></p>
  ) : (
    <><p>{localize(project.subtitle, locale)}</p><p>{project.category} · {project.year}</p></>
  )
}

function ProjectCard({ project, locale, featured = false }: { project: EditorialProject; locale: Locale; featured?: boolean }) {
  return (
    <article className={featured ? 'editorial-feature' : 'editorial-card'}>
      <Link className="recap-card__link" href={localePath(locale, `/${sectionPath(project)}/${project.slug}`)}>
        <MediaFrame {...project.coverImage} alt={localize(project.coverImage.alt, locale)} priority={featured} sizes={featured ? '(max-width: 900px) 92vw, 64vw' : '(max-width: 640px) 92vw, 44vw'} />
        <div className="editorial-card__copy">
          <h2><ProjectName project={project} locale={locale} /></h2>
          <ProjectMeta project={project} locale={locale} />
          {featured && project.kind === 'event' && <p>{localize(project.venue, locale)}</p>}
          <span className="editorial-link">{locale === 'cn' ? '查看详情' : 'VIEW PROJECT'}</span>
        </div>
      </Link>
    </article>
  )
}

export function EditorialIndex({ locale, section, projects, categories, category }: {
  locale: Locale
  section: EditorialSection
  projects: readonly EditorialProject[]
  categories: readonly string[]
  category?: string
}) {
  const selected = categories.includes(category ?? '') ? category : undefined
  const { featured, remaining } = featureFirst(filterProjects(projects, selected))
  const archive = !selected && section === 'pop-up-events' ? remaining.filter((item) => projectCategory(item) === 'ARCHIVE') : []
  const others = remaining.filter((item) => !archive.includes(item))

  return (
    <main className="editorial-page">
      <header className="editorial-heading">
        <h1>{titles[section]}</h1>
        <nav className="editorial-filters" aria-label={locale === 'cn' ? '内容分类' : 'Content categories'}>
          {[undefined, ...categories].map((value) => (
            <Link key={value ?? 'all'} href={`${localePath(locale, `/${section}`)}${value ? `?category=${value}` : ''}`} aria-current={value === selected ? 'page' : undefined}>
              {value ?? 'ALL'}
            </Link>
          ))}
        </nav>
        {projects.some((project) => project.isSample) && <p className="editorial-sample">{locale === 'cn' ? '示例内容 · 活动、合作方及日期仅供排版预览' : 'SAMPLE CONTENT · Events, partners and dates are for layout preview only'}</p>}
      </header>
      {featured ? <ProjectCard project={featured} locale={locale} featured /> : <p role="status">{locale === 'cn' ? '该分类暂无项目。' : 'No projects in this category yet.'}</p>}
      {others.length > 0 && <section className="editorial-list" aria-label={locale === 'cn' ? '更多项目' : 'More projects'}>
        <div className="editorial-grid">{others.map((project) => <ProjectCard project={project} locale={locale} key={project.slug} />)}</div>
      </section>}
      {archive.length > 0 && <section className="editorial-list" aria-labelledby="archive-title">
        <h2 id="archive-title">ARCHIVE</h2>
        <div className="editorial-grid">{archive.map((project) => <ProjectCard project={project} locale={locale} key={project.slug} />)}</div>
      </section>}
    </main>
  )
}

function TextSection({ title, paragraphs, locale }: { title: string; paragraphs: readonly LocalizedText[]; locale: Locale }) {
  if (!paragraphs.length) return null
  return <section className="editorial-prose"><h2>{title}</h2>{paragraphs.map((text, index) => <p key={index}>{localize(text, locale)}</p>)}</section>
}

export function EditorialDetail({ project, locale }: { project: EditorialProject; locale: Locale }) {
  const section = sectionPath(project)
  const backHref = localePath(locale, `/${section}`)
  return (
    <main className={`editorial-detail editorial-detail--${project.kind}`}>
      <div className="editorial-detail__visual">
        <MediaFrame {...project.coverImage} alt={localize(project.coverImage.alt, locale)} priority sizes="(max-width: 900px) 92vw, 64vw" />
      </div>
      <header className="editorial-detail__identity">
        <Link className="editorial-link" href={backHref}>{titles[section]}</Link>
        <h1><ProjectName project={project} locale={locale} /></h1>
        <ProjectMeta project={project} locale={locale} />
        {project.kind === 'event' && <p>{localize(project.venue, locale)}</p>}
        {project.isSample && <p className="editorial-sample">{locale === 'cn' ? '示例项目 · 非正式发布' : 'SAMPLE PROJECT · Not an announcement'}</p>}
      </header>
      <div className="editorial-detail__body">
        <TextSection title={project.kind === 'event' ? (locale === 'cn' ? '活动介绍' : 'ABOUT THE EVENT') : (locale === 'cn' ? '合作概念' : 'CONCEPT')} paragraphs={project.kind === 'event' ? project.description : project.concept} locale={locale} />
        {project.kind === 'collaboration' && <TextSection title={locale === 'cn' ? '创作过程' : 'BEHIND THE SCENES'} paragraphs={project.process} locale={locale} />}
        {project.gallery.length > 0 && <section className="editorial-gallery" aria-label={locale === 'cn' ? '项目图片' : 'Project gallery'}>
          {project.gallery.map((image, index) => <MediaFrame {...image} alt={localize(image.alt, locale)} key={`${image.src}-${index}`} sizes="(max-width: 900px) 92vw, 64vw" />)}
        </section>}
        {project.kind === 'event' ? (
          project.participatingBrands.length > 0 && <section className="editorial-prose"><h2>{locale === 'cn' ? '参与品牌与设计师' : 'PARTICIPATING BRANDS & DESIGNERS'}</h2><ul>{project.participatingBrands.map((brand) => <li key={brand}>{brand}</li>)}</ul></section>
        ) : <TextSection title={locale === 'cn' ? '最终成果' : 'OUTCOMES'} paragraphs={project.outcomes} locale={locale} />}
        <TextSection title="CREDITS" paragraphs={project.credits} locale={locale} />
        {project.kind === 'collaboration' && <CollaborationContact locale={locale} contact={collaborationContact} />}
        <Link className="editorial-link" href={backHref}>{locale === 'cn' ? '返回列表' : 'BACK TO ALL PROJECTS'}</Link>
      </div>
    </main>
  )
}
