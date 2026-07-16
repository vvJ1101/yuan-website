import { about, byTheNumbers } from '@/data/home'
import Link from 'next/link'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header — left aligned */}
        <div
          className="mb-16"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{about.subtitle}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15]">{about.title}</h2>
        </div>

        {/* Image + Text — asymmetric: 55/45 */}
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-20 mb-16">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={about.image}
              alt="YUAN Showroom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>

          <div
            className="flex flex-col justify-center"
          >
            <p className="text-[1.1rem] text-neutral-700 font-light leading-[1.8] mb-6">
              {about.intro}
            </p>
            <p className="text-[0.92rem] text-neutral-500 font-light leading-[1.8] mb-6">
              {about.intro2}
            </p>
            <p className="text-[0.92rem] text-neutral-500 font-light leading-[1.8]">
              {about.intro3}
            </p>
            <div className="mt-6">
              <Link
                href={about.link.href}
                className="inline-flex items-center text-[0.78rem] tracking-[0.1em] uppercase text-[#C8A46E] font-medium border-b border-[#C8A46E]/40 pb-1.5 hover:border-[#C8A46E] transition-colors no-underline"
              >
                {about.link.label} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers — full-bleed dark block with warm accent */}
      <div
        className="bg-[#111] py-20 px-6"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {byTheNumbers.map((n) => (
              <div
                key={n.label}
                className="text-center group"
              >
                <p className="text-[2.6rem] md:text-[3rem] lg:text-[3.5rem] font-light tracking-[-0.02em] text-[#C8A46E] mb-3 group-hover:scale-105 transition-transform duration-300">
                  {n.value}
                </p>
                <div className="w-8 h-px bg-white/15 mx-auto mb-3" />
                <p className="text-[0.8rem] text-white/70 font-light leading-relaxed">
                  {n.label}
                </p>
                <p className="text-[0.68rem] text-white/35 font-light mt-1.5">
                  {n.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
