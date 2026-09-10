import type { EditorialDocument, EditorialImage } from '@/components/editorial-document'

const image = (src: string, alt: string, width: number, height: number, objectPosition?: string): EditorialImage => ({ src, alt, width, height, objectPosition })

const pop = {
  hero: image('/images/editorial/events/helen-reference-1.webp', 'The HELEN KAMINSKI event space framed by trees', 1520, 5611, 'center 24%'),
  building: image('/images/editorial/events/helen-nanjing-building.webp', 'HELEN KAMINSKI campaign on a building facade in Nanjing', 1080, 2954),
  collage: image('/images/editorial/events/helen-product-collage.webp', 'Raffia hats and wooden display plinths', 1080, 2068),
  space: image('/images/editorial/events/helen-raffia-space.webp', 'Raffia walls and hat displays in the exhibition space', 1080, 1634),
  display: image('/images/editorial/events/helen-hat-display.webp', 'Hats, scarves and woven bags on display', 1080, 1634),
  hats: image('/images/editorial/events/helen-raffia-hats.webp', 'Raffia hats in natural light', 1080, 1634),
  craft: image('/images/editorial/events/helen-craft-making.webp', 'Garry making miniature raffia hats at the event', 1080, 1640),
}

const collab = {
  hero: image('/images/editorial/collaborations/sophie-space-wide.jpg', 'Garment display and reading table in a muted blue interior', 2400, 1600),
  courtyard: image('/images/editorial/collaborations/casa-courtyard-portrait.jpg', 'Courtyard entrance beneath a concrete grid', 1602, 2400),
  space: image('/images/editorial/collaborations/sophie-06.webp', 'Fashion display, table and pale blue tiled interior', 1800, 1200),
  moving: image('/images/editorial/collaborations/sophie-01.webp', 'Moving figure and suspended garment within the interior', 1200, 1800),
  white: image('/images/editorial/collaborations/sophie-03.webp', 'White garment displayed against pale blue tiles', 1200, 1800),
  studio: image('/images/editorial/collaborations/sophie-08.webp', 'Studio interior with furniture and suspended garments', 1200, 1800),
  symmetry: image('/images/editorial/collaborations/sophie-09.webp', 'Symmetrical display of black and white garments', 1800, 1200),
}

