export type Locale = 'cn' | 'en'
export type BrandCategory = 'RTW' | 'FTW' | 'ACC'
export type LocalizedText = Record<Locale, string>

export interface AboutStatistic {
  value: '6000+ SQM' | '3000+' | '4'
  label: LocalizedText
  description: LocalizedText
}

export interface AboutContent {
  introduction: readonly LocalizedText[]
  readMoreLabel: LocalizedText
  image: string
  imageAlt: LocalizedText
  statistics: readonly [AboutStatistic, AboutStatistic, AboutStatistic]
}

export interface Brand {
  slug: string
  name: string
  category: BrandCategory
  city: LocalizedText
  introduction: LocalizedText
  cover: string
  roomImages: readonly [string, ...string[]]
}

export interface EventBrand {
  slug: string
  name: string
  poster: string
  items: readonly LookbookItem[]
  products?: readonly LookbookProduct[]
}

export interface LookbookItem {
  image: string
  productIds?: readonly string[]
}

export interface LookbookProduct {
  id: string
  image: string
  name: LocalizedText
  category: 'top' | 'bottom' | 'dress' | 'outerwear' | 'shoes' | 'bag' | 'accessory'
  styleNumber?: string
  material?: LocalizedText
  color?: LocalizedText
  description?: LocalizedText
}

export interface CurrentEvent {
  city: LocalizedText
  title: LocalizedText
  season: string
  heroImage: string
  exhibitionBrands: readonly EventBrand[]
  floorMapImage: string
  appointmentQrImage: string
}

export interface OnSiteService {
  id: string
  name: string
  description: LocalizedText
  location: LocalizedText
  offering: LocalizedText
  hours: LocalizedText
  images: readonly string[]
}

export interface RecapSection {
  image: string
  title?: LocalizedText
  paragraphs?: readonly LocalizedText[]
}

export interface Recap {
  slug: string
  season: string
  title: LocalizedText
  poster: string
  order: number
  posterRatio?: string
  city?: LocalizedText
  date?: LocalizedText
  description?: LocalizedText
  video?: string
  videoPoster?: string
  pages: readonly string[]
  gallery: readonly string[]
  sections?: readonly RecapSection[]
}
