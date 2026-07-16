import { showroom, seasons } from '@/data/home'
import Image from 'next/image'

export function ShowroomSection() {
  return (
    <section id="showroom" className="py-28 md:py-36 bg-[#111] text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          className="mb-16"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-white/30 uppercase mb-4">{showroom.subtitle}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-white leading-[1.15] mb-6">{showroom.title}</h2>
          <div className="w-12 h-px bg-[#C8A46E]/50 mb-6" />
          <p className="text-[1.0rem] text-white/45 font-light leading-relaxed max-w-[620px]">{showroom.description}</p>
          <p className="text-[0.9rem] text-white/30 font-light leading-relaxed max-w-[560px] mt-3">{showroom.description2}</p>
        </div>

        {/* Image Grid — refined */}
        <div
          className="mb-24"
        >
          {/* Hero image */}
          <div className="aspect-[21/9] md:aspect-[21/8] bg-white/[0.03] overflow-hidden mb-3 relative group">
            <Image
              src={showroom.images[0].src}
              alt={showroom.images[0].alt}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-1000"
              sizes="100vw"
            />
          </div>
          {/* 4 supporting images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {showroom.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-[4/5] bg-white/[0.03] overflow-hidden relative group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seasons — card style in dark theme */}
        <div
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-white/25 uppercase mb-8 text-center">
            Seasonal Ordering Events
            <span className="block w-8 h-px bg-[#C8A46E]/30 mx-auto mt-3" />
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {seasons.map((s) => (
              <div
                key={s.season}
                className="group"
              >
                <div className="aspect-[4/5] bg-white/[0.03] overflow-hidden mb-4 relative">
                  <Image
                    src={s.image}
                    alt={s.season}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Warm overlay on hover */}
                  <div className="absolute inset-0 bg-[#C8A46E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-[0.9rem] text-white font-light mb-1 group-hover:text-[#C8A46E] transition-colors">{s.season}</p>
                <p className="text-[0.72rem] text-white/30 font-light">{s.time} · {s.city}</p>
                <p className="text-[0.68rem] text-white/20 font-light mt-0.5">{s.venue} · {s.brands} 品牌</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
