// YUAN SHOWROOM — Homepage Data
// Source: YUAN SHOWROOM公司简介.docx (BrandBook 2026)
// Images: all sourced from YUAN SHOWROOM公司简介.docx

export const site = {
  name: 'YUAN SHOWROOM',
  tagline: '以系统连接时尚的每一条轨迹',
  footer: '以你为圆心 · 以时尚为半径',
}

// ═══ Section 1: Hero ═══

export const hero = {
  bgImage: '/images/home/hero-cover.jpeg',
  title: 'YUAN SHOWROOM',
  subtitle: 'Connecting every path of fashion through system',
  tagline: '从我们相遇的那一刻起，YUAN SHOWROOM 不只是一个平台，更是一种始终以品牌为中心、陪伴其扩展、连接世界的系统。',
  taglineEn: 'From the moment we meet, YUAN SHOWROOM is more than a platform — it is a system that always puts the brand at its center, accompanying its growth and connecting it to the world.',
  closing: '我们以你为圆心，以时尚为半径。',
  closingEn: 'We take you as the center, and fashion as the radius.',
  cta: {
    primary: { label: '品牌合作洽谈', href: '#contact' },
    secondary: { label: '了解 YUAN SHOWROOM 模式', href: '#bsi' },
  },
}

// ═══ Section 2: About + Numbers ═══

export const about = {
  image: '/images/home/about-main.jpeg',
  title: '关于 YUAN SHOWROOM',
  subtitle: 'Position & Vision',
  intro: 'YUAN SHOWROOM 立足深圳和香港，是一家专注中国市场、融合国际视野的时尚产业化运营机构，集品牌代理、市场开拓、运营管理、全域营销与战略投资于一体的综合性品牌管理支持平台。',
  intro2: 'YUAN SHOWROOM 以品牌批发业务拓展为核心、品牌全方位市场推广服务、零售体系搭建及战略投资业务，为全球设计师品牌提供中国市场全链路解决方案。每年固定在上海举办早春、春夏、早秋及秋冬四次季节性大型时装订货会。核心团队深耕行业多年，凭借国际视野与本土化运营经验，目前独家运营中国、欧洲、亚洲等超过 50+ 设计师品牌。',
  intro3: '我们相信，每一个品牌都有其独特的圆心；YUAN SHOWROOM 所做的，是成为那条从圆心出发、不断延展的"半径"——连接创意、市场与世界，见证品牌成长轨迹。',
  link: { label: '探索 YUAN SHOWROOM 服务体系', href: '#services' },
}

export const byTheNumbers = [
  { value: '50+', label: '独家运营设计师品牌', sublabel: '中国 / 欧洲 / 亚洲' },
  { value: '3,000+', label: '合作买手店 & 百货商场', sublabel: '亚洲 / 欧洲 / 北美 / 中东' },
  { value: '5,000+㎡', label: '沉浸式展厅空间', sublabel: '上海 · 深圳 · 香港' },
  { value: '100+', label: '品牌从 0 到亿操盘案例', sublabel: '全生命周期增长' },
  { value: '4 季/年', label: '时装周大型订货会', sublabel: '春夏 · 盛夏 · 秋冬 · 深冬' },
]

// ═══ Section 3: BSI Core Strengths ═══

export const bsi = {
  title: '核心优势',
  subtitle: 'BSI 商业模型',
  tag: 'Core Strengths',
  image: '/images/home/bsi-graphic.png',
  intro: 'YUAN SHOWROOM 基于对中国时尚行业的深度洞察，自主搭建「BSI」商业模型 (Buyer-Showroom-Investment)。YUAN SHOWROOM 不是一个中转式的买手平台，而是一个以"系统运营力"驱动的品牌发展生态。',
  pillars: [
    {
      id: 'service',
      title: '服务体系',
      enTitle: 'Service System',
      desc: 'YUAN SHOWROOM 提供覆盖品牌全生命周期的一站式服务 — 从品牌咨询、市场调研、产品开发建议，到订货分销、销售维护、新媒体运营，再到电商零售、投资支持，打造从"品牌起步"到"市场成熟"的全链路协作结构。',
    },
    {
      id: 'team',
      title: '团队能力',
      enTitle: 'Team Capability',
      desc: 'YUAN SHOWROOM 核心团队拥有操盘 100+ 品牌从 0 到亿的实战经验。聚集品牌策略顾问、资深销售、市场数据分析和公关内容团队，建立"从创意到落地"的高效执行力矩阵。品牌发展需要长期陪伴与阶段性策略共同推动。',
    },
    {
      id: 'network',
      title: '行业纵深',
      enTitle: 'Industry Network',
      desc: 'YUAN SHOWROOM 覆盖全国乃至国际的销售与合作网络，连接超过 3000+ 买手店与百货渠道。既是海外品牌进入中国市场的门户，也是中国品牌出海的桥梁。YUAN SHOWROOM 不只是连接，更参与品牌在不同市场的落地全过程。',
    },
  ],
}

