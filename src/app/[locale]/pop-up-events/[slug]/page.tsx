import { notFound } from 'next/navigation'

import { EditorialDetail } from '@/components/showroom/editorial-projects'
import { EditorialDocumentPage } from '@/components/editorial-document'
import { popUpEvents } from '@/data/editorial'
import { pietonHugDocument } from '@/data/editorial-documents'
import { editorialMetadata } from '@/lib/editorial-metadata'
import { isLocale, locales, localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return locales.flatMap((locale) => popUpEvents.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params
  const project = popUpEvents.find((item) => item.slug === slug)
  if (!isLocale(locale) || !project) return {}
  return editorialMetadata(locale, `/pop-up-events/${slug}`, localize(project.title, locale), Boolean(project.isSample || project.contentPending))
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const project = popUpEvents.find((item) => item.slug === slug)
  if (!project) notFound()
  if (slug === pietonHugDocument.slug) {
    return <EditorialDocumentPage document={{ ...pietonHugDocument, backHref: localePath(locale, '/pop-up-events') }} showMasthead={false} />
  }
  return <EditorialDetail project={project} locale={locale} />
}
