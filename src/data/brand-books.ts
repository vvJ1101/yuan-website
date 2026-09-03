const ranyepersonalPages = Array.from(
  { length: 32 },
  (_, index) => ({
    src: `/images/showroom/brand-books/ranyepersonal/page-${String(index + 2).padStart(2, '0')}.webp`,
    width: 2665,
    height: 1786,
  }),
)

const maisonTherPages = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/showroom/brand-books/maison-ther/page-${String(index + 1).padStart(2, '0')}.png`,
  width: 2250,
  height: 3000,
}))

const nhojPages = Array.from({ length: 7 }, (_, index) => ({
  src: `/images/showroom/brand-books/nhoj/page-${String(index + 1).padStart(2, '0')}.png`,
  width: 3000,
  height: 1687,
}))

export const brandBooks = [
  {
    slug: 'ranyepersonal',
    name: 'RANYEPERSONAL',
    pages: ranyepersonalPages,
  },
  {
    slug: 'maison-ther',
    name: 'MAISON THER',
    pages: maisonTherPages,
  },
  {
    slug: 'nhoj',
    name: 'NHOJ',
    pages: nhojPages,
  },
] as const

export type BrandBook = (typeof brandBooks)[number]

export function getBrandBook(slug: string) {
  return brandBooks.find((book) => book.slug === slug)
}
