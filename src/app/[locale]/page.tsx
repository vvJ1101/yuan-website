import { HomepageExperience } from '@/components/showroom/homepage-experience'
import type { Locale } from '@/types/showroom'

export default async function LocaleCoverPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return (
    <main className="showroom-cover">
      <h1 className="sr-only">YUAN SHOWROOM</h1>
      <HomepageExperience locale={locale} />
    </main>
  )
}