// ═══ Section 4: 6 Service Modules ═══
// Using proven existing images

export const services = [
  {
    id: '01',
    title: '时装周规划',
    enTitle: 'Runway Planning',
    desc: '主阵地位于上海，每年定期策划四场核心订货会（春夏/盛夏/秋冬/深冬），每季设定独立主题。精准邀约 1000+ 买手、博主与媒体资源，灵活设置全国 POP UP 展、私域预览等线下触点。',
    image: '/images/home/service-01.jpeg',
  },
  {
    id: '02',
    title: '运营管理',
    enTitle: 'Operations',
    desc: '专业品牌运营团队凭借深入的市场洞察和分析，为品牌提供精准定位服务，制定适配的运营方案和策略。覆盖设计开发建议、市场潜力调研、买手店调研到精准匹配买手渠道。',
    image: '/images/home/service-02.jpeg',
  },
  {
    id: '03',
    title: '发展策略',
    enTitle: 'Strategy',
    desc: '一站式品牌服务 — 品牌咨询、市场策略分析、品牌战略定位、设计开发、订货分销、新零售空间管理、新媒体运营和品牌投资，为海内外小众设计师品牌打造全方位专业支持体系。',
    image: '/images/home/service-03.jpeg',
  },
  {
    id: '04',
    title: '市场开拓',
    enTitle: 'Expansion',
    desc: '以品牌批发业务为核心驱动力，与全球 3000+ 精选买手店及知名百货商场建立稳固合作关系。专业渠道布局精准将品牌引入对标销售渠道，覆盖中国、亚洲、欧洲、北美、中东等主要时尚市场。',
    image: '/images/home/service-04.jpeg',
  },
  {
    id: '05',
    title: '渠道维护',
    enTitle: 'Channel Management',
    desc: '服务不止于初次市场进入，更包括持续的市场渗透和品牌影响力增强。精心维护合作伙伴关系，构筑品牌与买手之间的深度合作桥梁，优化品牌分销策略，实现业务扩展和销量增长。',
    image: '/images/home/service-05.jpeg',
  },
  {
    id: '06',
    title: '市场复盘',
    enTitle: 'Market Review',
    desc: '团队独立操盘数十个品牌实现从 0 到亿的飞跃。精通品牌成长全环节 — 从设计开发建议、市场潜力调研、买手店调研，到精准匹配客户、季度销售复盘，驱动品牌持续突破性成长。',
    image: '/images/home/service-06.jpeg',
  },
]

// ═══ Section 5: Brand Matrix + Channels ═══

export const brands = {
  title: '合作品牌与买手',
  subtitle: 'Brand Matrix',
  logoImages: Array.from({ length: 12 }, (_, i) =>
    `/images/home/brand-logos/image${75 + i}.jpeg`
  ),
  logos: [
    { name: 'SEAMEW', country: '中国', category: '服装', style: '当代艺术、极简克制' },
    { name: 'MAISON THER', country: '中国', category: '服装', style: '极简长期主义' },
    { name: 'PIÉTON ÉPISODE', country: '韩国', category: '鞋履', style: '自然质感、优雅精致' },
    { name: 'NHOJ', country: '香港', category: '服装', style: '结构美学、前卫简约' },
    { name: 'PLAYPLY', country: '中国', category: '服装', style: '自然织物、浪漫艺术' },
    { name: 'DATT', country: '越南', category: '服装', style: '现代古典、性格灵动、独特浪漫' },
    { name: 'YEESI', country: '纽约', category: '包袋', style: '极简主义、都市美学、精致高级' },
    { name: 'alwools', country: '中国', category: '服装', style: '艺术织物、个性现代、随性自由' },
    { name: 'TENSPHER', country: '中国', category: '服装', style: '女性力量、时装重构、解构设计、浪漫随性' },
    { name: 'REFOUND TEN', country: '中国', category: '服装', style: '自然松弛、轻松克制、从容细腻' },
    { name: 'NONETONE', country: '中国', category: '服装', style: '优雅清冷、古典知性、针织艺术' },
    { name: 'manzanilla', country: '中国', category: '服装', style: '简约日常' },
    { name: 'HELENKAMINSKI', country: '澳大利亚', category: '配饰', style: '自然奢华、经典优雅、可持续时尚、匠心工艺' },
    { name: 'Reindeer', country: '韩国', category: '配饰', style: '不规则线条、极简主义、自由慵懒' },
    { name: 'LUCIA TACCI', country: '中国', category: '鞋履', style: '精致鞋履' },
  ],
  buyers: [
    'SKP', '老佛爷 Galeries Lafayette', 'K11', '万象天地',
    'DOVER STREET MARKET', 'LABELHOOD', 'JOYCE', 'Lane Crawford',
    'Club21', 'HUG', '栋梁', 'B1ock', 'EMPTY', 'SND', 'SOLSOL',
  ],
}

