const localEditorialImage = /^\/images\/(?:showroom|editorial)\/.+\.(?:avif|jpe?g|png|webp)(?:\?.*)?$/i

export function shouldBypassImageOptimization(src: string) {
  return localEditorialImage.test(src)
}
