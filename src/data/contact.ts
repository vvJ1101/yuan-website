import type { LocalizedText } from '@/types/showroom'

export type ContactMethodId = 'brand-partnerships' | 'buying-samples' | 'press-projects'

export interface ContactMethod {
  id: ContactMethodId
  title: string
  description: LocalizedText
  email: string
}

export interface ContactLocation {
  name: 'SHENZHEN' | 'HONG KONG'
}

export const contactMethods: readonly ContactMethod[] = [
  {
    id: 'brand-partnerships',
    title: 'BRAND PARTNERSHIPS',
    description: { cn: '品牌合作', en: 'Representation & market development' },
    email: 'heshiya@yuanshowroom.vip',
  },
  {
    id: 'buying-samples',
    title: 'BUYING & SAMPLES',
    description: { cn: '买手订货 / 样衣', en: 'Buying appointments & samples' },
    email: 'elson@yuanshowroom.vip',
  },
  {
    id: 'press-projects',
    title: 'PRESS & PROJECTS',
    description: { cn: '媒体、活动与跨界合作', en: 'Press, events & collaborations' },
    email: 'heshiya@yuanshowroom.vip',
  },
] as const

export const contactLocations: readonly ContactLocation[] = [
  { name: 'SHENZHEN' },
  { name: 'HONG KONG' },
] as const
