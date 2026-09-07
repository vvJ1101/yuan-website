import { MediaFrame } from './media-frame'
import { localize } from '@/lib/showroom-i18n'
import type { BrandDetailImage, Locale } from '@/types/showroom'

export function BrandDetailStrip({ images, locale, brandName }: { images: readonly BrandDetailImage[]; locale: Locale; brandName: string }) {
  if (images.length < 3) return null
  return <section className="brand-detail-strip" aria-label={`${brandName} ${locale === 'cn' ? '材质与细节' : 'materials and details'}`}>
    <header><span>03 / MATERIAL STUDY</span><h2>{locale === 'cn' ? '材质与细节' : 'MATERIAL / DETAIL'}</h2></header>
    <div className="brand-detail-strip__track">
      {images.map((image, index) => <figure key={`${image.src}-${index}`}>
        <MediaFrame {...image} alt={localize(image.alt, locale)} sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 31vw" />
        {image.label && <figcaption>{localize(image.label, locale)}</figcaption>}
      </figure>)}
    </div>
  </section>
}
