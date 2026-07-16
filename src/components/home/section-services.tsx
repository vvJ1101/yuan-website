import { services } from '@/data/home'
import Image from 'next/image'

export function ServicesSection() {
  return (
    <section id="services" className="py-28 md:py-36 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          className="mb-16"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">Support System</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15]">品牌服务体系</h2>
        </div>

        {/* 3x2 card grid with shadow depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="group bg-neutral-50 rounded-sm overflow-hidden hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="px-5 py-6">
                <p className="text-[0.63rem] tracking-[0.15em] text-neutral-300 uppercase mb-2">{s.id} — {s.enTitle}</p>
                <h3 className="text-[1.1rem] font-semibold text-[#111] tracking-[-0.01em] mb-2 group-hover:text-[#C8A46E] transition-colors duration-300">{s.title}</h3>
                <p className="text-[0.8rem] text-neutral-500 font-light leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
