import Link from 'next/link'

import { MediaFrame } from './media-frame'
import { EventExperience } from './event-experience'
import { CollaborationContact } from './collaboration-contact'
import { CollaborationBlocks } from './collaboration-blocks'
import { CollaborationIndex } from './collaboration-index'
import { StoryBlocks } from './story-blocks'
import { EventPosterIndex } from './event-poster-index'
import { collaborationContact } from '@/data/editorial'
import { eventStories } from '@/data/event-stories'
import { featureFirst, filterProjects, sectionPath } from '@/lib/editorial'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Collaboration, EditorialProject, EditorialSection, PopUpEvent } from '@/types/editorial'
import type { Locale, LocalizedText } from '@/types/showroom'

const titles = { 'pop-up-events': 'POP-UP EVENTS', collaborations: 'COLLABORATIONS' }

function ProjectName({ project, locale }: { project: EditorialProject; locale: Locale }) {
  if (project.kind !== 'event') return `YUAN × ${project.partner}`
  const [brand, ...theme] = localize(project.title, locale).split(/\s[|I]\s/)
  return <span lang="en">{brand}{theme.length > 0 && <span className="event-entry__theme">{theme.join(' | ')}</span>}</span>
}

function ProjectMeta({ project, locale }: { project: EditorialProject; locale: Locale }) {
  return project.kind === 'event' ? (
    (localize(project.city, locale) || project.startDate) && <p>{localize(project.city, locale)}{localize(project.city, locale) && project.startDate ? ' · ' : ''}{project.startDate && <time dateTime={project.startDate}>{project.startDate.replaceAll('-', '.')}</time>}{project.endDate && <> — <time dateTime={project.endDate}>{project.endDate.replaceAll('-', '.')}</time></>}</p>
  ) : (
    <><p>{localize(project.subtitle, locale)}</p><p>{localizeEditorialCategory(project.category, locale)} · {project.year}</p></>
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
  const filtered = filterProjects(projects, selected)
  const { featured, remaining } = featureFirst(filtered)

  return (
    <main className={`editorial-page ${section === 'collaborations' ? 'collaboration-index' : 'event-index'}`}>
      <header className="editorial-heading">
        <h1 lang="en">{titles[section]}</h1>
        <nav className="editorial-filters" lang={locale === 'cn' ? 'zh-CN' : 'en'} aria-label={locale === 'cn' ? '内容分类' : 'Content categories'}>
          {[undefined, ...categories].map((value) => (
            <Link key={value ?? 'all'} href={`${localePath(locale, `/${section}`)}${value ? `?category=${value}` : ''}`} aria-current={value === selected ? 'page' : undefined}>
              {localizeEditorialCategory(value ?? 'ALL', locale)}
            </Link>
          ))}
        </nav>
        {projects.some((project) => project.isSample) && <p className="editorial-sample">{locale === 'cn' ? '示例内容 · 活动、合作方及日期仅供排版预览' : 'SAMPLE CONTENT · Events, partners and dates are for layout preview only'}</p>}
      </header>
      {section === 'collaborations' ? (
        <CollaborationIndex key={selected ?? 'all'} projects={featured ? [featured, ...remaining] : []} locale={locale} />
      ) : <EventPosterIndex key={selected ?? 'all'} projects={(featured ? [featured, ...remaining] : []).filter((project): project is PopUpEvent => project.kind === 'event')} locale={locale} />}
    </main>
  )
}

function TextSection({ title, paragraphs, locale }: { title: string; paragraphs: readonly LocalizedText[]; locale: Locale }) {
  if (!paragraphs.length) return null
  return <section className="editorial-prose"><h2>{title}</h2>{paragraphs.map((text, index) => <p key={index}>{localize(text, locale)}</p>)}</section>
}

export function EditorialDetail({ project, locale }: { project: EditorialProject; locale: Locale }) {
  return project.kind === 'collaboration'
    ? <CollaborationDetail project={project} locale={locale} />
    : <EventDetail project={project} locale={locale} />
}

function CollaborationDetail({ project, locale }: { project: Collaboration; locale: Locale }) {
  const backHref = localePath(locale, '/collaborations')
  const projectTitle = localize(project.title, locale)
  const [coverWidth, coverHeight] = project.coverImage.ratio.split('/').map(Number)
  const portraitCover = coverWidth < coverHeight
  const openingBlock = project.blocks?.[0]?.type === 'text' ? project.blocks[0] : null
  const remainingBlocks = openingBlock ? project.blocks?.slice(1) : project.blocks

  return (
    <main className="collaboration-story">
      <Link className="editorial-link collaboration-story__back" href={backHref}>{locale === 'cn' ? '返回合作列表' : 'BACK TO COLLABORATIONS'}</Link>
      <header className="collaboration-story__heading">
        <div className="collaboration-story__title">
          <h1 lang="en">{projectTitle}</h1>
          <p lang="en">YUAN SHOWROOM × {project.partner}</p>
          <p>{localizeEditorialCategory(project.category, locale)} · {project.year}</p>
        </div>
        {project.isSample && <p className="editorial-sample">{locale === 'cn' ? '示例项目 · 非正式发布' : 'SAMPLE PROJECT · Not an announcement'}</p>}
      </header>

      {project.story?.length ? <StoryBlocks blocks={project.story} locale={locale} surface="collaboration" /> : <>

      <section className={`collaboration-story__opening${portraitCover ? ' collaboration-story__opening--portrait' : ''}`} aria-label={locale === 'cn' ? '项目介绍' : 'Project introduction'}>
        <div className="collaboration-story__hero">
          <MediaFrame {...project.coverImage} ratio={portraitCover ? project.coverImage.ratio : '16 / 9'} alt={localize(project.coverImage.alt, locale)} priority sizes={portraitCover ? '(max-width: 640px) 92vw, (max-width: 1300px) 42vw, 520px' : '(max-width: 1300px) 56vw, 760px'} />
        </div>
        <div className="collaboration-story__introduction">
          <p className="collaboration-story__subtitle">{localize(project.subtitle, locale)}</p>
          <div className="editorial-prose">{project.concept.map((text, index) => <p key={index}>{localize(text, locale)}</p>)}</div>
          {openingBlock && <div className="collaboration-story__opening-chapter editorial-prose">
            {openingBlock.heading && <h2>{localize(openingBlock.heading, locale)}</h2>}
            {openingBlock.paragraphs.map((text, index) => <p key={index}>{localize(text, locale)}</p>)}
          </div>}
        </div>
      </section>

      {remainingBlocks ? <CollaborationBlocks blocks={remainingBlocks} locale={locale} /> : <section className="collaboration-story__process" aria-label={locale === 'cn' ? '创作过程' : 'Behind the scenes'}>
        {project.gallery.length > 0 && <div className="collaboration-story__pair">
          {project.gallery.map((image, index) => <MediaFrame {...image} alt={localize(image.alt, locale)} key={`${image.src}-${index}`} sizes="(max-width: 640px) 92vw, 60vw" />)}
        </div>}
        <div className="collaboration-story__notes">
        <TextSection title={locale === 'cn' ? '创作过程' : 'BEHIND THE SCENES'} paragraphs={project.process} locale={locale} />
        <TextSection title={locale === 'cn' ? '最终成果' : 'OUTCOMES'} paragraphs={project.outcomes} locale={locale} />
        </div>
      </section>}
      </>}

      <footer className="collaboration-story__closing">
        {!project.story?.some((block) => block.type === 'credits') && <TextSection title="CREDITS" paragraphs={project.credits} locale={locale} />}
        <CollaborationContact locale={locale} contact={collaborationContact} />
        <Link className="editorial-link" href={backHref}>{locale === 'cn' ? '返回全部合作项目' : 'BACK TO ALL COLLABORATIONS'}</Link>
      </footer>
    </main>
  )
}

function EventDetail({ project, locale }: { project: EditorialProject; locale: Locale }) {
  const story = eventStories[project.slug]
  const section = sectionPath(project)
  const backHref = localePath(locale, `/${section}`)
  if (story && project.kind === 'event') return <EventExperience project={project} story={story} locale={locale} backHref={backHref} />
  return (
    <main className={`editorial-detail editorial-detail--${project.kind}`}>
      <div className="editorial-detail__visual">
        <MediaFrame {...project.coverImage} alt={localize(project.coverImage.alt, locale)} priority sizes="(max-width: 900px) 92vw, 64vw" />
      </div>
      <header className="editorial-detail__identity">
        <Link className="editorial-link" href={backHref}>{titles[section]}</Link>
        <h1><ProjectName project={project} locale={locale} /></h1>
        <ProjectMeta project={project} locale={locale} />
        {project.kind === 'event' && localize(project.venue, locale) && <p>{localize(project.venue, locale)}</p>}
        {project.isSample && <p className="editorial-sample">{locale === 'cn' ? '示例项目 · 非正式发布' : 'SAMPLE PROJECT · Not an announcement'}</p>}
        {project.contentPending && <p className="editorial-sample">{locale === 'cn' ? '活动图文整理中。' : 'The event story is being prepared.'}</p>}
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
