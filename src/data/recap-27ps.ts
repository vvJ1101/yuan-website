import type { LocalizedText } from '@/types/showroom'

export interface RecapBrandChapter {
  id: string
  name: string
  group: 'Ready to wear' | 'Footwear' | 'Kaicos By Yuan'
  isNew?: boolean
  note: LocalizedText
  images: string[]
}

// This season's roster and image assignments follow the supplied 27PS archive.
// Positioning follows existing site copy where available; other notes describe the supplied presentation.
const chapter = (id: string, name: string, group: RecapBrandChapter['group'], cn: string, en: string, isNew = false): RecapBrandChapter => ({
  id, name, group, isNew, note: { cn, en },
  images: [1, 2, 3].map(n => `/images/showroom/recap/27ps/${id}-${n}.webp`),
})

export const recap27psBrands = [
  chapter('alwools', 'alwools', 'Ready to wear', 'ALWOOLS 专注于羊毛与天然材质的当代表达，以松弛比例和细腻触感构建兼具温度与个性的日常衣橱。', 'ALWOOLS reimagines wool and natural materials through relaxed proportions and tactile refinement, building an everyday wardrobe with warmth and character.'),
  chapter('playaply', 'PLAYAPLY', 'Ready to wear', 'PLAYAPLY 以自然面料与轻盈结构承载柔软而清醒的女性气质，在日常穿着中保留自由的想象空间。', 'PLAYAPLY pairs natural fabrics with light construction, creating a soft yet clear-minded femininity and leaving room for freedom in everyday dress.'),
  chapter('maison-ther', 'MAISON THER', 'Ready to wear', '从「THEIR」中隐去「I」，MAISON THER 将视线投向女性之间的共同感受。经得起时间的衣物，在温和的色彩与日常穿着中构建共鸣。', 'By removing the “I” from “THEIR”, MAISON THER turns towards a shared experience of womanhood. An enduring wardrobe finds its expression in quiet colours and everyday dressing.'),
  chapter('tenspher', 'TENSPHER', 'Ready to wear', 'TENSPHER 从女性力量出发，以重构剪裁和流动细节平衡锋利与浪漫，呈现不被定义的时装表达。', 'TENSPHER starts from feminine strength, balancing sharp reconstructed tailoring with fluid details for fashion that resists definition.'),
  chapter('nhoj', 'NHOJ', 'Ready to wear', '结构美学在鲜明的红色与清晰的轮廓之间显现。成组的衣物与木质标识形成对照，让色彩成为空间中的视觉重心。', 'Structural expression emerges through vivid red and defined silhouettes. Grouped garments contrast with a wooden brand sign, making colour the visual centre of the space.'),
  chapter('ranyepersonal', 'ranyepersonal', 'Ready to wear', 'RANYEPERSONAL 以利落廓形和克制细节描绘当代女性的独立姿态，在日常与仪式感之间建立从容的着装语言。', 'RANYEPERSONAL frames the independent contemporary woman through precise silhouettes and restrained details, balancing everyday ease with a sense of occasion.', true),
  chapter('4mile', '4mile', 'Ready to wear', '4MILE 以极简视角观察都市日常，在克制色彩与清晰轮廓中延展舒适、自由的当代风格。', '4MILE observes urban everyday life through a minimalist lens, extending a comfortable, free contemporary style through restrained colour and clear form.'),
  chapter('yifulu', 'YIFULU', 'Ready to wear', '本季新加入的 YIFULU，将成衣、书刊与陈列物件组合成一个完整场景。由局部到全景，细节在简洁的空间中逐一展开。', 'New this season, YIFULU brings clothing, publications and objects into a single setting. Details unfold from close-up views to the wider room.', true),
  chapter('seamew', 'SEAMEW', 'Ready to wear', '流苏、织物与配饰细节构成丰富的触感线索。成衣与日常家具相邻，让系列在一个可停留的场景中被观看。', 'Fringe, fabric and accessories offer a textured reading of the collection. Clothing sits alongside everyday furniture, inviting a closer, slower look.'),
  chapter('pieton', 'PIÉTON ÉPISODE', 'Footwear', 'PIÉTON ÉPISODE 将步行中的观察转化为鞋履语言，以自然质感、舒适脚感与细节工艺勾勒优雅日常。', 'PIÉTON ÉPISODE translates observations from walking into footwear, defining elegant everyday life with natural texture, comfort, and crafted detail.'),
  chapter('lucia-tacci', 'LUCIA TACCI', 'Footwear', 'LUCIA TACCI 以简洁而精确的线条塑造现代鞋履，在实穿性与精致感之间寻找恰当平衡。', 'LUCIA TACCI shapes contemporary footwear with clean, exacting lines, finding the right balance between wearability and refinement.'),
  chapter('liyihan', 'LIYIHAN', 'Kaicos By Yuan', '作为本季新加入的品牌，LIYIHAN 以浅色成衣和木质展具构成轻盈场景。衣物、书刊与绿植之间保留自然的间隔。', 'Joining this season, LIYIHAN pairs light-toned clothing with wooden fixtures. Garments, publications and greenery are given an unhurried spacing.', true),
  chapter('veilen', 'VEILEN', 'Kaicos By Yuan', '本季新加入的 VEILEN，以明亮空间承接衣物与家具。由入口标识到室内陈列，品牌形象在简洁的场景中逐渐展开。', 'New this season, VEILEN presents clothing and furniture in a light-filled setting. From the entrance sign to the interior display, the brand unfolds through a pared-back space.', true),
]

export const recap27psIntroduction: LocalizedText[] = [
  { cn: '几何的线条、对称的秩序与温润的金色，是装饰艺术留下的回声。Echoes of Deco 以此为起点，让经典美学与当代衣着在同一空间相遇。', en: 'Geometric lines, symmetry and the warmth of gold leave an echo of Art Deco. Echoes of Deco takes these elements as a starting point, bringing classical aesthetics into conversation with contemporary clothing.' },
  { cn: '这一季，我们从织物、廓形到鞋履与细节，记录不同品牌对新季的表达。随着视线穿过陈列，灵感由图像落入真实的衣物，也延伸至人与空间的交流。', en: 'This season moves through textiles, silhouettes, footwear and details, tracing each brand’s expression of the new collection. Across the showroom, ideas move from images into garments and into the encounters around them.' },
]
