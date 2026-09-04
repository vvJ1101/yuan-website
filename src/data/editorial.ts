import { editorialReferenceAssets } from './editorial-reference-assets.js'
import type { Collaboration, CollaborationBlock, EditorialImage, PopUpEvent, StoryBlock } from '../types/editorial'

export const eventCategories = ['CURRENT', 'UPCOMING', 'ARCHIVE'] as const
export const collaborationCategories = ['FASHION', 'ART', 'DESIGN', 'CULTURE'] as const

const spatialStudy = (name: string, ratio: string, cn: string, en: string): EditorialImage => ({
  src: `/images/editorial/spatial-studies/${name}.webp`, ratio, alt: { cn, en },
})

const collaborationStudies: readonly (readonly EditorialImage[])[] = [
  [
    spatialStudy('sophie-06', '3 / 2', '服装、桌面与浅蓝色瓷砖构成的空间陈列', 'Fashion display, table and pale blue tiled interior'),
    spatialStudy('sophie-01', '2 / 3', '移动人物与悬挂服装形成的空间叙事', 'Moving figure and suspended garment within the interior'),
    spatialStudy('sophie-03', '2 / 3', '浅蓝色瓷砖墙前的白色服装陈列', 'White garment displayed against pale blue tiles'),
    spatialStudy('sophie-08', '2 / 3', '桌椅、沙发与悬挂服装构成的工作室空间', 'Studio interior with furniture and suspended garments'),
    spatialStudy('sophie-09', '3 / 2', '一黑一白两件服装的对称陈列', 'Symmetrical display of black and white garments'),
  ],
  [
    spatialStudy('casa-02', '3 / 2', '圆窗与混凝土墙构成的建筑立面', 'Architectural facade with circular window and concrete wall'),
    spatialStudy('casa-03', '2 / 3', '蓝天下的混凝土建筑转角', 'Concrete architectural corner beneath a blue sky'),
    spatialStudy('casa-05', '2 / 3', '光线穿过混凝土结构的纵深空间', 'Light passing through a deep concrete interior'),
    spatialStudy('casa-09', '3 / 2', '人物剪影与深色走廊形成的空间层次', 'Human silhouette and layered dark corridor'),
    spatialStudy('casa-11', '2 / 3', '书墙与人物构成的纵向室内空间', 'Vertical interior with shelving and a human figure'),
  ],
  [
    spatialStudy('casa-01', '3 / 2', '木质中岛与黑色圆柱形成的对称室内构图', 'Symmetrical interior with timber island and black cylinder'),
    spatialStudy('casa-06', '3 / 2', '混凝土住宅的完整外观', 'Full exterior view of a concrete residence'),
    spatialStudy('casa-07', '3 / 2', '梁柱与网格天花构成的开放室内空间', 'Open interior framed by beams and a gridded ceiling'),
    spatialStudy('casa-08', '3 / 2', '遮檐下的室内外过渡空间', 'Covered transition between interior and exterior'),
    spatialStudy('casa-04', '3 / 2', '人物与长遮檐构成的露台生活场景', 'Terrace scene framed by people and a long canopy'),
    spatialStudy('casa-10', '3 / 2', '水面前的住宅后立面', 'Rear residential facade facing a reflecting pool'),
    spatialStudy('casa-12', '3 / 2', '木质吧台与层次丰富的生活空间', 'Layered living space with a timber bar'),
  ],
  [
    spatialStudy('sophie-05', '2 / 3', '绿植环绕的双层工作室外立面', 'Two-storey studio facade surrounded by planting'),
    spatialStudy('sophie-02', '2 / 3', '木质圆形物件与绿植构成的窗边静物', 'Window still life with timber objects and planting'),
    spatialStudy('sophie-04', '2 / 3', '彩虹光落在玻璃器皿与镜面上', 'Rainbow light across glassware and a mirrored surface'),
    spatialStudy('sophie-07', '2 / 3', '自然光下手工缝合的织物细节', 'Hand-stitched textile detail in natural light'),
    spatialStudy('sophie-10', '2 / 3', '砖墙、镜面与金属层板构成的陈列角落', 'Display corner composed of brick, mirror and metal shelving'),
    spatialStudy('casa-13', '3 / 2', '夕阳下的建筑露台与水平天际线', 'Architectural terrace and horizon at sunset'),
  ],
]

const sampleCredits = [{ cn: '临时演示素材来自用户提供的设计项目参考；正式发布前请确认图片授权与署名。', en: 'Temporary preview imagery supplied as design references; confirm image rights and credits before final publication.' }]

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

