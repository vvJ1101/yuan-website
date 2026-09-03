import type { Collaboration, EditorialImage, PopUpEvent } from '../types/editorial'

export const eventCategories = ['CURRENT', 'UPCOMING', 'ARCHIVE'] as const
export const collaborationCategories = ['FASHION', 'ART', 'DESIGN', 'CULTURE'] as const

const space: EditorialImage = {
  src: '/images/showroom/about/showroom.webp',
  alt: { cn: 'YUAN SHOWROOM 接待与陈列空间，作为示例配图', en: 'YUAN SHOWROOM reception and display space, used as a sample image' },
  ratio: '4 / 3',
}
const display: EditorialImage = {
  src: '/images/showroom/about/showroom-v2.webp',
  alt: { cn: '中性色服装陈列，作为示例配图', en: 'Neutral clothing display, used as a sample image' },
  ratio: '4 / 3',
}
const cafe: EditorialImage = {
  src: '/images/showroom/on-site/aano-caffe-01.webp',
  alt: { cn: '现有官网咖啡空间照片，作为示例配图', en: 'Existing website photograph of a cafe space, used as a sample image' },
  ratio: '4 / 3',
}
const sampleCredits = [{ cn: '图片来自现有官网素材；正式项目署名待补充。', en: 'Images from the existing website; final project credits to be supplied.' }]

// User-supplied titles and images. Unknown schedules must not inherit sample dates.
// Existing preview slugs are retained until the complete articles are ready.
export const popUpEvents: readonly PopUpEvent[] = [
  {
    kind: 'event', slug: 'sample-showroom-edit', title: { cn: 'HELEN KAMINSKI I 中国首次匠心之旅', en: 'HELEN KAMINSKI I 中国首次匠心之旅' },
    city: { cn: '', en: '' }, venue: { cn: '', en: '' },
    startDate: null, endDate: null, status: null, featured: true, contentPending: true,
    coverImage: { src: '/images/editorial/events/helen-kaminski-cover.webp', ratio: '1080 / 1660', alt: { cn: '树影下的 HELEN KAMINSKI 白色建筑立面', en: 'HELEN KAMINSKI facade framed by trees' } },
    gallery: [{ src: '/images/editorial/events/helen-kaminski-venue.webp', ratio: '1080 / 1600', alt: { cn: '花园中的 HELEN KAMINSKI 活动空间', en: 'HELEN KAMINSKI event space surrounded by a garden' } }],
    description: [], participatingBrands: ['HELEN KAMINSKI'], credits: [],
  },
  {
    kind: 'event', slug: 'sample-next-season', title: { cn: 'DATT | PRINCESS DIARY', en: 'DATT | PRINCESS DIARY' },
    city: { cn: '', en: '' }, venue: { cn: '', en: '' },
    startDate: null, endDate: null, status: null, contentPending: true,
    coverImage: { src: '/images/editorial/events/datt-princess-diary.webp', ratio: '3 / 4', alt: { cn: 'DATT PRINCESS DIARY：身着白色褶饰套装的模特', en: 'DATT PRINCESS DIARY: model wearing a white ruffled ensemble' } },
    gallery: [], description: [], participatingBrands: ['DATT'], credits: [],
  },
  {
    kind: 'event', slug: 'sample-open-house', title: { cn: 'NHOJ | KNOT', en: 'NHOJ | KNOT' },
    city: { cn: '', en: '' }, venue: { cn: '', en: '' },
    startDate: null, endDate: null, status: null, contentPending: true,
    coverImage: { src: '/images/editorial/events/nhoj-knot.webp', ratio: '1080 / 1588', alt: { cn: 'NHOJ KNOT：身着红色上衣、站在红色座椅上的模特', en: 'NHOJ KNOT: model in a red top standing on red seats' } },
    gallery: [], description: [], participatingBrands: ['NHOJ'], credits: [],
  },
]

export const collaborations: readonly Collaboration[] = collaborationCategories.map((category, index) => ({
  kind: 'collaboration', slug: `sample-${category.toLowerCase()}`, partner: 'PARTNER',
  title: { cn: `${category} 合作项目示例`, en: `${category} collaboration sample` },
  category, year: 2026, featured: index === 0, isSample: true,
  subtitle: { cn: '创意相遇的另一种可能 · 排版示例', en: 'Another way for ideas to meet · Layout sample' },
  coverImage: [display, space, cafe, space][index], gallery: [space, display],
  concept: [{ cn: '此处将介绍合作缘起、双方的创意方向与共同目标。PARTNER 为占位名称，不代表实际合作关系。', en: 'This space will introduce the partnership, creative direction and shared purpose. PARTNER is a placeholder and does not represent a real partnership.' }],
  process: [{ cn: '此处预留创作过程、实验和幕后记录，后续可以加入对应图片。', en: 'A space for the creative process, experiments and behind-the-scenes documentation, with supporting imagery.' }],
  outcomes: [{ cn: '此处展示正式项目的最终作品与成果，待真实内容确认后替换。', en: 'Final work and project outcomes will appear here once the real content is confirmed.' }],
  credits: sampleCredits,
}))

// Supply the confirmed public contact destination before publishing this section.
export const collaborationContact: { qrImage: string } | null = null
