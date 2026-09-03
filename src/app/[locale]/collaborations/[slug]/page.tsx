import { notFound } from 'next/navigation'

import { EditorialDetail } from '@/components/showroom/editorial-projects'
import { collaborations } from '@/data/editorial'
import { editorialMetadata } from '@/lib/editorial-metadata'
import { isLocale, locales, localize } from '@/lib/showroom-i18n'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return locales.flatMap((locale) => collaborations.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params
  const project = collaborations.find((item) => item.slug === slug)
  if (!isLocale(locale) || !project) return {}
  return editorialMetadata(locale, `/collaborations/${slug}`, localize(project.title, locale), Boolean(project.isSample))
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const project = collaborations.find((item) => item.slug === slug)
  if (!project) notFound()
  return <EditorialDetail project={project} locale={locale} />
}
