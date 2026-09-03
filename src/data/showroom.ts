import type { AboutContent, Brand, CurrentEvent, LocalizedText, OnSiteService, Recap } from '@/types/showroom'

interface ShowroomImageRecord {
  src: `/images/showroom/${string}`
  alt: LocalizedText
}

const image = (src: ShowroomImageRecord['src'], cn: string, en: string): ShowroomImageRecord => ({ src, alt: { cn, en } })

const showroomImages = {
  'hero-reference.png': image('/images/showroom/hero-reference.png', 'YUAN SHOWROOM 首页版式参考', 'YUAN SHOWROOM homepage layout reference'),
  'now/lookbook/editorial-01.png': image('/images/showroom/now/lookbook/editorial-01.png', '订货会品牌大片 01', 'Ordering-season editorial look 01'),
  'now/lookbook/editorial-02.png': image('/images/showroom/now/lookbook/editorial-02.png', '订货会品牌大片 02', 'Ordering-season editorial look 02'),
  'now/lookbook/editorial-03.png': image('/images/showroom/now/lookbook/editorial-03.png', '订货会品牌大片 03', 'Ordering-season editorial look 03'),
  'now/lookbook/editorial-04.png': image('/images/showroom/now/lookbook/editorial-04.png', '订货会品牌大片 04', 'Ordering-season editorial look 04'),
  'now/lookbook/editorial-05.png': image('/images/showroom/now/lookbook/editorial-05.png', '订货会品牌大片 05', 'Ordering-season editorial look 05'),
  'about/showroom.webp': image('/images/showroom/about/showroom.webp', 'YUAN SHOWROOM 前台与接待空间', 'YUAN SHOWROOM reception and showroom interior'),
  'about/showroom-v2.webp': image('/images/showroom/about/showroom-v2.webp', '柔光下的当代时装展厅与中性色服装陈列', 'Contemporary fashion showroom with neutral garments in soft daylight'),
  'brands/ranyepersonal.webp': image('/images/showroom/brands/ranyepersonal.webp', 'RANYEPERSONAL 品牌造型肖像', 'RANYEPERSONAL campaign portrait'),
  'brands/maison-ther.webp': image('/images/showroom/brands/maison-ther.webp', 'MAISON THER 品牌造型肖像', 'MAISON THER campaign portrait'),
  'brands/nhoj.webp': image('/images/showroom/brands/nhoj.webp', 'NHOJ 品牌造型肖像', 'NHOJ campaign portrait'),
  'brands/playply.webp': image('/images/showroom/brands/playply.webp', 'PLAYPLY 品牌造型肖像', 'PLAYPLY campaign portrait'),
  'brands/alwools.webp': image('/images/showroom/brands/alwools.webp', 'ALWOOLS 品牌造型肖像', 'ALWOOLS campaign portrait'),
  'brands/tenspher.webp': image('/images/showroom/brands/tenspher.webp', 'TENSPHER 品牌造型肖像', 'TENSPHER campaign portrait'),
  'brands/4mile.webp': image('/images/showroom/brands/4mile.webp', '4MILE 品牌造型肖像', '4MILE campaign portrait'),
  'brands/datt.webp': image('/images/showroom/brands/datt.webp', 'DATT 品牌造型肖像', 'DATT campaign portrait'),
  'brands/pieton-episode.webp': image('/images/showroom/brands/pieton-episode.webp', 'PIÉTON ÉPISODE 品牌造型肖像', 'PIÉTON ÉPISODE campaign portrait'),
  'brands/lucia-tacci.webp': image('/images/showroom/brands/lucia-tacci.webp', 'LUCIA TACCI 品牌造型肖像', 'LUCIA TACCI campaign portrait'),
  'brands/helen-kaminski.webp': image('/images/showroom/brands/helen-kaminski.webp', 'HELEN KAMINSKI 品牌造型肖像', 'HELEN KAMINSKI campaign portrait'),
  'brands/reindeer.webp': image('/images/showroom/brands/reindeer.webp', 'REINDEER 品牌造型肖像', 'REINDEER campaign portrait'),
  'brand-room/ranyepersonal-main.webp': image('/images/showroom/brand-room/ranyepersonal-main.webp', 'RANYEPERSONAL 品牌造型肖像', 'RANYEPERSONAL campaign portrait'),
  'brand-room/ranyepersonal-detail-01.webp': image('/images/showroom/brand-room/ranyepersonal-detail-01.webp', 'RANYEPERSONAL 品牌造型肖像', 'RANYEPERSONAL campaign portrait'),
  'brand-room/ranyepersonal-detail-02.webp': image('/images/showroom/brand-room/ranyepersonal-detail-02.webp', 'RANYEPERSONAL 品牌造型肖像', 'RANYEPERSONAL campaign portrait'),
  'brand-room/maison-ther-main.webp': image('/images/showroom/brand-room/maison-ther-main.webp', 'MAISON THER 品牌造型肖像', 'MAISON THER campaign portrait'),
  'brand-room/maison-ther-detail-01.webp': image('/images/showroom/brand-room/maison-ther-detail-01.webp', 'MAISON THER 品牌造型肖像', 'MAISON THER campaign portrait'),
  'brand-room/maison-ther-detail-02.webp': image('/images/showroom/brand-room/maison-ther-detail-02.webp', 'MAISON THER 品牌造型肖像', 'MAISON THER campaign portrait'),
  'brand-room/nhoj-main.webp': image('/images/showroom/brand-room/nhoj-main.webp', 'NHOJ 黑色套装主造型', 'NHOJ black tailoring campaign image'),
  'brand-room/nhoj-detail-01.webp': image('/images/showroom/brand-room/nhoj-detail-01.webp', 'NHOJ 黑色外套造型', 'NHOJ black coat campaign image'),
  'brand-room/nhoj-detail-02.webp': image('/images/showroom/brand-room/nhoj-detail-02.webp', 'NHOJ 低调黑色西装造型', 'NHOJ low-light black suit campaign image'),
  'brand-room/playply-main.webp': image('/images/showroom/brand-room/playply-main.webp', 'PLAYPLY 品牌造型肖像', 'PLAYPLY campaign portrait'),
  'brand-room/playply-detail-01.webp': image('/images/showroom/brand-room/playply-detail-01.webp', 'PLAYPLY 品牌造型肖像', 'PLAYPLY campaign portrait'),
  'brand-room/playply-detail-02.webp': image('/images/showroom/brand-room/playply-detail-02.webp', 'PLAYPLY 品牌造型肖像', 'PLAYPLY campaign portrait'),
  'brand-room/alwools-main.webp': image('/images/showroom/brand-room/alwools-main.webp', 'ALWOOLS 品牌造型肖像', 'ALWOOLS campaign portrait'),
  'brand-room/alwools-detail-01.webp': image('/images/showroom/brand-room/alwools-detail-01.webp', 'ALWOOLS 品牌造型肖像', 'ALWOOLS campaign portrait'),
  'brand-room/alwools-detail-02.webp': image('/images/showroom/brand-room/alwools-detail-02.webp', 'ALWOOLS 品牌造型肖像', 'ALWOOLS campaign portrait'),
  'brand-room/tenspher-main.webp': image('/images/showroom/brand-room/tenspher-main.webp', 'TENSPHER 品牌造型肖像', 'TENSPHER campaign portrait'),
  'brand-room/tenspher-detail-01.webp': image('/images/showroom/brand-room/tenspher-detail-01.webp', 'TENSPHER 品牌造型肖像', 'TENSPHER campaign portrait'),
  'brand-room/tenspher-detail-02.webp': image('/images/showroom/brand-room/tenspher-detail-02.webp', 'TENSPHER 品牌造型肖像', 'TENSPHER campaign portrait'),
  'brand-room/4mile-main.webp': image('/images/showroom/brand-room/4mile-main.webp', '4MILE 品牌造型肖像', '4MILE campaign portrait'),
  'brand-room/4mile-detail-01.webp': image('/images/showroom/brand-room/4mile-detail-01.webp', '4MILE 品牌造型肖像', '4MILE campaign portrait'),
  'brand-room/4mile-detail-02.webp': image('/images/showroom/brand-room/4mile-detail-02.webp', '4MILE 品牌造型肖像', '4MILE campaign portrait'),
  'brand-room/datt-main.webp': image('/images/showroom/brand-room/datt-main.webp', 'DATT 品牌造型肖像', 'DATT campaign portrait'),
  'brand-room/datt-detail-01.webp': image('/images/showroom/brand-room/datt-detail-01.webp', 'DATT 品牌造型肖像', 'DATT campaign portrait'),
  'brand-room/datt-detail-02.webp': image('/images/showroom/brand-room/datt-detail-02.webp', 'DATT 品牌造型肖像', 'DATT campaign portrait'),
  'brand-room/pieton-episode-main.webp': image('/images/showroom/brand-room/pieton-episode-main.webp', 'PIÉTON ÉPISODE 品牌造型肖像', 'PIÉTON ÉPISODE campaign portrait'),
  'brand-room/pieton-episode-detail-01.webp': image('/images/showroom/brand-room/pieton-episode-detail-01.webp', 'PIÉTON ÉPISODE 品牌造型肖像', 'PIÉTON ÉPISODE campaign portrait'),
  'brand-room/pieton-episode-detail-02.webp': image('/images/showroom/brand-room/pieton-episode-detail-02.webp', 'PIÉTON ÉPISODE 品牌造型肖像', 'PIÉTON ÉPISODE campaign portrait'),
  'brand-room/lucia-tacci-main.webp': image('/images/showroom/brand-room/lucia-tacci-main.webp', 'LUCIA TACCI 品牌造型肖像', 'LUCIA TACCI campaign portrait'),
  'brand-room/lucia-tacci-detail-01.webp': image('/images/showroom/brand-room/lucia-tacci-detail-01.webp', 'LUCIA TACCI 品牌造型肖像', 'LUCIA TACCI campaign portrait'),
  'brand-room/lucia-tacci-detail-02.webp': image('/images/showroom/brand-room/lucia-tacci-detail-02.webp', 'LUCIA TACCI 品牌造型肖像', 'LUCIA TACCI campaign portrait'),
  'brand-room/helen-kaminski-main.webp': image('/images/showroom/brand-room/helen-kaminski-main.webp', 'HELEN KAMINSKI 品牌造型肖像', 'HELEN KAMINSKI campaign portrait'),
  'brand-room/helen-kaminski-detail-01.webp': image('/images/showroom/brand-room/helen-kaminski-detail-01.webp', 'HELEN KAMINSKI 品牌造型肖像', 'HELEN KAMINSKI campaign portrait'),
  'brand-room/helen-kaminski-detail-02.webp': image('/images/showroom/brand-room/helen-kaminski-detail-02.webp', 'HELEN KAMINSKI 品牌造型肖像', 'HELEN KAMINSKI campaign portrait'),
  'brand-room/reindeer-main.webp': image('/images/showroom/brand-room/reindeer-main.webp', 'REINDEER 品牌造型肖像', 'REINDEER campaign portrait'),
  'brand-room/reindeer-detail-01.webp': image('/images/showroom/brand-room/reindeer-detail-01.webp', 'REINDEER 品牌造型肖像', 'REINDEER campaign portrait'),
  'brand-room/reindeer-detail-02.webp': image('/images/showroom/brand-room/reindeer-detail-02.webp', 'REINDEER 品牌造型肖像', 'REINDEER campaign portrait'),
  'now/event.webp': image('/images/showroom/now/event.webp', '上海时装周订货会展厅内景', 'Shanghai Fashion Week showroom interior'),
  'now/event-v2.jpg': image('/images/showroom/now/event-v2.jpg', '半透明织物与黑白服装构成的上海时装周订货会空间', 'Shanghai Fashion Week ordering space with translucent textiles and monochrome garments'),
  'now/lookbook/a-nour.webp': image('/images/showroom/now/lookbook/a-nour.webp', 'A.NOUR 展览品牌封面', 'A.NOUR exhibition brand cover'),
  'now/lookbook/blanche.webp': image('/images/showroom/now/lookbook/blanche.webp', 'BLANCHE 展览品牌封面', 'BLANCHE exhibition brand cover'),
  'now/lookbook/insis.webp': image('/images/showroom/now/lookbook/insis.webp', 'INSIS 展览品牌封面', 'INSIS exhibition brand cover'),
  'now/lookbook/le17septembre.webp': image('/images/showroom/now/lookbook/le17septembre.webp', 'LE17SEPTEMBRE 展览品牌封面', 'LE17SEPTEMBRE exhibition brand cover'),
  'now/lookbook/nothing-written.webp': image('/images/showroom/now/lookbook/nothing-written.webp', 'NOTHING WRITTEN 展览品牌封面', 'NOTHING WRITTEN exhibition brand cover'),
  'now/lookbook/oui-mais-non.webp': image('/images/showroom/now/lookbook/oui-mais-non.webp', 'OUI MAIS NON 展览品牌封面', 'OUI MAIS NON exhibition brand cover'),
  'now/lookbook/recto.webp': image('/images/showroom/now/lookbook/recto.webp', 'RECTO 展览品牌封面', 'RECTO exhibition brand cover'),
  'now/lookbook/soft-goat.webp': image('/images/showroom/now/lookbook/soft-goat.webp', 'SOFT GOAT 展览品牌封面', 'SOFT GOAT exhibition brand cover'),
  'now/lookbook/st-agni.webp': image('/images/showroom/now/lookbook/st-agni.webp', 'ST. AGNI 展览品牌封面', 'ST. AGNI exhibition brand cover'),
  'now/lookbook/vegetable.webp': image('/images/showroom/now/lookbook/vegetable.webp', 'VEGETABLE 展览品牌封面', 'VEGETABLE exhibition brand cover'),
  'now/lookbook/wnderkammer.webp': image('/images/showroom/now/lookbook/wnderkammer.webp', 'WNDERKAMMER 展览品牌封面', 'WNDERKAMMER exhibition brand cover'),
  'now/lookbook/yen.webp': image('/images/showroom/now/lookbook/yen.webp', 'YEN 展览品牌封面', 'YEN exhibition brand cover'),
  'now/lookbook/le17septembre-main.webp': image('/images/showroom/now/lookbook/le17septembre-main.webp', 'LE17SEPTEMBRE 白色套装主造型', 'LE17SEPTEMBRE white tailoring main look'),
  'now/lookbook/le17septembre-01.webp': image('/images/showroom/now/lookbook/le17septembre-01.webp', 'LE17SEPTEMBRE 白色套装全身造型', 'LE17SEPTEMBRE white tailoring full look'),
  'now/lookbook/le17septembre-02.webp': image('/images/showroom/now/lookbook/le17septembre-02.webp', 'LE17SEPTEMBRE 黑色连衣裙全身造型', 'LE17SEPTEMBRE black dress full look'),
  'now/lookbook/le17septembre-03.webp': image('/images/showroom/now/lookbook/le17septembre-03.webp', 'LE17SEPTEMBRE 白色露背造型', 'LE17SEPTEMBRE white open-back look'),
  'now/lookbook/le17septembre-04.webp': image('/images/showroom/now/lookbook/le17septembre-04.webp', 'LE17SEPTEMBRE 黑色连衣裙正面造型', 'LE17SEPTEMBRE black dress front view'),
  'now/lookbook/le17septembre-05.webp': image('/images/showroom/now/lookbook/le17septembre-05.webp', 'LE17SEPTEMBRE 白色套装侧面造型', 'LE17SEPTEMBRE white tailoring side view'),
  'now/lookbook/le17septembre-06.webp': image('/images/showroom/now/lookbook/le17septembre-06.webp', 'LE17SEPTEMBRE 白色露背细节', 'LE17SEPTEMBRE white open-back detail'),
  'now/floor-map.webp': image('/images/showroom/now/floor-map.webp', 'YUAN SHOWROOM 三层楼层导览图', 'YUAN SHOWROOM three-floor guide map'),
  'now/appointment-qr.webp': image('/images/showroom/now/appointment-qr.webp', '上海时装周订货会预约二维码', 'Shanghai Fashion Week showroom appointment QR code'),
  'now/appointment-qr-27ps.png': image('/images/showroom/now/appointment-qr-27ps.png', '27PS 上海订货会预约小程序码', '27PS Shanghai ordering season appointment mini-program code'),
  'now/appointment-qr-27ps-v2.png': image('/images/showroom/now/appointment-qr-27ps-v2.png', '27PS 上海订货会预约小程序码', '27PS Shanghai ordering season appointment mini-program code'),
  'on-site/aano-cafe-space.webp': image('/images/showroom/on-site/aano-cafe-space.webp', 'Aano Cafe 咖啡空间', 'Aano Cafe space'),
  'on-site/aano-cafe-coffee.webp': image('/images/showroom/on-site/aano-cafe-coffee.webp', 'Aano Cafe 手冲咖啡', 'Aano Cafe filter coffee'),
  'on-site/aano-cafe-seating.webp': image('/images/showroom/on-site/aano-cafe-seating.webp', 'Aano Cafe 休憩空间', 'Aano Cafe seating'),
  'recap/ss-2026.webp': image('/images/showroom/recap/ss-2026.webp', 'SS 2026 订货会海报「无界之境」', 'SS 2026 ordering event poster, Beyond Boundaries'),
  'recap/ss-2026-layout.jpg': image('/images/showroom/recap/ss-2026-layout.jpg', 'SS 2026 订货会场景：建筑布局', 'SS 2026 recap scene: showroom layout'),
  'recap/ss-2026-cafe.jpg': image('/images/showroom/recap/ss-2026-cafe.jpg', 'SS 2026 订货会现场：咖啡服务区', 'SS 2026 recap scene: café service area'),
  'recap/ss-2026-meeting.jpg': image('/images/showroom/recap/ss-2026-meeting.jpg', 'SS 2026 订货会现场：买手洽谈', 'SS 2026 recap scene: buyer meeting'),
  'recap/aw-2025.webp': image('/images/showroom/recap/aw-2025.webp', 'AW 2025 订货会海报「重塑」', 'AW 2025 ordering event poster, Reframed'),
  'recap/ss-2025.webp': image('/images/showroom/recap/ss-2025.webp', 'SS 2025 订货会海报「流动的秩序」', 'SS 2025 ordering event poster, Order in Motion'),
  'recap/aw-2024.webp': image('/images/showroom/recap/aw-2024.webp', 'AW 2024 订货会海报「静默的力量」', 'AW 2024 ordering event poster, The Power of Stillness'),
  'recap/ss-2024.webp': image('/images/showroom/recap/ss-2024.webp', 'SS 2024 订货会海报「轻盈之诗」', 'SS 2024 ordering event poster, A Poem of Lightness'),
  'recap/aw-2023.webp': image('/images/showroom/recap/aw-2023.webp', 'AW 2023 订货会海报「本质回归」', 'AW 2023 ordering event poster, Return to Essence'),
  'recap/ss-2023.webp': image('/images/showroom/recap/ss-2023.webp', 'SS 2023 订货会海报「自然共生」', 'SS 2023 ordering event poster, Nature in Symbiosis'),
  'recap/aw-2022.webp': image('/images/showroom/recap/aw-2022.webp', 'AW 2022 订货会海报「时间的刻度」', 'AW 2022 ordering event poster, The Measure of Time'),
} as const satisfies Record<string, ShowroomImageRecord>