const pietonPath = '/images/editorial/events/pieton-hug'
const pieton = {
  hero: image(`${pietonPath}/facade-cover-wide.png`, 'PIETON × HUG SHAPED BY TIME 建筑立面', 1672, 941),
  inspiration: [
    image(`${pietonPath}/p07-01-382x453.webp`, '砂砾与垂直构件形成的装置灵感', 382, 453),
    image(`${pietonPath}/p07-02-340x454.webp`, '重复堆叠的石材雕塑', 340, 454),
    image(`${pietonPath}/p07-03-526x400.webp`, '自然堆积的砂石形态', 526, 400),
    image(`${pietonPath}/p07-04-736x491.webp`, '极简展陈空间中的重复结构', 736, 491),
  ] as const,
  chengduDisplay: image(`${pietonPath}/chengdu-display.webp`, '成都空间黑色金属陈列区域', 1531, 813, 'left center'),
  chengduInstallation: image(`${pietonPath}/chengdu-installation.webp`, '成都空间砂砾与天然石材装置', 1460, 744),
  shenzhenWindow: image(`${pietonPath}/shenzhen-window.webp`, '深圳空间橱窗与入口装置', 1274, 970),
  shenzhenLightbox: image(`${pietonPath}/shenzhen-lightbox.webp`, '深圳空间灯箱广告效果', 1477, 709),
  posters: [
    image(`${pietonPath}/poster-one.webp`, '实验性手写字体海报参考', 457, 530),
    image(`${pietonPath}/poster-two.webp`, '雕塑感图形海报参考', 736, 920),
  ] as const,
  flowers: [
    image(`${pietonPath}/p25-01-256x315.webp`, '绿色与石材结合的花艺', 256, 315),
    image(`${pietonPath}/p25-02-256x341.webp`, '暗红色果实花艺', 256, 341),
    image(`${pietonPath}/p25-03-256x320.webp`, '浅棕色自然花艺', 256, 320),
    image(`${pietonPath}/p25-04-256x341.webp`, '干燥植物雕塑花艺', 256, 341),
    image(`${pietonPath}/p25-05-256x307.webp`, '荒漠质感花艺造型', 256, 307),
    image(`${pietonPath}/p25-06-256x318.webp`, '低饱和度自然花艺', 256, 318),
  ],
  catering: [
    image(`${pietonPath}/p26-01-256x319.webp`, '石与砂砾主题餐饮陈列', 256, 319),
    image(`${pietonPath}/p26-02-256x319.webp`, '自然材质主题甜品', 256, 319),
    image(`${pietonPath}/p26-03-256x384.webp`, '石材纹理餐饮造型', 256, 384),
    image(`${pietonPath}/p26-04-256x454.webp`, '浅色自然餐饮陈列', 256, 454),
    image(`${pietonPath}/p26-05-256x286.webp`, '黑色主题甜品陈列', 256, 286),
    image(`${pietonPath}/p26-06-256x355.webp`, '黑色巧克力与莓果甜品', 256, 355),
  ],
  bestSellers: Array.from({ length: 9 }, (_, index) => image(
    `${pietonPath}/p28-${String(index + 1).padStart(2, '0')}-283x340.webp`,
    `PIETON 人气鞋履款式 ${index + 1}`,
    283,
    340,
  )),
  blueEdition: image(`${pietonPath}/blue-edition.webp`, 'PIETON × HUG 蓝色限定鞋履', 736, 552),
  workshop: [
    image(`${pietonPath}/p32-01-717x538.webp`, '皮革钥匙扣工作坊材料与工具', 717, 538),
    image(`${pietonPath}/p32-02-396x301.webp`, '皮革挂件细节', 396, 301),
    image(`${pietonPath}/p32-03-430x537.webp`, '组合完成的皮革钥匙扣', 430, 537),
  ] as [EditorialImage, EditorialImage, EditorialImage],
  gift: image(`${pietonPath}/p33-01-396x529.webp`, 'PIETON 限定礼赠包装', 396, 529),
  giftDetail: image(`${pietonPath}/p33-02-396x529.webp`, '意大利皮革梳套与品牌梳', 396, 529),
}

export const popUpDocument: EditorialDocument = {
  slug: 'sample-showroom-edit',
  category: 'POP-UP EVENTS',
  title: 'HELEN KAMINSKI A JOURNEY OF CRAFT IN CHINA',
  archiveLabel: 'DESIGN PREVIEW / TEMPORARY IMAGES AND COPY, NOT AN EVENT ANNOUNCEMENT',
  backHref: '/en/pop-up-events',
  modules: [
    { type: 'full-image', id: 'event-opening', image: pop.hero },
    {
      type: 'editorial-split', id: 'event-introduction', title: 'A journey of craft in China', image: pop.collage,
      body: ['From a raffia seed to a signature hat. Step into the world of HELEN KAMINSKI, where natural materials, considered spaces and the art of making come together.'],
    },
    {
      type: 'founder-feature', id: 'nanjing', title: 'Nanjing / Inspired by nature', featureImage: pop.building, secondaryImage: pop.collage,
      body: ['A space for an encounter with nature in the city. Raffia textures, soft tones and a layered display of hats express the brand’s approach to craft. From familiar silhouettes to seasonal pieces, discover the texture of the materials and the detail within every weave.'],
    },
    {
      type: 'collection-index', id: 'nanjing-details', title: 'Material and silhouette',
      collections: [{ label: 'Raffia hats', image: pop.collage }, { label: 'Woven accessories', image: { ...pop.collage, alt: 'Woven bags and accessories', objectPosition: 'center 58%' } }, { label: 'Hat silhouettes', image: { ...pop.collage, alt: 'A display of different hat silhouettes', objectPosition: 'center 34%' } }, { label: 'Material details', image: { ...pop.collage, alt: 'Details of raffia hats', objectPosition: 'center 78%' } }],
    },
    {
      type: 'editorial-split', id: 'chengdu', title: 'Chengdu / A journey into raffia', imageSide: 'right', image: pop.space,
      body: ['With natural raffia and handcraft as its starting point, the exhibition explores materials, inherited techniques and a more considered approach to making.'],
    },
    { type: 'floating-pair', id: 'chengdu-details', images: [pop.display, pop.hats] },
    {
      type: 'editorial-split', id: 'craft', title: 'The hands behind the craft', image: pop.craft,
      body: ['Through Garry’s demonstration, weaving becomes more than a texture on a finished piece: it is a process to observe, understand and experience. From preparing the material to shaping a hat, small and patient gestures reveal the human care behind the craft.'],
      quote: 'Drawn from nature, shaped by time and hands.',
    },
    { type: 'text-columns', id: 'closing', columns: [{ title: 'Closer to nature.', body: ['Closer to the craft.'] }] },
  ],
}