const sampleBlocks = (images: readonly EditorialImage[]): readonly CollaborationBlock[] => [
  { id: 'direction', type: 'text', heading: { cn: '从空间到衣着', en: 'From space to silhouette' }, paragraphs: [{ cn: '以空间、衣着、材料与光线为线索，演示一篇合作故事的阅读节奏。以下图片为临时设计参考，不代表实际合作关系。', en: 'An editorial study in space, clothing, material and light. These temporary reference images do not represent an actual collaboration.' }] },
  { id: 'space', type: 'image-text', image: images[1], heading: { cn: '空间与陈列', en: 'Space and display' }, paragraphs: [{ cn: '从整体空间开始，再走近物件与材料。画面之间保留距离，让建筑结构、服装陈列与生活痕迹共同形成叙事。', en: 'Begin with the setting, then move closer to objects and materials. Space between images lets architecture, clothing displays and traces of use form a shared narrative.' }] },
  { id: 'dialogue', type: 'pair', images: [images[2], images[3]], caption: { cn: '空间对话 · 临时演示素材', en: 'Spatial dialogue · Temporary preview imagery' } },
  { id: 'outcome', type: 'text', heading: { cn: '物件、光线与细节', en: 'Objects, light and detail' }, paragraphs: [{ cn: '不同尺度的图像穿插出现：完整空间建立语境，局部细节减慢阅读速度，也为后续真实合作内容预留清晰的编辑结构。', en: 'Images move between scales: complete spaces establish context while details slow the reading rhythm and preserve a clear editorial structure for future project content.' }] },
  { id: 'focus', type: 'image', image: images[4], caption: { cn: '单幅空间研究 · 临时演示素材', en: 'Single spatial study · Temporary preview imagery' } },
  { id: 'selection', type: 'gallery', images: images.length > 5 ? images.slice(5) : [images[1]], caption: { cn: '空间研究组图 · 正式发布时替换为对应项目素材', en: 'Spatial study · Replace with project-specific imagery for final publication' } },
]

const sampleCollaborations = [
  { partner: 'AERENNE', title: { cn: '静谧间隙', en: 'THE QUIET INTERVAL' } },
  { partner: 'NULLA STUDIO', title: { cn: '柔软纪念碑', en: 'SOFT MONUMENTS' } },
  { partner: 'ORBITAL OBJECTS', title: { cn: '暂停中的物件', en: 'OBJECTS IN PAUSE' } },
  { partner: 'VOLUME N°7', title: { cn: '余晖之后', en: 'AFTERLIGHT' } },
] as const

const sampleStory: readonly StoryBlock[] = [
  { id: 'story-hero', type: 'hero', image: editorialReferenceAssets[0] },
  { id: 'story-introduction', type: 'text', heading: { cn: '一场关于空间与衣着的相遇', en: 'A meeting of space and silhouette' }, paragraphs: [{ cn: '这是一篇用于检验图文节奏的示例故事。空间、材质与服装图像被组织为连续章节，后续可由真实合作内容逐项替换。', en: 'A sample story used to test editorial rhythm. Space, material and fashion imagery form a sequence that can later be replaced block by block with real collaboration content.' }] },
  { id: 'story-dialogue', type: 'imageText', image: editorialReferenceAssets[4], heading: { cn: '空间成为对话的一部分', en: 'Space becomes part of the conversation' }, paragraphs: [{ cn: '建筑的结构、光线与留白不只是背景，也决定作品被观看的距离和节奏。', en: 'Structure, light and negative space are more than a backdrop; they shape how the work is seen and paced.' }] },
  { id: 'story-pair', type: 'offsetPair', images: [sampleLooks[0], editorialReferenceAssets[1]], caption: { cn: '形态与空间的并置 · 示例素材', en: 'Silhouette and space in counterpoint · Sample imagery' } },
  { id: 'story-details', type: 'detailStrip', images: [editorialReferenceAssets[2], editorialReferenceAssets[3], editorialReferenceAssets[5]], caption: { cn: '材料、结构与现场细节 · 临时参考素材', en: 'Material, structure and spatial detail · Temporary reference imagery' } },
  { id: 'story-statement', type: 'statement', text: { cn: '让工艺、空间与新的观看方式在此相遇。', en: 'A meeting point for craft, space and new perspectives.' } },
  { id: 'story-credits', type: 'credits', items: sampleCredits },
]
export const collaborations: readonly Collaboration[] = collaborationCategories.map((category, index) => ({
  kind: 'collaboration', slug: `sample-${category.toLowerCase()}`, partner: sampleCollaborations[index].partner,
  title: sampleCollaborations[index].title,
  category, year: 2026, featured: index === 0, isSample: true,
  subtitle: { cn: '创意相遇的另一种可能 · 排版示例', en: 'Another way for ideas to meet · Layout sample' },
  coverImage: collaborationStudies[index][0], gallery: collaborationStudies[index].slice(1),
  concept: [{ cn: '此处将介绍合作缘起、双方的创意方向与共同目标。项目名称均为排版占位，不代表实际合作关系。', en: 'This space will introduce the partnership, creative direction and shared purpose. Project names are layout placeholders and do not represent real partnerships.' }],
  process: [{ cn: '此处预留创作过程、实验和幕后记录，后续可以加入对应图片。', en: 'A space for the creative process, experiments and behind-the-scenes documentation, with supporting imagery.' }],
  outcomes: [{ cn: '此处展示正式项目的最终作品与成果，待真实内容确认后替换。', en: 'Final work and project outcomes will appear here once the real content is confirmed.' }],
  credits: sampleCredits,
  blocks: sampleBlocks(collaborationStudies[index]),
  story: index === 0 ? sampleStory : undefined,
}))

// Supply the confirmed public contact destination before publishing this section.
export const collaborationContact: { qrImage: string } | null = null