type ShowroomImagePath = keyof typeof showroomImages

const showroomImage = (path: ShowroomImagePath) => showroomImages[path].src
export const showroomImageAlt = (path: ShowroomImagePath) => showroomImages[path].alt

export const aboutContent: AboutContent = {
  introduction: [
    {
      cn: 'YUAN Showroom base 深圳和香港，\n是一家立足中国市场、融合国际视野的时尚专业运营平台，\n集品牌代理、市场开拓、运营管理、全域营销与战略投资\n于一体的综合性品牌管理机构支持平台。',
      en: 'YUAN Showroom is based in Shenzhen and Hong Kong.\nIt is a professional fashion operations platform rooted in the Chinese market and informed by an international perspective,\nintegrating brand representation, market expansion, operations management, omnichannel marketing, and strategic investment\nas a comprehensive support platform for brand management organizations.',
    },
    {
      cn: 'YUAN以品牌批发业务拓展为核心，\n为全球设计师品牌提供中国市场全链路解决方案，\n通过系统化运营支持品牌长期成长与可持续发展。',
      en: 'With wholesale business development at its core, YUAN\nprovides global designer brands with end-to-end solutions for the Chinese market,\nsupporting long-term growth and sustainable development through systematic operations.',
    },
  ],
  readMoreLabel: { cn: 'READ MORE', en: 'READ MORE' },
  image: showroomImage('about/showroom-v2.webp'),
  imageAlt: showroomImageAlt('about/showroom-v2.webp'),
  statistics: [
    {
      value: '6000+ SQM',
      label: { cn: '展会面积', en: 'EXHIBITION SPACE' },
      description: {
        cn: '单季展会面积超过 6000 平方米，覆盖品牌展示、商务洽谈与订货体验。',
        en: 'More than 6,000 sqm dedicated to brand presentation, buyer meetings, and seasonal ordering.',
      },
    },
    {
      value: '3000+',
      label: { cn: 'BUYER STORES', en: 'BUYER STORES' },
      description: {
        cn: '覆盖全国乃至国际销售与合作网络，连接超过 3000+ 买手店与百货渠道',
        en: 'Connecting 3000+ buyer stores and department-store channels through a nationwide and international network',
      },
    },
    {
      value: '4',
      label: { cn: 'FASHION WEEKS / YEAR', en: 'FASHION WEEKS / YEAR' },
      description: {
        cn: '每年固定在上海举办春夏、盛夏、秋冬、深冬四次季节性大型时装订货会',
        en: 'Four major seasonal fashion ordering events held annually in Shanghai',
      },
    },
  ],
}

