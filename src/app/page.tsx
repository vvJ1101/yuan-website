import { HeroSection, AboutSection, BSISection, ServicesSection, BrandsSection, ShowroomSection, PlusSection, CTASection, ContactSection } from '@/components/home'
import { SiteNavigation } from '@/components/home/site-navigation'
import { site } from '@/data/home'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation />

      {/* Sections — new order based on BrandBook */}
      <HeroSection />
      <AboutSection />
      <BSISection />
      <ServicesSection />
      <BrandsSection />
      <ShowroomSection />
      <PlusSection />
      <CTASection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-[0.72rem] text-neutral-400 font-light tracking-[0.08em]">
            {site.name} © {new Date().getFullYear()} — {site.footer}
          </p>
        </div>
      </footer>

    </main>
  )
}