// ═══ Section 6: Showroom + Seasons (merged) ═══

export const showroom = {
  title: '展厅 & 订货会',
  subtitle: 'Showroom & Runway',
  description: 'YUAN SHOWROOM 拥有 5000+㎡ 沉浸式展厅空间，每季设立符合当季的创意主题及视觉主题。整体时装周围绕当季主题展开布置，现场设置艺术打卡区域、咖啡服务、冷餐服务、酒水服务等，突破传统时装周单一订货的服务体系。',
  description2: 'YUAN SHOWROOM 希望把时尚、美学、商业、创意视觉及服务完整展示空间平衡，打造沉浸式、互动性、多维感官的时尚体验场，重构时尚产业的商业与艺术价值 — 从"展示"到"叙事"。',
  images: [
    { src: '/images/home/showroom-hero.jpeg', alt: 'YUAN SHOWROOM 展厅主图' },
    { src: '/images/home/showroom-grid-01.jpeg', alt: 'YUAN SHOWROOM 空间展示' },
    { src: '/images/home/showroom-grid-02.jpeg', alt: 'YUAN SHOWROOM 沉浸式体验' },
    { src: '/images/home/showroom-grid-03.jpeg', alt: 'YUAN SHOWROOM 订货会现场' },
    { src: '/images/home/showroom-grid-04.jpeg', alt: 'YUAN SHOWROOM 品牌陈列' },
  ],
}

export const seasons = [
  {
    season: '春夏订货会',
    time: '每年 9-10 月',
    city: '上海',
    venue: '上海时装周期间',
    brands: '50+',
    image: '/images/home/season-01.jpeg',
  },
  {
    season: '盛夏巡展',
    time: '每年 6-7 月',
    city: '多城市',
    venue: '全国 POP UP 巡展',
    brands: '30+',
    image: '/images/home/season-02.jpeg',
  },
  {
    season: '秋冬订货会',
    time: '每年 3-4 月',
    city: '上海',
    venue: '上海时装周期间',
    brands: '50+',
    image: '/images/home/season-03.jpeg',
  },
  {
    season: '深冬收官',
    time: '每年 12 月',
    city: '深圳',
    venue: '深圳 Showroom 展厅',
    brands: '20+',
    image: '/images/home/season-04.jpeg',
  },
]

// ═══ Section 7: Celebrity PR ═══

export const prStars = {
  title: '品牌服务 PLUS',
  subtitle: '明星 PR & 自媒体代运营',
  tag: 'Service PLUS',
  heroImage: '/images/home/plus-hero.jpeg',
  bannerImage: '/images/home/plus-banner.png',
  starImage: '/images/home/plus-star.png',
  wideBanner: '/images/home/plus-banner-wide.png',
  productImages: [
    '/images/home/plus-product-01.jpeg',
    '/images/home/plus-product-02.jpeg',
  ],
  intro: 'YUAN SHOWROOM 在艺人私服、杂志、节目综艺合作等领域拥有丰富资源，助力海内外品牌提供明星公关代运营服务，借助明星效应快速提升品牌曝光度及国民认知度，增强品牌在海内外的营销推广宣传。',
  intro2: 'YUAN SHOWROOM 同时为品牌提供中国地区自媒体代运营服务，从账号搭建、内容本土化、矩阵运营到销售转化的全托管服务，实现从 0 到 1 的品牌认知建设与用户资产沉淀。',
  overseas: [
    'Zendaya', 'Lisa', 'Jennie', 'Kendall Jenner',
    'Bella Hadid', 'Hailey Bieber', 'Selena Gomez', 'Anya Taylor',
    'rose', '金智媛', '车银优', '田征国', '金珉奎', '朴珪瑛', '裴秀智', '郑秀晶',
  ],
  mainland: [
    'Jackson Wang', '杨幂', '迪丽热巴', '赵露思', '舒淇', '倪妮',
    '汤唯', '戚薇', '虞书欣', '吴磊', '钟楚曦', '宋茜',
    '张凌赫', '奚梦瑶', '伊能静', '董洁', '吴昕', '秦海璐',
  ],
}

