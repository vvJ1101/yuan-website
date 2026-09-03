import { notFound } from 'next/navigation'

import { EditorialIndex } from '@/components/showroom/editorial-projects'
import { collaborations, collaborationCategories } from '@/data/editorial'
import { editorialMetadata } from '@/lib/editorial-metadata'
import { isLocale } from '@/lib/showroom-i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return editorialMetadata(locale, '/collaborations', 'COLLABORATIONS', collaborations.every((project) => project.isSample))
}

export default async function Page({ params, searchParams }: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { category } = await searchParams
  return <EditorialIndex locale={locale} section="collaborations" projects={collaborations} categories={collaborationCategories} category={typeof category === 'string' ? category : undefined} />
}
