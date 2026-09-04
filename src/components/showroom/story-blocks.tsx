import { MediaFrame } from './media-frame'
import { localize } from '@/lib/showroom-i18n'
import type { StoryBlock, StoryImage } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

type StorySurface = 'collaboration' | 'event'

function StoryMedia({ image, locale, sizes, priority = false }: { image: StoryImage; locale: Locale; sizes: string; priority?: boolean }) {
  return <MediaFrame {...image} alt={localize(image.alt, locale)} sizes={sizes} priority={priority} />
}

function StoryCaption({ block, locale }: { block: Extract<StoryBlock, { type: 'offsetPair' | 'detailStrip' | 'montage' }>; locale: Locale }) {
  return block.caption ? <figcaption>{localize(block.caption, locale)}</figcaption> : null
}

export function StoryBlocks({ blocks, locale, surface }: { blocks: readonly StoryBlock[]; locale: Locale; surface: StorySurface }) {
  return <div className={`story-blocks story-blocks--${surface}`}>
    {blocks.map((block, blockIndex) => {
      if (block.type === 'hero') return <figure className="story-block story-block--hero" key={block.id}>
        <StoryMedia image={block.image} locale={locale} sizes="(max-width: 900px) 100vw, 1200px" priority={blockIndex === 0} />
      </figure>
      if (block.type === 'text') return <section className="story-block story-block--text editorial-prose" key={block.id}>
        {block.heading && <h2>{localize(block.heading, locale)}</h2>}
        {block.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
      </section>
      if (block.type === 'imageText') return <section className="story-block story-block--imageText" key={block.id}>
        <StoryMedia image={block.image} locale={locale} sizes="(max-width: 900px) 100vw, 720px" />
        <div className="editorial-prose">
          {block.heading && <h2>{localize(block.heading, locale)}</h2>}
          {block.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
        </div>
      </section>
      if (block.type === 'offsetPair') return <figure className="story-block story-block--offsetPair" key={block.id}>
        <div className="story-block__media-grid">{block.images.map((image, index) => <StoryMedia image={image} locale={locale} sizes="(max-width: 900px) 86vw, 520px" key={`${image.src}-${index}`} />)}</div>
        <StoryCaption block={block} locale={locale} />
      </figure>
      if (block.type === 'detailStrip') return <figure className="story-block story-block--detailStrip" key={block.id}>
        <div className="story-block__media-grid">{block.images.map((image, index) => <StoryMedia image={image} locale={locale} sizes="(max-width: 900px) 70vw, 420px" key={`${image.src}-${index}`} />)}</div>
        <StoryCaption block={block} locale={locale} />
      </figure>
      if (block.type === 'montage') return <figure className="story-block story-block--montage" key={block.id}>
        <div className="story-block__media-grid">{block.images.map((image, index) => <StoryMedia image={image} locale={locale} sizes="(max-width: 900px) 86vw, 560px" key={`${image.src}-${index}`} />)}</div>
        <StoryCaption block={block} locale={locale} />
      </figure>
      if (block.type === 'video') return <figure className="story-block story-block--video" key={block.id}>
        <video controls muted playsInline preload="metadata" poster={block.video.poster.src}><source src={block.video.src} /></video>
        {block.video.caption && <figcaption>{localize(block.video.caption, locale)}</figcaption>}
      </figure>
      if (block.type === 'statement') return <blockquote className="story-block story-block--statement" key={block.id}>{localize(block.text, locale)}</blockquote>
      return <section className="story-block story-block--credits" key={block.id} aria-label="Credits">
        <h2>CREDITS</h2>{block.items.map((item, index) => <p key={index}>{localize(item, locale)}</p>)}
      </section>
    })}
  </div>
}
