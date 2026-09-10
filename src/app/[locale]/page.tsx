import { HomepageExperience } from '@/components/showroom/homepage-experience'
import { isLocale } from '@/lib/showroom-i18n'

export default async function LocaleCoverPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) return null

  return (
    <main className="showroom-cover">
      <HomepageExperience locale={locale} />
    </main>
  )
}
