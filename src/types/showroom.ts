export type Locale = 'cn' | 'en'
export type BrandCategory = 'RTW' | 'FTW' | 'ACC'
export type LocalizedText = Record<Locale, string>

export interface AboutStatistic {
  value: '50+' | '3000+' | '4'
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
  roomImages: readonly [string, string, string]
}

export interface Lookbook {
  brandSlug: string
  season: string
  description: LocalizedText
  designer: string
  category: LocalizedText
  origin: LocalizedText
  established: string
  website: string
  images: readonly string[]
}

export interface CurrentEvent {
  city: LocalizedText
  title: LocalizedText
  season: string
  dates: LocalizedText
  heroImage: string
  exhibitionBrandSlugs: readonly string[]
  lookbooks: readonly Lookbook[]
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

export interface Recap {
  slug: string
  season: string
  title: LocalizedText
  poster: string
  order: number
}
