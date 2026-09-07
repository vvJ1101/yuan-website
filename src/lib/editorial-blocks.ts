import type { LocalizedText } from '../types/showroom'
import type { StoryBlock, StoryImage } from '../types/editorial'

const validBlockTypes = new Set<StoryBlock['type']>([
  'hero', 'text', 'imageText', 'offsetPair', 'detailStrip', 'montage', 'video', 'statement', 'credits',
])

function validateLocalizedText(value: LocalizedText | undefined, label: string) {
  if (!value?.cn.trim() || !value.en.trim()) throw new Error(`${label} requires Chinese and English text`)
}

function validateImage(image: StoryImage, label: string) {
  validateLocalizedText(image.alt, `${label} alt`)
  const [width, height] = image.ratio.split('/').map(Number)
  if (!(width > 0) || !(height > 0)) throw new Error(`${label} has an invalid ratio`)
  if (!image.src.startsWith('/')) throw new Error(`${label} has an invalid source`)
  if (image.temporary && (!image.sourceLabel || !image.sourcePath || image.replacementStatus !== 'pending')) {
    throw new Error(`${label} requires temporary provenance`)
  }
}

export function validateStoryBlocks(blocks: readonly StoryBlock[]): readonly StoryBlock[] {
  const ids = new Set<string>()
  for (const block of blocks) {
    if (!block.id.trim()) throw new Error('Story block ID cannot be empty')
    if (ids.has(block.id)) throw new Error(`Duplicate story block ID: ${block.id}`)
    ids.add(block.id)
    if (!validBlockTypes.has(block.type)) throw new Error(`Unsupported story block type: ${String(block.type)}`)

    if (block.type === 'hero' || block.type === 'imageText') validateImage(block.image, block.id)
    if (block.type === 'offsetPair') {
      if (block.images.length !== 2) throw new Error(`${block.id} requires exactly two images`)
      block.images.forEach((image, index) => validateImage(image, `${block.id} image ${index + 1}`))
    }
    if (block.type === 'detailStrip' || block.type === 'montage') {
      if (block.images.length < 2) throw new Error(`${block.id} requires at least two images`)
      block.images.forEach((image, index) => validateImage(image, `${block.id} image ${index + 1}`))
    }
    if (block.type === 'video') validateImage(block.video.poster, `${block.id} poster`)
  }
  return blocks
}
