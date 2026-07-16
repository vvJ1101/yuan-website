import { bsi } from '@/data/home'
import Image from 'next/image'

export function BSISection() {
  return (
    <section id="bsi" className="py-28 md:py-36 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header + Image side by side */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 mb-16">
          <div
          >
            <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{bsi.tag}</p>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-3">
              {bsi.title}
            </h2>
            <p className="text-[1.4rem] md:text-[1.6rem] font-light text-neutral-400 tracking-[-0.01em]">{bsi.subtitle}</p>
          </div>
          <div
            className="hidden md:block w-[160px] relative self-end"
          >
            <Image
              src={bsi.image}
              alt="BSI Model"
              width={160}
              height={280}
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>

        {/* Intro text — wider, separated */}
        <p
          className="text-[1.05rem] text-neutral-600 font-light leading-relaxed max-w-[680px] mb-16"
        >
          {bsi.intro}
        </p>

        {/* Three Pillars — card style with left accent */}
        <div className="grid md:grid-cols-3 gap-0 md:divide-x divide-neutral-200">
          {bsi.pillars.map((p, i) => (
            <div
              key={p.id}
              className="px-0 md:px-8 first:pr-8 last:pl-8 py-4 md:py-0 group"
            >
              <div className="w-10 h-px bg-[#C8A46E]/40 mb-6 group-hover:w-16 group-hover:bg-[#C8A46E] transition-all duration-300" />
              <span className="text-[3.5rem] md:text-[4.5rem] font-light text-neutral-200 tracking-[-0.04em] leading-none block mb-1">
                {`0${i + 1}`}
              </span>
              <h3 className="text-[1.15rem] font-semibold text-[#111] tracking-[-0.01em] mb-1">
                {p.title}
              </h3>
              <p className="text-[0.68rem] tracking-[0.15em] text-neutral-300 uppercase mb-4">{p.enTitle}</p>
              <p className="text-[0.88rem] text-neutral-500 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
