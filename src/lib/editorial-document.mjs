const supportedModuleTypes = new Set([
  'cover', 'intro', 'full-image', 'text-image', 'image-pair', 'image-grid', 'statement', 'credits',
  'contents', 'editorial-split', 'floating-pair', 'founder-feature', 'text-columns',
  'values-split', 'collection-index', 'collection-campaign', 'maker-profile', 'name-gallery', 'press-list',
])

const imageModuleTypes = new Set(['cover', 'full-image', 'text-image', 'image-pair', 'image-grid', 'editorial-split', 'floating-pair', 'founder-feature', 'values-split', 'press-list'])
const typographySizes = new Set(['small', 'medium', 'large'])
const moduleWidths = new Set(['narrow', 'standard', 'wide', 'full'])
const imageRatios = new Set(['landscape', 'square', 'portrait'])

export function prepareEditorialDocument(document) {
  const ids = new Set()

  for (const contentModule of document.modules) {
    if (!supportedModuleTypes.has(contentModule.type)) {
      throw new Error(`Unknown editorial module type: ${contentModule.type}`)
    }
    if (ids.has(contentModule.id)) {
      throw new Error(`Duplicate editorial module id: ${contentModule.id}`)
    }
    ids.add(contentModule.id)

    if (contentModule.titleSize && !typographySizes.has(contentModule.titleSize)) {
      throw new Error(`Unsupported title size: ${contentModule.titleSize}`)
    }
    if (contentModule.bodySize && !typographySizes.has(contentModule.bodySize)) {
      throw new Error(`Unsupported body size: ${contentModule.bodySize}`)
    }
    if (contentModule.width && !moduleWidths.has(contentModule.width)) {
      throw new Error(`Unsupported module width: ${contentModule.width}`)
    }
    if (contentModule.imageRatio && !imageRatios.has(contentModule.imageRatio)) {
      throw new Error(`Unsupported image ratio: ${contentModule.imageRatio}`)
    }

    if (imageModuleTypes.has(contentModule.type)) {
      const images = contentModule.images ?? [contentModule.image, contentModule.featureImage, contentModule.secondaryImage].filter(Boolean)
      if (images.some((image) => !image) || images.length === 0) {
        throw new Error(`Editorial module ${contentModule.id} requires an image`)
      }
    }

    if (contentModule.type === 'collection-campaign' && contentModule.gridImages?.length !== 9) {
      throw new Error(`Editorial module ${contentModule.id} requires exactly 9 grid images`)
    }

    if (contentModule.type === 'maker-profile' && contentModule.processImages?.length !== 3) {
      throw new Error(`Editorial module ${contentModule.id} requires exactly 3 process images`)
    }
  }

  return document
}
