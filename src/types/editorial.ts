import type { LocalizedText } from './showroom'

export interface EditorialImage {
  src: string
  alt: LocalizedText
  ratio: string
}

export type CollaborationBlock = { id: string } & (
  | { type: 'text'; heading?: LocalizedText; paragraphs: readonly LocalizedText[] }
  | { type: 'image'; image: EditorialImage; caption?: LocalizedText }
  | { type: 'pair'; images: readonly [EditorialImage, EditorialImage]; caption?: LocalizedText }
  | { type: 'image-text'; image: EditorialImage; heading?: LocalizedText; paragraphs: readonly LocalizedText[] }
  | { type: 'gallery'; images: readonly EditorialImage[]; caption?: LocalizedText }
)

interface EditorialEntry {
  title: LocalizedText
  slug: string
  coverImage: EditorialImage
  gallery: readonly EditorialImage[]
  credits: readonly LocalizedText[]
  featured?: boolean
  isSample?: boolean
  contentPending?: boolean
}

export interface PopUpEvent extends EditorialEntry {
  kind: 'event'
  city: LocalizedText
  venue: LocalizedText
  startDate: string | null
  endDate: string | null
  status: 'CURRENT' | 'UPCOMING' | 'ARCHIVE' | null
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
  blocks?: readonly CollaborationBlock[]
}

export type EditorialProject = PopUpEvent | Collaboration
export type EditorialSection = 'pop-up-events' | 'collaborations'
