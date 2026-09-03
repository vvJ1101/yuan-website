import type { LookbookItem, LookbookProduct } from '../types/showroom'

export function resolveLookProducts(look: LookbookItem, catalog: readonly LookbookProduct[] = []): LookbookProduct[] {
  const products = new Map(catalog.map(product => [product.id, product]))
  return [...new Set(look.productIds ?? [])].flatMap(id => {
    const product = products.get(id)
    return product?.image.trim() ? [product] : []
  })
}
