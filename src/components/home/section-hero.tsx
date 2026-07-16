'use client'

import { motion } from 'framer-motion'
import { hero } from '@/data/home'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage}
          alt="YUAN SHOWROOM"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        {/* Warm, editorial gradient — lighter than before */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/25 to-neutral-950/60" />
      </div>

      {/* Content — centered, breathing room */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Brand name — dramatic, huge */}
            <h1 className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-light tracking-[-0.03em] text-white leading-[0.95] mb-8">
              {hero.title}
            </h1>

            {/* Golden accent line */}
            <div className="w-16 h-px bg-[#C8A46E] mx-auto mb-8" />

            {/* Single strong tagline — Chinese */}
            <p className="text-[1.05rem] md:text-[1.2rem] text-white/80 font-light tracking-[0.04em] leading-relaxed max-w-[620px] mx-auto mb-5">
              {hero.tagline}
            </p>

            {/* English subtitle — subtle */}
            <p className="text-[0.78rem] text-white/40 font-light tracking-[0.06em] max-w-[500px] mx-auto mb-12 uppercase">
              {hero.subtitle}
            </p>

            {/* CTAs — warm accent */}
            <div className="flex justify-center gap-4">
              <Link
                href={hero.cta.primary.href}
                className="inline-flex items-center px-8 py-3.5 bg-[#C8A46E] text-white text-[0.82rem] font-medium tracking-[0.06em] hover:bg-[#b8945e] transition-all duration-300 no-underline"
              >
                {hero.cta.primary.label}
              </Link>
              <Link
                href={hero.cta.secondary.href}
                className="inline-flex items-center px-8 py-3.5 border border-white/25 text-white/80 text-[0.82rem] font-light tracking-[0.06em] hover:border-white/50 hover:text-white transition-all duration-300 no-underline"
              >
                {hero.cta.secondary.label}
              </Link>
            </div>

            {/* Scroll hint — subtle arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-16"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/25 mx-auto animate-bounce">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
