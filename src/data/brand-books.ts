const rohePages = Array.from(
  { length: 32 },
  (_, index) => ({
    src: `/images/showroom/brand-books/rohe/page-${String(index + 2).padStart(2, '0')}.webp`,
    width: 2665,
    height: 1786,
  }),
)

export const brandBooks = [
  {
    slug: 'rohe',
    name: 'RÓHE',
    pages: rohePages,
  },
] as const

export type BrandBook = (typeof brandBooks)[number]

export function getBrandBook(slug: string) {
  return brandBooks.find((book) => book.slug === slug)
}
