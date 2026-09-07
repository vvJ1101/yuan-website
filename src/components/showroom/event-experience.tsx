'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import styles from './event-experience.module.css'
import type { EventStory, StoryImage } from '@/data/event-stories'
import { nextEventVisualIndex } from '@/lib/event-visual-index'
import { localize } from '@/lib/showroom-i18n'
import type { PopUpEvent } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

function VisualImage({ image, sizes, priority = false }: { image: StoryImage; sizes: string; priority?: boolean }) {
  return <Image src={image.src} alt="" fill sizes={sizes} priority={priority} unoptimized className={styles.image} />
}

function ChapterImage({ image, locale, className = '' }: { image: StoryImage; locale: Locale; className?: string }) {
  const cropStyle = image.crop ? {
    left: `${-(image.crop.left / image.crop.width) * 100}%`,
    top: `${-(image.crop.top / image.crop.height) * 100}%`,
    width: `${100 / image.crop.width}%`,
    height: `${100 / image.crop.height}%`,
    right: 'auto',
    bottom: 'auto',
    maxWidth: 'none',
    objectFit: 'fill' as const,
  } : undefined

  return <figure
    className={`${styles.chapterImage} ${className}`}
    data-cropped={image.crop ? 'true' : undefined}
    style={image.crop ? { aspectRatio: `${image.crop.width} / ${image.crop.height}` } : undefined}
  >
    <Image src={image.src} alt={localize(image.alt, locale)} fill unoptimized sizes="(max-width: 900px) 92vw, 56vw" className={styles.image} style={cropStyle} />
  </figure>
}

export function EventExperience({ project, story, locale, backHref }: {
  project: PopUpEvent
  story: EventStory
  locale: Locale
  backHref: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = story.visuals[activeIndex]
  const [brand, ...themeParts] = localize(project.title, locale).split(/\s[|I]\s/)
  const theme = themeParts.join(' | ')
  const move = (direction: number) => setActiveIndex((current) => nextEventVisualIndex(current, direction, story.visuals.length))

  return <main className={styles.experience}>
    <section
      className={styles.stage}
      aria-label={locale === 'cn' ? '活动视觉索引' : 'Event visual index'}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
    >
      <div className={styles.backdrop} key={`backdrop-${active.src}`}><VisualImage image={active} sizes="100vw" priority /></div>
      <div className={styles.wash} />
      <Link className={styles.back} href={backHref}>{locale === 'cn' ? '返回活动' : 'BACK TO EVENTS'}</Link>

      <header className={styles.identity}>
        <h1 lang="en">{brand}</h1>
        {theme && <p className={styles.theme}>{theme}</p>}
        <p className={styles.meta}>POP-UP / 2026 / CHINA</p>
        <a className={styles.explore} href="#event-story-chapters">{locale === 'cn' ? '浏览活动故事' : 'EXPLORE STORY'} <span aria-hidden="true">↘</span></a>
      </header>

      <div className={styles.mainVisual} key={active.src} aria-live="polite">
        <Image src={active.src} alt={localize(active.alt, locale)} fill priority unoptimized sizes="(max-width: 900px) 78vw, 44vw" className={styles.image} />
      </div>

      <div className={styles.visualIndex}>
        {story.visuals.map((image, index) => <button
          className={styles.visualButton}
          data-slot={index}
          type="button"
          aria-label={`${locale === 'cn' ? '显示图片' : 'Show image'} ${index + 1}`}
          aria-pressed={index === activeIndex}
          onClick={() => setActiveIndex(index)}
          key={image.src}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <VisualImage image={image} sizes="(max-width: 900px) 22vw, 14vw" />
        </button>)}
      </div>

      <div className={styles.controls}>
        <span><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(story.visuals.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(-1)} aria-label={locale === 'cn' ? '上一张' : 'Previous image'}>←</button>
        <button type="button" onClick={() => move(1)} aria-label={locale === 'cn' ? '下一张' : 'Next image'}>→</button>
      </div>
    </section>

    <article className={styles.story} id="event-story-chapters">
      <header className={styles.intro}>
        <p>{localize(story.intro, locale)}</p>
      </header>

      {story.chapters.map((chapter, chapterIndex) => {
        if (chapterIndex === 0) return <section className={`${styles.chapter} ${styles.nanjing}`} key={chapter.id}>
          <div className={styles.chapterCopy}>
            <h2>{localize(chapter.title, locale)}</h2>
            {chapter.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
          </div>
          <ChapterImage image={chapter.image} locale={locale} className={styles.nanjingMain} />
          {chapter.gallery && <div className={styles.nanjingDetails}>{chapter.gallery.map((image, index) => <ChapterImage image={image} locale={locale} key={`${chapter.id}-${index}`} />)}</div>}
        </section>

        if (chapterIndex === 1) return <section className={`${styles.chapter} ${styles.chengdu}`} key={chapter.id}>
          <ChapterImage image={chapter.image} locale={locale} className={styles.chengduMain} />
          <div className={styles.chapterCopy}>
            <h2>{localize(chapter.title, locale)}</h2>
            {chapter.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
          </div>
          {chapter.gallery && <div className={styles.chengduDetails}>{chapter.gallery.map((image, index) => <ChapterImage image={image} locale={locale} key={`${chapter.id}-${index}`} />)}</div>}
        </section>

        return <section className={`${styles.chapter} ${styles.craft}`} key={chapter.id}>
          <div className={styles.craftStrip} aria-hidden="true">{story.visuals.slice(2).map((image) => <div key={image.src}><VisualImage image={image} sizes="24vw" /></div>)}</div>
          <ChapterImage image={chapter.image} locale={locale} className={styles.craftMain} />
          <div className={styles.chapterCopy}>
            <h2>{localize(chapter.title, locale)}</h2>
            {chapter.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
          </div>
        </section>
      })}

      <footer className={styles.closing}>
        <p>{localize(story.closing, locale)}</p>
        <Link href={backHref}>{locale === 'cn' ? '返回全部活动' : 'BACK TO ALL EVENTS'}</Link>
      </footer>
    </article>
  </main>
}
