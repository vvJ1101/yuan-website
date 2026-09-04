const sophieSource = '/Users/vv/Downloads/谷歌浏览器下载/𝑺𝒐𝒑𝒉𝒊𝒆 𝑯. _ 空間設計 __ Behance'
const casaSource = '/Users/vv/Downloads/谷歌浏览器下载/Casa CLO , Obra del estudio OON __ Behance'

/** @satisfies {readonly import('../types/editorial').StoryImage[]} */
export const editorialReferenceAssets = [
  {
    src: '/images/editorial/placeholders/sophie-space-wide.jpg',
    alt: { cn: '灰蓝色空间中的服装陈列与阅读桌', en: 'Garment display and reading table in a muted blue interior' },
    ratio: '3/2', sourceLabel: 'Sophie H. / Behance reference', sourcePath: `${sophieSource}/a7f621252313821.6a818b3445413.jpg`, temporary: true, replacementStatus: 'pending',
  },
  {
    src: '/images/editorial/placeholders/sophie-space-portrait.jpg',
    alt: { cn: '克制空间中的纵向陈列细节', en: 'Portrait display detail in a restrained interior' },
    ratio: '2/3', sourceLabel: 'Sophie H. / Behance reference', sourcePath: `${sophieSource}/5c6ada252313821.6a4ca7cbf167b.jpg`, temporary: true, replacementStatus: 'pending',
  },
  {
    src: '/images/editorial/placeholders/sophie-material-portrait.jpg',
    alt: { cn: '空间材料与服装装置细节', en: 'Material and garment installation detail' },
    ratio: '2/3', sourceLabel: 'Sophie H. / Behance reference', sourcePath: `${sophieSource}/c07b96252313821.6a818b2ec1894.jpg`, temporary: true, replacementStatus: 'pending',
  },
  {
    src: '/images/editorial/placeholders/casa-exterior-wide.jpg',
    alt: { cn: '混凝土与石材构成的低层建筑外观', en: 'Low concrete and stone building exterior' },
    ratio: '3/2', sourceLabel: 'Casa CLO / OON / Behance reference', sourcePath: `${casaSource}/bbebe0254097355.6a7a78f58e806.jpg`, temporary: true, replacementStatus: 'pending',
  },
  {
    src: '/images/editorial/placeholders/casa-courtyard-portrait.jpg',
    alt: { cn: '混凝土格栅下的庭院入口', en: 'Courtyard entrance beneath a concrete grid' },
    ratio: '1920/2875', sourceLabel: 'Casa CLO / OON / Behance reference', sourcePath: `${casaSource}/281e9d254097355.6a7a78f5913da.jpg`, temporary: true, replacementStatus: 'pending',
  },
  {
    src: '/images/editorial/placeholders/casa-interior-wide.jpg',
    alt: { cn: '自然材质与留白构成的室内空间', en: 'Interior composed with natural materials and open space' },
    ratio: '3/2', sourceLabel: 'Casa CLO / OON / Behance reference', sourcePath: `${casaSource}/fbbfd7254097355.6a7a78f5905f6.jpg`, temporary: true, replacementStatus: 'pending',
  },
]
