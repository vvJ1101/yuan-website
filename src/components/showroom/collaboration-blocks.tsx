import { MediaFrame } from './media-frame'
import { localize } from '@/lib/showroom-i18n'
import type { CollaborationBlock, EditorialImage } from '@/types/editorial'
import type { Locale } from '@/types/showroom'

export function CollaborationBlocks({ blocks, locale }: { blocks: readonly CollaborationBlock[]; locale: Locale }) {
  const media = (image: EditorialImage, sizes: string) => <MediaFrame {...image} alt={localize(image.alt, locale)} sizes={sizes} />

  return <div className="collaboration-blocks">
    {blocks.map(block => {
      const copy = 'paragraphs' in block && <div className="editorial-prose">
        {block.heading && <h2>{localize(block.heading, locale)}</h2>}
        {block.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}
      </div>
      if (block.type === 'text') return <section id={`story-${block.id}`} className="collaboration-block collaboration-block--text" key={block.id}>{copy}</section>
      if (block.type === 'image-text') return <section id={`story-${block.id}`} className="collaboration-block collaboration-block--image-text" key={block.id}>
        {media(block.image, '(max-width: 640px) 92vw, (max-width: 1300px) 56vw, 720px')}{copy}
      </section>
      const images = block.type === 'image' ? [block.image] : block.images
      if (!images.length) return null
      const [width, height] = images[0].ratio.split('/').map(Number)
      const portrait = block.type === 'image' && width < height
      return <figure id={`story-${block.id}`} className={`collaboration-block collaboration-block--${block.type}${portrait ? ' collaboration-block--portrait' : ''}`} key={block.id}>
        <div className="collaboration-block__images">{images.map((image, index) => <div key={`${image.src}-${index}`}>
          {media(image, block.type === 'image' ? (portrait ? '(max-width: 640px) 92vw, 720px' : '(max-width: 1300px) 92vw, 1200px') : '(max-width: 640px) 92vw, (max-width: 1300px) 42vw, 560px')}
        </div>)}</div>
        {block.caption && <figcaption>{localize(block.caption, locale)}</figcaption>}
      </figure>
    })}
  </div>
}
