export const companyBrandBook = {
  slug: 'yuan-showroom',
  name: 'YUAN SHOWROOM',
  pages: Array.from({ length: 24 }, (_, index) => ({
    src: `/images/showroom/company-brand-book/page-${String(index + 2).padStart(2, '0')}.webp`,
    width: 1536,
    height: 2048,
  })),
} as const
