import Link from 'next/link'
import type { CSSProperties } from 'react'

import { MediaFrame } from './media-frame'
import { CollaborationContact } from './collaboration-contact'
import { CollaborationBlocks } from './collaboration-blocks'
import { CollaborationIndex } from './collaboration-index'
import { collaborationContact } from '@/data/editorial'
import { eventStories, type EventStory, type StoryImage } from '@/data/event-stories'
import { featureFirst, filterProjects, projectCategory, sectionPath } from '@/lib/editorial'
import { localize, localizeEditorialCategory } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Collaboration, EditorialProject, EditorialSection } from '@/types/editorial'
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

function ProjectCard({ project, locale, featured = false }: { project: EditorialProject; locale: Locale; featured?: boolean }) {
  return (
    <article className={`${featured ? 'editorial-feature' : 'editorial-card'} ${project.kind === 'event' ? 'event-entry' : 'collaboration-entry'}`}>
      <Link className="recap-card__link" href={localePath(locale, `/${sectionPath(project)}/${project.slug}`)}>
        <MediaFrame {...project.coverImage} ratio={project.kind === 'collaboration' && featured ? '16 / 9' : project.coverImage.ratio} alt={localize(project.coverImage.alt, locale)} priority={featured} sizes={project.kind === 'collaboration' ? (featured ? '92vw' : '(max-width: 640px) 92vw, 44vw') : featured ? '(max-width: 640px) 80vw, (max-width: 900px) 340px, 360px' : '(max-width: 640px) 30vw, 180px'} />
        <div className="editorial-card__copy">
          {project.kind === 'event' && project.status && <p className="event-entry__status">{localizeEditorialCategory(project.status, locale)}</p>}
          <h2 lang={project.kind === 'collaboration' ? 'en' : undefined}><ProjectName project={project} locale={locale} /></h2>
          <ProjectMeta project={project} locale={locale} />
          {featured && project.kind === 'event' && localize(project.venue, locale) && <p>{localize(project.venue, locale)}</p>}
          <span className="editorial-link">{locale === 'cn' ? '查看详情' : project.kind === 'event' ? 'VIEW EVENT' : 'VIEW PROJECT'}</span>
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
      ) : featured ? <ProjectCard project={featured} locale={locale} featured /> : <p role="status">{locale === 'cn' ? '该分类暂无项目。' : 'No projects in this category yet.'}</p>}
      {section === 'pop-up-events' && others.length > 0 && <section className="editorial-list" aria-label={locale === 'cn' ? '更多活动' : 'More events'}>
        <h2>{locale === 'cn' ? '更多活动' : 'MORE EVENTS'}</h2>
        <div className="editorial-grid">{others.map((project) => <ProjectCard project={project} locale={locale} key={project.slug} />)}</div>
      </section>}
      {archive.length > 0 && <section className="editorial-list" aria-labelledby="archive-title">
        <h2 id="archive-title">{localizeEditorialCategory('ARCHIVE', locale)}</h2>
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
  return project.kind === 'collaboration'
    ? <CollaborationDetail project={project} locale={locale} />
    : <EventDetail project={project} locale={locale} />
}

function CollaborationDetail({ project, locale }: { project: Collaboration; locale: Locale }) {
  const backHref = localePath(locale, '/collaborations')
  const [coverWidth, coverHeight] = project.coverImage.ratio.split('/').map(Number)
  const portraitCover = coverWidth < coverHeight
  const openingBlock = project.blocks?.[0]?.type === 'text' ? project.blocks[0] : null
  const remainingBlocks = openingBlock ? project.blocks?.slice(1) : project.blocks

  return (
    <main className="collaboration-story">
      <Link className="editorial-link collaboration-story__back" href={backHref}>{locale === 'cn' ? '返回合作列表' : 'BACK TO COLLABORATIONS'}</Link>
      <header className="collaboration-story__heading">
        <div className="collaboration-story__title">
          <h1 lang="en">YUAN × {project.partner}</h1>
          <p>{localizeEditorialCategory(project.category, locale)} · {project.year}</p>
        </div>
        {project.isSample && <p className="editorial-sample">{locale === 'cn' ? '示例项目 · 非正式发布' : 'SAMPLE PROJECT · Not an announcement'}</p>}
      </header>

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

      <footer className="collaboration-story__closing">
        <TextSection title="CREDITS" paragraphs={project.credits} locale={locale} />
        <CollaborationContact locale={locale} contact={collaborationContact} />
        <Link className="editorial-link" href={backHref}>{locale === 'cn' ? '返回全部合作项目' : 'BACK TO ALL COLLABORATIONS'}</Link>
      </footer>
    </main>
  )
}

function EventDetail({ project, locale }: { project: EditorialProject; locale: Locale }) {
  const story = eventStories[project.slug]
  if (story) return <EventArticle project={project} story={story} locale={locale} />
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

function ArticleImage({ image, locale, priority = false }: { image: StoryImage; locale: Locale; priority?: boolean }) {
  const crop = image.crop
  const [width, height] = image.ratio.split('/').map(Number)
  const style = crop ? {
    aspectRatio: `${width * crop.width} / ${height * crop.height}`,
    '--crop-width': `${100 / crop.width}%`,
    '--crop-left': `${-100 * crop.left / crop.width}%`,
    '--crop-top': `${-100 * crop.top / crop.height}%`,
  } as CSSProperties : undefined
  return <div className={crop ? 'event-story__image event-story__image--preview' : 'event-story__image'} style={style}>
    <MediaFrame {...image} alt={localize(image.alt, locale)} priority={priority} sizes="(max-width: 640px) 100vw, 1200px" />
  </div>
}

function EventArticle({ project, story, locale }: { project: EditorialProject; story: EventStory; locale: Locale }) {
  return (
    <main className="event-story">
      <article>
        <header className="event-story__heading">
          <Link className="editorial-link" href={localePath(locale, '/pop-up-events')}>{locale === 'cn' ? '返回活动列表' : 'BACK TO EVENTS'}</Link>
          <h1><ProjectName project={project} locale={locale} /></h1>
          <p className="event-story__notice">{locale === 'cn' ? '设计预览 · 临时配图与文案，非正式活动公告' : 'DESIGN PREVIEW · Temporary images and copy, not an event announcement'}</p>
        </header>
        <ArticleImage image={story.hero} locale={locale} priority />
        <p className="event-story__intro">{localize(story.intro, locale)}</p>
        {story.chapters.map((chapter) => (
          <section className={`event-story__chapter event-story__chapter--${chapter.layout}`} key={chapter.id} aria-labelledby={`story-${chapter.id}`}>
            <div className="event-story__chapter-main">
              <header className="event-story__copy">
                <h2 id={`story-${chapter.id}`}>{localize(chapter.title, locale)}</h2>
                {chapter.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
              </header>
              <ArticleImage image={chapter.image} locale={locale} />
            </div>
            {chapter.gallery && <div className={`event-story__gallery event-story__gallery--${chapter.gallery.length}`}>
              {chapter.gallery.map((image, index) => <ArticleImage image={image} locale={locale} key={`${chapter.id}-${index}`} />)}
            </div>}
          </section>
        ))}
        <footer className="event-story__closing">
          <p>{localize(story.closing, locale)}</p>
          <Link className="editorial-link" href={localePath(locale, '/pop-up-events')}>{locale === 'cn' ? '返回全部活动' : 'BACK TO ALL EVENTS'}</Link>
        </footer>
      </article>
    </main>
  )
}
