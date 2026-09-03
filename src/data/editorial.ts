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

// Layout samples only: these records do not announce real events or partnerships.
// Keep dates/status editorially managed, matching the existing local content system.
export const popUpEvents: readonly PopUpEvent[] = [
  {
    kind: 'event', slug: 'sample-showroom-edit', title: { cn: '展厅精选 · 示例活动', en: 'The Showroom Edit · Sample event' },
    city: { cn: '深圳（示例）', en: 'Shenzhen (sample)' }, venue: { cn: '场地待确认', en: 'Venue to be confirmed' },
    startDate: '2026-09-01', endDate: '2026-09-30', status: 'CURRENT', featured: true, isSample: true,
    coverImage: space, gallery: [display, cafe],
    description: [{ cn: '此处将介绍活动主题、展出内容与到访体验。当前文字、日期及配图仅供排版预览，不代表已公布的活动。', en: 'This space will introduce the event theme, presentation and visitor experience. Text, dates and images are layout samples, not an event announcement.' }],
    participatingBrands: ['品牌名单待确认 / Line-up to be confirmed'], credits: sampleCredits,
  },
  {
    kind: 'event', slug: 'sample-next-season', title: { cn: '下一季 · 示例活动', en: 'Next Season · Sample event' },
    city: { cn: '上海（示例）', en: 'Shanghai (sample)' }, venue: { cn: '场地待确认', en: 'Venue to be confirmed' },
    startDate: '2026-10-10', endDate: '2026-10-15', status: 'UPCOMING', isSample: true,
    coverImage: display, gallery: [space],
    description: [{ cn: '此处预留下一场活动的介绍。真实时间、场地和参与品牌将在确认后替换。', en: 'A preview space for the next event. Confirmed dates, venue and participating brands will replace this sample.' }],
    participatingBrands: [], credits: sampleCredits,
  },
  {
    kind: 'event', slug: 'sample-open-house', title: { cn: '开放展厅 · 示例档案', en: 'Open House · Sample archive' },
    city: { cn: '深圳（示例）', en: 'Shenzhen (sample)' }, venue: { cn: '示例空间', en: 'Sample space' },
    startDate: '2026-05-15', endDate: '2026-05-18', status: 'ARCHIVE', isSample: true,
    coverImage: cafe, gallery: [space, display],
    description: [{ cn: '往期活动档案示例。正式内容可记录活动背景、现场片段以及参与者。', en: 'A sample event archive. Final content can document the background, moments from the event and participants.' }],
    participatingBrands: [], credits: sampleCredits,
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
