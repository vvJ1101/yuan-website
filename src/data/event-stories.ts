import type { EditorialImage } from '../types/editorial'
import type { LocalizedText } from '../types/showroom'

// Temporary screenshot windows only. Replace each entry with an original image
// and remove crop; article layout and copy remain independent of these assets.
export interface StoryImage extends EditorialImage {
  crop?: { left: number; top: number; width: number; height: number }
}

interface StoryChapter {
  id: string
  title: LocalizedText
  paragraphs: readonly LocalizedText[]
  image: StoryImage
  layout: 'wide' | 'portrait'
  gallery?: readonly StoryImage[]
}

export interface EventStory {
  intro: LocalizedText
  hero: StoryImage
  chapters: readonly StoryChapter[]
  closing: LocalizedText
}

function windowImage(file: number | string, sourceWidth: number, sourceHeight: number, x: number, y: number, width: number, height: number, cn: string, en: string): StoryImage {
  return {
    src: `/images/editorial/events/helen-${typeof file === 'number' ? `reference-${file}` : file}.webp`,
    ratio: `${sourceWidth} / ${sourceHeight}`,
    alt: { cn, en },
    crop: { left: x / sourceWidth, top: y / sourceHeight, width: width / sourceWidth, height: height / sourceHeight },
  }
}

export const eventStories: Readonly<Record<string, EventStory>> = {
  'sample-showroom-edit': {
    intro: {
      cn: '从一粒拉菲草种子，到一顶经典帽饰。跟随 HELEN KAMINSKI，走进自然与手工艺交织的世界，探索材料、空间与匠心之间的联系。',
      en: 'From a raffia seed to a signature hat. Step into the world of HELEN KAMINSKI, where natural materials, considered spaces and the art of making come together.',
    },
    hero: windowImage(1, 555, 2048, 51, 293, 457, 253, '树木环绕的 HELEN KAMINSKI 活动空间外观', 'The HELEN KAMINSKI event space framed by trees'),
    chapters: [
      {
        id: 'nanjing', layout: 'portrait',
        title: { cn: '南京 · 感受匠心与自然的灵感', en: 'Nanjing · Inspired by nature' },
        paragraphs: [
          { cn: '在城市之中，留出一处与自然相遇的空间。草编材质、柔和色调与层次丰富的帽饰陈列，共同呈现品牌的手作语言。', en: 'A space for an encounter with nature in the city. Raffia textures, soft tones and a layered display of hats express the brand’s approach to craft.' },
          { cn: '从经典款式到当季作品，近距离感受材料的纹理，以及每一道编织留下的细节。', en: 'From familiar silhouettes to seasonal pieces, discover the texture of the materials and the detail within every weave.' },
        ],
        image: windowImage('nanjing-building', 1080, 2954, 0, 1420, 1080, 1368, '南京建筑外立面的 HELEN KAMINSKI 品牌广告', 'HELEN KAMINSKI campaign on a building facade in Nanjing'),
        gallery: [
          windowImage('product-collage', 1080, 2068, 132, 136, 389, 520, '草帽与木质陈列台', 'Raffia hats and wooden display plinths'),
          windowImage('product-collage', 1080, 2068, 558, 136, 388, 520, '不同造型的帽饰陈列', 'A display of different hat silhouettes'),
          windowImage('product-collage', 1080, 2068, 132, 708, 389, 520, '草编包袋与配饰', 'Woven bags and accessories'),
          windowImage('product-collage', 1080, 2068, 565, 720, 381, 508, '拉菲草帽的编织细节', 'Details of raffia hats'),
        ],
      },
      {
        id: 'chengdu', layout: 'wide',
        title: { cn: '成都 · 探秘拉菲草的匠心之旅', en: 'Chengdu · A journey into raffia' },
        paragraphs: [
          { cn: '以天然拉菲草与手工匠艺为线索，展览空间通过一件件静静陈列的作品，呈现品牌对自然材质、手工传承与可持续理念的探索。', en: 'With natural raffia and handcraft as its starting point, the exhibition explores materials, inherited techniques and a more considered approach to making.' },
        ],
        image: { src: '/images/editorial/events/helen-raffia-space.webp', ratio: '1080 / 1634', alt: { cn: '拉菲草墙面与帽饰展览空间', en: 'Raffia walls and hat displays in the exhibition space' } },
        gallery: [
          { src: '/images/editorial/events/helen-hat-display.webp', ratio: '1080 / 1634', alt: { cn: '帽饰、丝巾与草编包袋陈列', en: 'Hats, scarves and woven bags on display' } },
          { src: '/images/editorial/events/helen-raffia-hats.webp', ratio: '1080 / 1634', alt: { cn: '自然光下的拉菲草帽', en: 'Raffia hats in natural light' } },
        ],
      },
      {
        id: 'craft', layout: 'portrait',
        title: { cn: '一顶帽子背后的手工温度', en: 'The hands behind the craft' },
        paragraphs: [
          { cn: '在工匠 Garry 的演示中，编织不再只是成品上的纹理，而成为可以被观看、理解与感受的过程。', en: 'Through Garry’s demonstration, weaving becomes more than a texture on a finished piece: it is a process to observe, understand and experience.' },
          { cn: '从材料的整理到帽饰的成形，细小而耐心的动作，让手工艺的温度得以传递。', en: 'From preparing the material to shaping a hat, small and patient gestures reveal the human care behind the craft.' },
        ],
        image: { src: '/images/editorial/events/helen-craft-making.webp', ratio: '1080 / 1640', alt: { cn: '工匠 Garry 在现场制作迷你草帽', en: 'Garry making miniature raffia hats at the event' } },
      },
    ],
    closing: { cn: '走进自然，走近匠心。', en: 'Closer to nature. Closer to the craft.' },
  },
}
