import type { LocalizedText } from './showroom'

export interface EditorialImage {
  src: string
  alt: LocalizedText
  ratio: string
}

interface EditorialEntry {
  title: LocalizedText
  slug: string
  coverImage: EditorialImage
  gallery: readonly EditorialImage[]
  credits: readonly LocalizedText[]
  featured?: boolean
  isSample?: boolean
}

export interface PopUpEvent extends EditorialEntry {
  kind: 'event'
  city: LocalizedText
  venue: LocalizedText
  startDate: string
  endDate: string
  status: 'CURRENT' | 'UPCOMING' | 'ARCHIVE'
  description: readonly LocalizedText[]
  participatingBrands: readonly string[]
}

export interface Collaboration extends EditorialEntry {
  kind: 'collaboration'
  partner: string
  category: 'FASHION' | 'ART' | 'DESIGN' | 'CULTURE'
  year: number
  subtitle: LocalizedText
  concept: readonly LocalizedText[]
  process: readonly LocalizedText[]
  outcomes: readonly LocalizedText[]
}

export type EditorialProject = PopUpEvent | Collaboration
export type EditorialSection = 'pop-up-events' | 'collaborations'