// ═══ Section 8: E-commerce + Retail ═══

export const omniChannel = {
  title: '全渠道能力',
  subtitle: '电商 & 零售代运营',
  tag: 'Omni-Channel',
  ecommerce: {
    title: '线上电商代运营',
    image: '/images/home/ecommerce.jpeg',
    desc: 'YUAN SHOWROOM 在中国主流电商平台拥有广泛的头部中腰部垂类明星博主资源，专业的电商运营团队扶持品牌开设天猫、淘宝、小红书、抖音等官方旗舰店，通过精准的分层营销策略，帮助品牌实现 B2B & B2K2C 闭环销售，实现从 0-1 搭建到自播账号稳定每月销售。',
    platforms: ['天猫旗舰店 + 官方直播间', '抖音旗舰店 + 官方直播间', '小红书旗舰店 + 内容种草', '短视频带货矩阵', '达人带货合作 & CPS 投放'],
  },
  retail: {
    title: '线下零售店代运营',
    image: '/images/home/retail.jpeg',
    desc: 'YUAN SHOWROOM 线下拥有中国各大商业体资源，与华润、K11 等商业体深度合作，为海内外品牌提供线下品牌零售店代运营服务，助力品牌在中国发展开店零售业务。',
  },
}

// ═══ Section 9: Intangible Asset Management ═══

export const intangibleAsset = {
  title: '无形资产管理',
  subtitle: 'Intangible Asset Management',
  tag: 'Asset Management',
  image: '/images/home/intangible-01.jpeg',
  bannerImage: '/images/home/intangible-banner.png',
  desc: 'YUAN SHOWROOM 通过财务分析、市场调查等方法评估品牌的市场价值和投资回报，管理和优化品牌的无形资产，提高品牌的市场竞争力、增加盈利能力和提升品牌整体价值。',
  highlights: [
    { title: '品牌价值评估', enTitle: 'Brand Value Assessment', desc: '财务分析与市场调查驱动的品牌估值体系' },
    { title: '竞争力提升', enTitle: 'Competitiveness Enhancement', desc: '多维度优化品牌市场地位与差异化优势' },
    { title: '金融资源支持', enTitle: 'Financial Support', desc: 'YUAN SHOWROOM 强大的金融背景为品牌提供资金与资源对接' },
    { title: '价值与盈利增长', enTitle: 'Value & Profit Growth', desc: '从品牌价值到商业回报的可持续增长路径' },
  ],
}

// ═══ Section 10: Brand Investment ═══

export const investment = {
  title: '品牌价值投资',
  subtitle: 'Strategic Brand Investment',
  tag: 'Investment',
  image: '/images/home/investment-hero.jpeg',
  bannerImage: '/images/home/investment-banner.png',
  desc: 'YUAN SHOWROOM 以强大的金融资源背景，为市场上有潜力的设计师品牌提供金融投资机会和运营支持，通过深度战略合作推动品牌从成长到成熟的全阶段价值释放。',
}

// ═══ Section 10: CTA ═══

export const cta = {
  bgImage: '/images/home/cta-bg.jpeg',
  quote: '我们相信，真正的品牌力量不在于一场"爆发"，而在于被持续记录、不断优化、逐渐累积的长期存在。',
  quoteEn: 'We believe that real brand power doesn\'t lie in a single moment of explosion, but in a long-term presence — recorded, refined, and steadily accumulated.',
  closing: 'YUAN SHOWROOM，是你成长轨迹的见证者，也是你信任的共创伙伴。',
  closingEn: 'YUAN SHOWROOM is here to witness your growth and to be your trusted partner in creation.',
  primary: { label: '预约 YUAN SHOWROOM 洽谈', href: '#contact' },
  secondary: { label: '品牌入驻 YUAN SHOWROOM 申请', href: '#contact' },
}

// ═══ Section 11: Contact ═══

export const contact = {
  emails: [
    { label: '品牌合作 / 媒体合作', value: 'heshiya@yuanshowroom.vip' },
    { label: '订货咨询', value: 'elson@yuanshowroom.vip' },
    { label: '招聘 / 求职', value: 'xukuanwei@yuanshowroom.vip' },
  ],
  address: '深圳市南山区绿景美景广场',
  hours: '10:00 — 19:00',
  weapp: {
    label: '品牌合作申请',
    qrImage: '/images/home/weapp-qr.png',
    description: '扫码填写合作信息',
    privacy: '本次填写的信息仅用于 YUAN SHOWROOM 品牌资质审核，不会泄露给任何第三方。',
  },
}