export const pietonHugDocument: EditorialDocument = {
  slug: 'sample-next-season',
  category: 'POP-UP EVENTS',
  title: 'PIETON × HUG — SHAPED BY TIME',
  archiveLabel: 'SEOUL BASED HANDMADE FOOTWEAR / CHENGDU + SHENZHEN / 2026',
  backHref: '/en/pop-up-events',
  modules: [
    {
      type: 'cover',
      id: 'opening',
      image: pieton.hero,
      title: 'SHAPED BY TIME',
      subtitle: 'PIETON × HUG POP-UP',
      titleSize: 'medium',
      bodySize: 'small',
      width: 'full',
    },
    {
      type: 'intro',
      id: 'brand-introduction',
      heading: 'SEOUL BASED HANDMADE FOOTWEAR',
      body: [
        'PIETON 是一个来自首尔的手工鞋履品牌。品牌从城市女性的日常与建筑结构中寻找灵感，以原创鞋楦、克制廓形和材料质感，塑造能够跨越时间的设计。',
        '这次与成都 HUG 的合作从材料与形态出发，将鞋履、空间和体验连成一段可被进入的品牌叙事。',
      ],
      align: 'center',
      titleSize: 'small',
      bodySize: 'small',
      width: 'narrow',
    },
    {
      type: 'image-grid',
      id: 'material-inspiration',
      images: [...pieton.inspiration],
      columns: 2,
      imageRatio: 'landscape',
      width: 'standard',
    },
    {
      type: 'statement',
      id: 'concept',
      heading: '石头被磨平，砂砾不断堆积，皮革留下使用的痕迹。',
      body: '形态从来不是一次完成，而是在重复、累积与时间中被逐渐塑造。SHAPED BY TIME 将这一过程带入空间，让材料本身成为体验的主角。',
      titleSize: 'medium',
      bodySize: 'small',
      width: 'narrow',
    },
    {
      type: 'text-image',
      id: 'chengdu-space',
      heading: 'CHENGDU / MATERIAL IN REPETITION',
      body: [
        '天然石材与黑色金属形成冷静而富有张力的对照。重复出现的雕塑陈列台将鞋履视作独立对象，让观看在秩序与差异之间发生。',
        '砂砾、天然石与深色展台延续到橱窗及体验区域，构成一条从城市界面进入材料内部的路径。',
      ],
      image: pieton.chengduDisplay,
      tone: 'mist',
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'image-pair',
      id: 'two-cities',
      images: [pieton.chengduInstallation, pieton.shenzhenWindow],
      ratio: 'landscape-lead',
      width: 'standard',
    },
    {
      type: 'text-image',
      id: 'shenzhen-space',
      heading: 'SHENZHEN / A QUIET URBAN FACADE',
      body: [
        '在深圳万象天地，橱窗装置、灯箱影像与产品陈列共同形成更开放的城市界面。低饱和材质和清晰光线让鞋履从背景中浮现，同时保留 HUG 原有空间的克制气质。',
      ],
      image: pieton.shenzhenLightbox,
      imageSide: 'right',
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'founder-feature',
      id: 'visual-direction',
      title: 'VISUAL DIRECTION',
      body: [
        '视觉以雕塑性、实验性手写字体与艺术展览式留白为方向。海报不只是信息载体，也像空间中的另一件作品。',
        '花艺选用绿色、酒红与浅棕色，结合果实、干燥植物与粗粝表面，让自然质感融入陈列结构。',
      ],
      featureImage: pieton.posters[1],
      secondaryImage: pieton.posters[0],
      imageSide: 'left',
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'name-gallery',
      id: 'atmosphere',
      title: 'ATMOSPHERE',
      names: ['GREEN', 'BURGUNDY', 'PALE BROWN', 'STONE', 'SAND', 'BLACK'],
      images: [
        pieton.flowers[0],
        pieton.flowers[2],
        pieton.flowers[4],
        pieton.flowers[5],
        pieton.catering[0],
        pieton.catering[4],
      ],
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'collection-campaign',
      id: 'product-curation',
      title: 'PIETON BEST SELLERS / HUG EXCLUSIVE BLUE EDITION',
      body: '以 PIETON 最具代表性的鞋款建立产品核心，并为 HUG 选择经典款式制作活动限定蓝色版本。熟悉的轮廓因颜色与材料关系获得新的表情。',
      leadImage: pieton.blueEdition,
      gridImages: pieton.bestSellers as EditorialImage[] as [EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage],
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'maker-profile',
      id: 'leather-workshop',
      title: 'TOUCH / SELECT / COMBINE',
      body: [
        '皮革钥匙扣工作坊把材料体验带到现场。参与者可以触摸不同皮革，选择颜色与挂件，再亲手组合成属于自己的随身物件。',
        '工作坊延续 PIETON 对材料、触感和手工过程的关注，让产品之外的时间也被真实留下。',
      ],
      quote: 'Material becomes personal through touch and time.',
      processImages: pieton.workshop,
      featureImage: pieton.gift,
      imageSide: 'left',
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
    {
      type: 'press-list',
      id: 'exclusive-gift',
      title: 'EXCLUSIVE GIFT WITH PURCHASE',
      image: pieton.giftDetail,
      links: [
        { label: '意大利皮革梳套' },
        { label: 'PIETON 品牌梳' },
        { label: '活动限定礼盒' },
      ],
      titleSize: 'small',
      bodySize: 'small',
      width: 'narrow',
    },
    {
      type: 'collection-index',
      id: 'closing-index',
      title: 'SHAPED BY TIME / INDEX',
      collections: [
        { label: 'MATERIAL', image: pieton.flowers[0] },
        { label: 'FORM', image: pieton.bestSellers[2] },
        { label: 'TOUCH', image: pieton.workshop[2] },
        { label: 'TIME', image: pieton.giftDetail },
      ],
      titleSize: 'small',
      bodySize: 'small',
      width: 'standard',
    },
  ],
}

export const collaborationDocument: EditorialDocument = {
  slug: 'sample-fashion',
  category: 'COLLABORATIONS',
  title: 'THE QUIET INTERVAL',
  archiveLabel: 'YUAN SHOWROOM × AERENNE / FASHION / 2026 / SAMPLE PROJECT',
  backHref: '/en/collaborations',
  modules: [
    { type: 'full-image', id: 'project-opening', image: collab.hero },
    {
      type: 'editorial-split', id: 'project-introduction', title: 'A meeting of space and silhouette', image: collab.courtyard,
      body: ['A sample story used to test editorial rhythm. Space, material and fashion imagery form a sequence that can later be replaced block by block with real collaboration content.'],
    },
    {
      type: 'founder-feature', id: 'space-story', title: 'Space becomes part of the conversation', featureImage: collab.space, secondaryImage: collab.moving, imageSide: 'left',
      body: ['Structure, light and negative space are more than a backdrop; they shape how the work is seen and paced.'],
    },
    { type: 'floating-pair', id: 'silhouette-pair', images: [collab.white, collab.studio] },
    {
      type: 'collection-index', id: 'image-stream', title: 'Space and silhouette',
      collections: [{ label: 'Interior', image: collab.space }, { label: 'Movement', image: collab.moving }, { label: 'Garment', image: collab.white }, { label: 'Symmetry', image: collab.symmetry }],
    },
    {
      type: 'press-list', id: 'credits', title: 'Credits', image: collab.symmetry,
      links: [{ label: 'Temporary preview imagery supplied as design references.' }, { label: 'Confirm image rights and credits before final publication.' }, { label: 'Collaboration WeChat QR code to be supplied.' }],
    },
  ],
}
