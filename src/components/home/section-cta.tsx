import { cta } from '@/data/home'
import Link from 'next/link'
import Image from 'next/image'

export function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={cta.bgImage}
          alt="YUAN SHOWROOM"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      <div className="relative z-10 max-w-[720px] mx-auto px-6 text-center">
        <div
        >
          {/* Warm accent line */}
          <div className="w-12 h-px bg-[#C8A46E] mx-auto mb-8" />

          <p className="text-[1.15rem] md:text-[1.3rem] text-white/75 font-light leading-relaxed mb-6 italic">
            &ldquo;{cta.quote}&rdquo;
          </p>
          <p className="text-[0.8rem] text-white/35 font-light mb-14">
            {cta.closing}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={cta.primary.href}
              className="inline-flex items-center px-8 py-3.5 bg-[#C8A46E] text-white text-[0.82rem] font-medium tracking-[0.06em] hover:bg-[#b8945e] transition-all duration-300 no-underline"
            >
              {cta.primary.label}
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white/70 text-[0.82rem] font-light tracking-[0.06em] hover:border-white/40 hover:text-white transition-all duration-300 no-underline"
            >
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
