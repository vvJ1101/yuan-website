import type { Collaboration, CollaborationBlock, EditorialImage, PopUpEvent } from '../types/editorial'

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

const sampleLooks: EditorialImage[] = ['ranyepersonal', 'maison-ther', 'tenspher'].map(brand => ({
  src: `/images/showroom/brands/${brand}-campaign-20260903.jpg`, ratio: '3 / 4',
  alt: { cn: `${brand} 官网服装图，仅作排版演示`, en: `${brand} website fashion image, for layout demonstration only` },
}))

const sampleBlocks: readonly CollaborationBlock[] = [
  { id: 'direction', type: 'text', heading: { cn: '从空间到衣着', en: 'From space to silhouette' }, paragraphs: [{ cn: '以空间、衣着和细节为线索，演示一篇合作故事的阅读节奏。以下图片取自现有官网，不代表品牌参与了实际合作。', en: 'An editorial study in space, silhouette and detail. The following images are drawn from the existing website to demonstrate a longer story, not an actual collaboration.' }] },
  { id: 'space', type: 'image-text', image: space, heading: { cn: '空间与陈列', en: 'Space and display' }, paragraphs: [{ cn: '从整体空间开始，再走近作品。此处可替换为项目的构思、材料选择或现场布置过程，让文字与对应画面一起阅读。', en: 'Begin with the setting, then move closer to the work. This section can hold the project’s approach, material choices or installation process alongside its corresponding image.' }] },
  { id: 'silhouettes', type: 'pair', images: [sampleLooks[0], sampleLooks[1]], caption: { cn: '双图排版示例 · 现有官网素材，并非合作成果', en: 'Paired-image study · Existing website imagery, not collaboration outcomes' } },
  { id: 'outcome', type: 'text', heading: { cn: '作品与细节', en: 'The work, in detail' }, paragraphs: [{ cn: '这里预留最终作品的介绍。文字无需逐张解释图片，可以用一段简短叙述串联设计选择、成品及现场细节。', en: 'A place for the finished work. A short passage can connect the design decisions, final pieces and details without describing every photograph.' }] },
  { id: 'final-image', type: 'image', image: sampleLooks[2], caption: { cn: '单图示例 · 竖图保持原比例与适当宽度', en: 'Single-image study · Portrait imagery retains its proportions' } },
  { id: 'selection', type: 'gallery', images: sampleLooks, caption: { cn: '组图模块演示 · 重复使用以上素材，正式发布时替换为项目细节', en: 'Gallery demonstration · Images above are reused here; replace with project details before publication' } },
]

const sampleCollaborations = [
  { partner: 'AERENNE', title: { cn: '静谧间隙', en: 'THE QUIET INTERVAL' } },
  { partner: 'NULLA STUDIO', title: { cn: '柔软纪念碑', en: 'SOFT MONUMENTS' } },
  { partner: 'ORBITAL OBJECTS', title: { cn: '暂停中的物件', en: 'OBJECTS IN PAUSE' } },
  { partner: 'VOLUME N°7', title: { cn: '余晖之后', en: 'AFTERLIGHT' } },
] as const
const sampleFacade: EditorialImage = {
  src: '/images/showroom/about/draped-facade-20260903.webp', ratio: '626 / 778',
  alt: { cn: '织物覆盖的建筑立面，仅作艺术项目排版示例', en: 'Fabric-covered facade, used only as an art project layout sample' },
}

export const collaborations: readonly Collaboration[] = collaborationCategories.map((category, index) => ({
  kind: 'collaboration', slug: `sample-${category.toLowerCase()}`, partner: sampleCollaborations[index].partner,
  title: sampleCollaborations[index].title,
  category, year: 2026, featured: index === 0, isSample: true,
  subtitle: { cn: '创意相遇的另一种可能 · 排版示例', en: 'Another way for ideas to meet · Layout sample' },
  coverImage: [sampleLooks[0], sampleFacade, space, cafe][index], gallery: [index === 0 ? space : display],
  concept: [{ cn: '此处将介绍合作缘起、双方的创意方向与共同目标。项目名称均为排版占位，不代表实际合作关系。', en: 'This space will introduce the partnership, creative direction and shared purpose. Project names are layout placeholders and do not represent real partnerships.' }],
  process: [{ cn: '此处预留创作过程、实验和幕后记录，后续可以加入对应图片。', en: 'A space for the creative process, experiments and behind-the-scenes documentation, with supporting imagery.' }],
  outcomes: [{ cn: '此处展示正式项目的最终作品与成果，待真实内容确认后替换。', en: 'Final work and project outcomes will appear here once the real content is confirmed.' }],
  credits: sampleCredits,
  blocks: index === 0 ? sampleBlocks : undefined,
}))

// Supply the confirmed public contact destination before publishing this section.
export const collaborationContact: { qrImage: string } | null = null
