import { brands } from '@/data/home'
import Image from 'next/image'

export function BrandsSection() {
  return (
    <section id="brands" className="py-28 md:py-36 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          className="mb-16 text-center"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">Brand Matrix</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15]">{brands.title}</h2>
          <div className="w-12 h-px bg-[#C8A46E]/40 mx-auto mt-6" />
        </div>

        {/* Brand Logo Row — larger, warm accent hover */}
        <div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-14 mb-16"
        >
          {brands.logoImages.map((src, i) => (
            <div key={i} className="relative w-16 h-16 md:w-22 md:h-22 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110">
              <Image
                src={src}
                alt={`Brand logo ${i + 1}`}
                fill
                className="object-contain"
                sizes="88px"
              />
            </div>
          ))}
        </div>

        {/* Brand Name Grid — warm hover instead of full black */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-neutral-100 mb-20">
          {brands.logos.map((b) => (
            <div
              key={b.name}
              className="group bg-white p-5 md:p-6 hover:bg-neutral-50 transition-colors duration-300 cursor-default border-l-2 border-l-transparent hover:border-l-[#C8A46E]"
            >
              <p className="text-[0.9rem] md:text-[1.0rem] font-light text-[#111] tracking-[0.02em] group-hover:text-[#C8A46E] transition-colors">
                {b.name}
              </p>
              <p className="text-[0.65rem] text-neutral-400 mt-1.5 group-hover:text-neutral-500 transition-colors">
                {b.country} · {b.category}
              </p>
              <p className="text-[0.68rem] text-neutral-400 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2">
                {b.style}
              </p>
            </div>
          ))}
        </div>

        {/* Channel Partners — tag style */}
        <div
          className="text-center"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-6">合作买手与买手店</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {brands.buyers.map((buyer, i) => (
              <span
                key={buyer}
                className="text-[0.78rem] text-neutral-500 font-light tracking-[0.03em] hover:text-[#C8A46E] transition-colors cursor-default"
              >
                {buyer}
                {i < brands.buyers.length - 1 && <span className="text-neutral-200 mx-3">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
