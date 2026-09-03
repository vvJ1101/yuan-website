import type { LookbookProduct } from '@/types/showroom'

// One-off user-approved visual previews. No AI extraction runs in the website.
const previewDescription = {
  cn: 'AI 根据造型图重建的白底示意素材，仅用于预览搭配界面；细节可能与实物不同，后续将替换为真实产品摄影。',
  en: 'AI-reconstructed packshot for styling-interface preview only. Details may differ from the actual item. To be replaced with genuine product photography.',
}

export const ranyePreviewProducts: readonly LookbookProduct[] = [
  { id: 'ranye-dress-preview', image: '/images/showroom/now/lookbook/products/ranye-dress-ai-preview.webp', category: 'dress', name: { cn: '黑色裙装 · AI 示意', en: 'Black mini dress · AI preview' }, description: previewDescription },
  { id: 'ranye-shoes-preview', image: '/images/showroom/now/lookbook/products/ranye-shoes-ai-preview.webp', category: 'shoes', name: { cn: '晶饰鞋履 · AI 示意', en: 'Embellished shoes · AI preview' }, description: previewDescription },
  { id: 'ranye-headpiece-preview', image: '/images/showroom/now/lookbook/products/ranye-headpiece-ai-preview.webp', category: 'accessory', name: { cn: '晶饰头饰 · AI 示意', en: 'Crystal headpiece · AI preview' }, description: previewDescription },
]