export const brands: Brand[] = [
  { slug: 'ranyepersonal', name: 'RANYEPERSONAL', category: 'RTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'RANYEPERSONAL 以利落廓形和克制细节描绘当代女性的独立姿态，在日常与仪式感之间建立从容的着装语言。', en: 'RANYEPERSONAL frames the independent contemporary woman through precise silhouettes and restrained details, balancing everyday ease with a sense of occasion.' }, cover: showroomImage('brands/ranyepersonal.webp'), roomImages: [showroomImage('brand-room/ranyepersonal-main.webp'), showroomImage('brand-room/ranyepersonal-detail-01.webp'), showroomImage('brand-room/ranyepersonal-detail-02.webp')] },
  { slug: 'maison-ther', name: 'MAISON THER', category: 'RTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'MAISON THER 从长期主义出发，以柔和质地、简洁线条与经得起时间考验的衣橱作品回应现代生活。', en: 'Rooted in a long-term view, MAISON THER answers modern life with soft textures, clean lines, and wardrobe pieces designed to endure.' }, cover: showroomImage('brands/maison-ther.webp'), roomImages: [showroomImage('brand-room/maison-ther-main.webp'), showroomImage('brand-room/maison-ther-detail-01.webp'), showroomImage('brand-room/maison-ther-detail-02.webp')] },
  { slug: 'nhoj', name: 'NHOJ', category: 'RTW', city: { cn: '首尔', en: 'Seoul' }, introduction: { cn: 'NHOJ 是一个基于首尔的时装品牌，由设计师 Jung Jinwoo 于 2014 年创立。\n\n品牌以建筑与空间为思考起点，将结构、比例与秩序融入服装语言，探索穿着与空间之间的关系。\n\nNHOJ 的设计克制而精确，以实用性、持久性与中性的美学，构建出独立且一致的衣着系统。\n\n品牌在全球多个高端零售与展厅中呈现，并持续通过设计实践延展其独特的时装语言。', en: 'NHOJ is a Seoul-based fashion label founded by designer Jung Jinwoo in 2014.\n\nTaking architecture and space as its point of departure, the brand brings structure, proportion, and order into clothing to explore the relationship between dress and space.\n\nIts precise, restrained designs form an independent and coherent wardrobe through utility, longevity, and a gender-neutral aesthetic.\n\nPresented through select retailers and showrooms worldwide, NHOJ continues to develop its distinct design language through ongoing practice.' }, cover: showroomImage('brands/nhoj.webp'), roomImages: [showroomImage('brand-room/nhoj-main.webp'), showroomImage('brand-room/nhoj-detail-01.webp'), showroomImage('brand-room/nhoj-detail-02.webp')] },
  { slug: 'playply', name: 'PLAYPLY', category: 'RTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'PLAYPLY 以自然面料与轻盈结构承载柔软而清醒的女性气质，在日常穿着中保留自由的想象空间。', en: 'PLAYPLY pairs natural fabrics with light construction, creating a soft yet clear-minded femininity and leaving room for freedom in everyday dress.' }, cover: showroomImage('brands/playply.webp'), roomImages: [showroomImage('brand-room/playply-main.webp'), showroomImage('brand-room/playply-detail-01.webp'), showroomImage('brand-room/playply-detail-02.webp')] },
  { slug: 'alwools', name: 'ALWOOLS', category: 'RTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'ALWOOLS 专注于羊毛与天然材质的当代表达，以松弛比例和细腻触感构建兼具温度与个性的日常衣橱。', en: 'ALWOOLS reimagines wool and natural materials through relaxed proportions and tactile refinement, building an everyday wardrobe with warmth and character.' }, cover: showroomImage('brands/alwools.webp'), roomImages: [showroomImage('brand-room/alwools-main.webp'), showroomImage('brand-room/alwools-detail-01.webp'), showroomImage('brand-room/alwools-detail-02.webp')] },
  { slug: 'tenspher', name: 'TENSPHER', category: 'RTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'TENSPHER 从女性力量出发，以重构剪裁和流动细节平衡锋利与浪漫，呈现不被定义的时装表达。', en: 'TENSPHER starts from feminine strength, balancing sharp reconstructed tailoring with fluid details for fashion that resists definition.' }, cover: showroomImage('brands/tenspher.webp'), roomImages: [showroomImage('brand-room/tenspher-main.webp'), showroomImage('brand-room/tenspher-detail-01.webp'), showroomImage('brand-room/tenspher-detail-02.webp')] },
  { slug: '4mile', name: '4MILE', category: 'RTW', city: { cn: '首尔', en: 'Seoul' }, introduction: { cn: '4MILE 以极简视角观察都市日常，在克制色彩与清晰轮廓中延展舒适、自由的当代风格。', en: '4MILE observes urban everyday life through a minimalist lens, extending a comfortable, free contemporary style through restrained colour and clear form.' }, cover: showroomImage('brands/4mile.webp'), roomImages: [showroomImage('brand-room/4mile-main.webp'), showroomImage('brand-room/4mile-detail-01.webp'), showroomImage('brand-room/4mile-detail-02.webp')] },
  { slug: 'datt', name: 'DATT', category: 'RTW', city: { cn: '胡志明市', en: 'Ho Chi Minh City' }, introduction: { cn: 'DATT 在现代与古典之间游走，以精致结构和灵动细节书写具有个人感的浪漫衣着。', en: 'DATT moves between the modern and the classical, using refined construction and expressive detail to write a romantic wardrobe with a personal point of view.' }, cover: showroomImage('brands/datt.webp'), roomImages: [showroomImage('brand-room/datt-main.webp'), showroomImage('brand-room/datt-detail-01.webp'), showroomImage('brand-room/datt-detail-02.webp')] },
  { slug: 'pieton-episode', name: 'PIÉTON ÉPISODE', category: 'FTW', city: { cn: '首尔', en: 'Seoul' }, introduction: { cn: 'PIÉTON ÉPISODE 将步行中的观察转化为鞋履语言，以自然质感、舒适脚感与细节工艺勾勒优雅日常。', en: 'PIÉTON ÉPISODE translates observations from walking into footwear, defining elegant everyday life with natural texture, comfort, and crafted detail.' }, cover: showroomImage('brands/pieton-episode.webp'), roomImages: [showroomImage('brand-room/pieton-episode-main.webp'), showroomImage('brand-room/pieton-episode-detail-01.webp'), showroomImage('brand-room/pieton-episode-detail-02.webp')] },
  { slug: 'lucia-tacci', name: 'LUCIA TACCI', category: 'FTW', city: { cn: '上海', en: 'Shanghai' }, introduction: { cn: 'LUCIA TACCI 以简洁而精确的线条塑造现代鞋履，在实穿性与精致感之间寻找恰当平衡。', en: 'LUCIA TACCI shapes contemporary footwear with clean, exacting lines, finding the right balance between wearability and refinement.' }, cover: showroomImage('brands/lucia-tacci.webp'), roomImages: [showroomImage('brand-room/lucia-tacci-main.webp'), showroomImage('brand-room/lucia-tacci-detail-01.webp'), showroomImage('brand-room/lucia-tacci-detail-02.webp')] },
  { slug: 'helen-kaminski', name: 'HELEN KAMINSKI', category: 'ACC', city: { cn: '悉尼', en: 'Sydney' }, introduction: { cn: 'HELEN KAMINSKI 以自然纤维与匠心工艺闻名，呈现兼具轻盈、优雅与可持续理念的经典配饰。', en: 'HELEN KAMINSKI is known for natural fibres and considered craftsmanship, creating timeless accessories with lightness, elegance, and a sustainable sensibility.' }, cover: showroomImage('brands/helen-kaminski.webp'), roomImages: [showroomImage('brand-room/helen-kaminski-main.webp'), showroomImage('brand-room/helen-kaminski-detail-01.webp'), showroomImage('brand-room/helen-kaminski-detail-02.webp')] },
  { slug: 'reindeer', name: 'REINDEER', category: 'ACC', city: { cn: '首尔', en: 'Seoul' }, introduction: { cn: 'REINDEER 以不规则线条与极简语汇探索自由而松弛的配饰表达，为日常造型注入轻盈个性。', en: 'REINDEER explores free, relaxed accessories through irregular lines and a minimalist vocabulary, bringing a light individuality to everyday styling.' }, cover: showroomImage('brands/reindeer.webp'), roomImages: [showroomImage('brand-room/reindeer-main.webp'), showroomImage('brand-room/reindeer-detail-01.webp'), showroomImage('brand-room/reindeer-detail-02.webp')] },
]

const editorialLookbook = [
  { image: showroomImage('now/lookbook/editorial-01.png') },
  { image: showroomImage('now/lookbook/editorial-02.png') },
  { image: showroomImage('now/lookbook/editorial-03.png') },
  { image: showroomImage('now/lookbook/editorial-04.png') },
  { image: showroomImage('now/lookbook/editorial-05.png') },
  { image: showroomImage('now/lookbook/editorial-03.png') },
  { image: showroomImage('now/lookbook/editorial-05.png') },
  { image: showroomImage('now/lookbook/editorial-01.png') },
  { image: showroomImage('now/lookbook/editorial-04.png') },
  { image: showroomImage('now/lookbook/editorial-02.png') },
  { image: showroomImage('now/lookbook/editorial-03.png') },
  { image: showroomImage('now/lookbook/editorial-05.png') },
] as const

// User-supplied womenswear, temporarily assigned for local layout previews.
const suppliedLook = (number: number) => ({ image: `/images/showroom/now/lookbook/womenswear-upload-${number}.webp` })
const ranyePreviewLookbook = [
  ...editorialLookbook.slice(0, 5),
  ...[1, 3, 5, 6, 10, 11].map(suppliedLook),
]
const maisonPreviewLookbook = [4, 7, 9, 12, 13].map(suppliedLook)
const nhojPreviewLookbook = [14, 16, 18, 17, 15, 2, 8].map(suppliedLook)

export const currentEvent: CurrentEvent = {
  city: { cn: '上海', en: 'Shanghai' },
  title: { cn: '上海时装周', en: 'Shanghai Fashion Week' },
  season: 'SS 2027',
  heroImage: showroomImage('now/event-v2.jpg'),
  exhibitionBrands: [
    { slug: 'ranyepersonal', name: 'RANYEPERSONAL', poster: showroomImage('brands/ranyepersonal.webp'), items: ranyePreviewLookbook },
    { slug: 'maison-ther', name: 'MAISON THER', poster: showroomImage('brands/maison-ther.webp'), items: maisonPreviewLookbook },
    { slug: 'nhoj', name: 'NHOJ', poster: showroomImage('brands/nhoj.webp'), items: nhojPreviewLookbook },
    { slug: 'playply', name: 'PLAYPLY', poster: showroomImage('brands/playply.webp'), items: editorialLookbook },
    { slug: 'alwools', name: 'ALWOOLS', poster: showroomImage('brands/alwools.webp'), items: editorialLookbook },
    { slug: 'tenspher', name: 'TENSPHER', poster: showroomImage('brands/tenspher.webp'), items: editorialLookbook },
    { slug: '4mile', name: '4MILE', poster: showroomImage('brands/4mile.webp'), items: editorialLookbook },
    { slug: 'datt', name: 'DATT', poster: showroomImage('brands/datt.webp'), items: editorialLookbook },
    { slug: 'pieton-episode', name: 'PIÉTON ÉPISODE', poster: showroomImage('brands/pieton-episode.webp'), items: editorialLookbook },
    { slug: 'lucia-tacci', name: 'LUCIA TACCI', poster: showroomImage('brands/lucia-tacci.webp'), items: editorialLookbook },
    { slug: 'helen-kaminski', name: 'HELEN KAMINSKI', poster: showroomImage('brands/helen-kaminski.webp'), items: editorialLookbook },
    { slug: 'reindeer', name: 'REINDEER', poster: showroomImage('brands/reindeer.webp'), items: editorialLookbook },
  ],
  floorMapImage: showroomImage('now/floor-map.webp'),
  appointmentQrImage: showroomImage('now/appointment-qr-27ps-v2.png'),
}

export const appointmentContent = {
  edition: '27PS',
  theme: 'ECHOES OF DECO',
  season: '2027 PRE-SPRING',
  location: { cn: '上海订货会', en: 'Shanghai Ordering Season' },
  label: { cn: '预约参观', en: 'Appointment' },
  scan: { cn: '微信扫码填写预约资料', en: 'Scan with WeChat to submit your appointment request' },
  steps: [
    { cn: '微信扫码填写预约资料', en: 'Scan with WeChat and complete the appointment form' },
    { cn: '提交后由工作人员审核', en: 'Your request will be reviewed by our team' },
    { cn: '审核结果将通过短信发送', en: 'The review result will be sent by SMS' },
  ],
  review: {
    cn: '提交预约不代表审核通过。请准确填写本人手机号，最终预约结果以短信通知为准。',
    en: 'Submitting a request does not confirm an appointment. Please provide a valid mobile number; the final result will be sent by SMS.',
  },
} as const

export const onSiteServices: OnSiteService[] = [{
  id: 'aano-caffe',
  name: 'Aano Cafe',
  description: { cn: '选品间隙，停下来喝一杯咖啡。Aano Cafe 为买手与品牌提供一处休憩、交流的安静空间。', en: 'A pause between selections. Aano Cafe offers buyers and brands a quiet place for coffee, conversation, and a moment to reset.' },
  location: { cn: '签到台右后方', en: 'Behind the check-in desk, to the right' },
  offering: { cn: '手冲咖啡 · 冷萃 · 轻食 · 甜点', en: 'Hand-brewed coffee · Cold brew · Light bites · Desserts' },
  hours: { cn: '活动期间每日 10:00 – 19:00', en: 'Daily during the event, 10:00 – 19:00' },
  images: [
    showroomImage('on-site/aano-cafe-space.webp'),
    showroomImage('on-site/aano-cafe-coffee.webp'),
    showroomImage('on-site/aano-cafe-seating.webp'),
  ],
}]

export const recaps: Recap[] = [
  {
    slug: 'ss-2026',
    season: 'SS 2026',
    title: { cn: '无界之境', en: 'Beyond Boundaries' },
    poster: showroomImage('recap/ss-2026-layout.jpg'),
    order: 1,
    city: { cn: '上海', en: 'Shanghai' },
    date: { cn: '2026 春夏订货季', en: 'Spring / Summer 2026 Ordering Season' },
    description: {
      cn: '空间的结构与秩序，成为品牌沟通与买手交流的起点。SS 2026 在上海用可持续的布局感，把陈列与谈判并置，形成完整的选货体验。',
      en: 'Spatial order and rhythm became the starting point for brand communication and buyer dialogue. At SS 2026 in Shanghai, layout-first staging brought merchandising and negotiation into one coherent flow.',
    },
    videoPoster: showroomImage('recap/ss-2026-layout.jpg'),
    pages: [],
    gallery: [],
    sections: [
      {
        image: showroomImage('recap/ss-2026-layout.jpg'),
        title: { cn: '建筑布局 · 空间主线', en: 'Spatial Planning · Core Layout' },
        paragraphs: [
          {
            cn: '从入口到核心区的走向一体化，既满足品牌陈列的连续感，也保留了买手快速巡览与定向讨论的流线。',
            en: 'A continuous flow from entrance to core zones balances visual continuity for brand displays with efficient circulation for fast buyer walkthroughs and focused discussions.',
          },
        ],
      },
      {
        image: showroomImage('recap/ss-2026-cafe.jpg'),
        title: { cn: '咖啡厅服务 · 间隙与切换', en: 'Café Service · Pause and Transition' },
        paragraphs: [
          {
            cn: '现场设置的咖啡服务区承担缓冲作用，买手在繁密选样节奏中可短暂停留、交流反馈，并自然过渡到下一段洽谈。',
            en: 'The café service area worked as a pause point: buyers could reset, exchange feedback, and move smoothly into the next round of consultations.',
          },
        ],
      },
      {
        image: showroomImage('recap/ss-2026-meeting.jpg'),
        title: { cn: '买手洽谈 · 选款决策', en: 'Buyer Consultations · Selection Decisions' },
        paragraphs: [
          {
            cn: '洽谈区域围绕关键单品与配比展开，对接品牌主理人与买手团队，以更高效的方式确定配货节奏和后续合作方向。',
            en: 'Consultation zones focused on key pieces and lineup balance, enabling brand leads and buyer teams to align on replenishment pace and collaboration direction.',
          },
        ],
      },
    ],
  },
  { slug: 'aw-2025', season: 'AW 2025', title: { cn: '重塑', en: 'Reframed' }, poster: showroomImage('recap/aw-2025.webp'), order: 2, pages: [], gallery: [] },
  { slug: 'ss-2025', season: 'SS 2025', title: { cn: '流动的秩序', en: 'Order in Motion' }, poster: showroomImage('recap/ss-2025.webp'), order: 3, pages: [], gallery: [] },
  { slug: 'aw-2024', season: 'AW 2024', title: { cn: '静默的力量', en: 'The Power of Stillness' }, poster: showroomImage('recap/aw-2024.webp'), order: 4, pages: [], gallery: [] },
  { slug: 'ss-2024', season: 'SS 2024', title: { cn: '轻盈之诗', en: 'A Poem of Lightness' }, poster: showroomImage('recap/ss-2024.webp'), order: 5, pages: [], gallery: [] },
  { slug: 'aw-2023', season: 'AW 2023', title: { cn: '本质回归', en: 'Return to Essence' }, poster: showroomImage('recap/aw-2023.webp'), order: 6, pages: [], gallery: [] },
  { slug: 'ss-2023', season: 'SS 2023', title: { cn: '自然共生', en: 'Nature in Symbiosis' }, poster: showroomImage('recap/ss-2023.webp'), order: 7, pages: [], gallery: [] },
  { slug: 'aw-2022', season: 'AW 2022', title: { cn: '时间的刻度', en: 'The Measure of Time' }, poster: showroomImage('recap/aw-2022.webp'), order: 8, pages: [], gallery: [] },
  { slug: 'ss-2022', season: 'SS 2022', title: { cn: '光影之间', en: 'Between Light and Shadow' }, poster: showroomImage('recap/ss-2023.webp'), order: 9, pages: [], gallery: [] },
  { slug: 'aw-2021', season: 'AW 2021', title: { cn: '序章', en: 'Prologue' }, poster: showroomImage('recap/aw-2022.webp'), order: 10, pages: [], gallery: [] },
]
