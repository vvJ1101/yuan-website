const ranyepersonalPages = Array.from(
  { length: 32 },
  (_, index) => ({
    src: `/images/showroom/brand-books/ranyepersonal/page-${String(index + 2).padStart(2, '0')}.webp`,
    width: 2665,
    height: 1786,
  }),
)

export const brandBooks = [
  {
    slug: 'ranyepersonal',
    name: 'RANYEPERSONAL',
    pages: ranyepersonalPages,
  },
] as const

export type BrandBook = (typeof brandBooks)[number]

export function getBrandBook(slug: string) {
  return brandBooks.find((book) => book.slug === slug)
}
