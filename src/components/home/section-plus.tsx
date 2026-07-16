import { prStars, omniChannel, intangibleAsset, investment } from '@/data/home'
import Image from 'next/image'

type ChannelItem = typeof omniChannel.ecommerce | typeof omniChannel.retail

function hasPlatforms(item: ChannelItem): item is typeof omniChannel.ecommerce {
  return 'platforms' in item
}

export function PlusSection() {
  return (
    <section id="plus" className="py-28 md:py-36 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        {/* ═══ Part 1: Celebrity PR ═══ */}
        <div
          className="mb-14"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{prStars.tag}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-2">{prStars.title}</h2>
          <p className="text-[1.15rem] md:text-[1.3rem] font-light text-neutral-400">{prStars.subtitle}</p>
          <div className="w-12 h-px bg-[#C8A46E]/40 mt-5" />
        </div>

        {/* Hero image */}
        <div
          className="aspect-[21/9] md:aspect-[21/8] overflow-hidden mb-14 relative"
        >
          <Image src={prStars.heroImage} alt="品牌服务 PLUS" fill className="object-cover" sizes="100vw" />
        </div>

        {/* PR Intro — two columns */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-14">
          {[
            { tag: 'PR & Publicity', title: '明星公关代运营', text: prStars.intro },
            { tag: 'Content Operations', title: '自媒体平台代运营', text: prStars.intro2 },
          ].map((col, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 p-6 md:p-8 rounded-sm"
            >
              <p className="text-[0.63rem] tracking-[0.15em] text-neutral-300 uppercase mb-2">{col.tag}</p>
              <h3 className="text-[1.15rem] font-semibold text-[#111] mb-3">{col.title}</h3>
              <p className="text-[0.88rem] text-neutral-500 font-light leading-relaxed">{col.text}</p>
            </div>
          ))}
        </div>

        {/* Brand Visual Row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {prStars.productImages.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden relative group">
              <Image src={src} alt={`品牌合作案例 ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
          <div className="aspect-[4/5] overflow-hidden relative bg-neutral-50">
            <Image src={prStars.bannerImage} alt="品牌展示" fill className="object-contain p-4" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
          <div className="aspect-[4/5] overflow-hidden relative bg-neutral-50">
            <Image src={prStars.starImage} alt="明星合作" fill className="object-contain p-4" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        </div>

        {/* Wide Banner */}
        <div
          className="relative aspect-[21/4] overflow-hidden mb-16"
        >
          <Image src={prStars.wideBanner} alt="YUAN SHOWROOM" fill className="object-contain" sizes="100vw" />
        </div>

        {/* Star Name Cloud */}
        <div
          className="mb-20"
        >
          <p className="text-[0.65rem] tracking-[0.15em] text-neutral-300 uppercase mb-5 text-center">Overseas & International Celebrities</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">
            {prStars.overseas.map((name) => (
              <span key={name} className="text-[0.78rem] text-neutral-400 font-light hover:text-[#C8A46E] transition-colors cursor-default">{name}</span>
            ))}
          </div>
          <p className="text-[0.65rem] tracking-[0.15em] text-neutral-300 uppercase mb-5 text-center">Mainland China Celebrities</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {prStars.mainland.map((name) => (
              <span key={name} className="text-[0.78rem] text-neutral-500 font-light hover:text-[#C8A46E] transition-colors cursor-default">{name}</span>
            ))}
          </div>
        </div>

        {/* Divider — warm accent */}
        <div className="flex items-center gap-4 my-20">
          <div className="flex-1 h-px bg-neutral-100" />
          <div className="w-8 h-px bg-[#C8A46E]/30" />
          <div className="flex-1 h-px bg-neutral-100" />
        </div>

        {/* ═══ Part 2: Omni-Channel ═══ */}
        <div
          className="mb-14"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{omniChannel.tag}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-2">{omniChannel.title}</h2>
          <p className="text-[1.15rem] font-light text-neutral-400">{omniChannel.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
          {[omniChannel.ecommerce, omniChannel.retail].map((item, idx) => (
            <div
              key={idx}
              className="group"
            >
              <div className="aspect-[16/10] overflow-hidden mb-5 relative rounded-sm">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="text-[1.15rem] font-semibold text-[#111] mb-3 group-hover:text-[#C8A46E] transition-colors">{item.title}</h3>
              <p className="text-[0.88rem] text-neutral-500 font-light leading-relaxed mb-4">{item.desc}</p>
              {hasPlatforms(item) && (
                <div className="flex flex-wrap gap-1.5">
                  {item.platforms.map((p) => (
                    <span key={p} className="text-[0.68rem] px-2.5 py-1 bg-neutral-50 text-neutral-400 font-light rounded-sm">{p}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-20">
          <div className="flex-1 h-px bg-neutral-100" />
          <div className="w-8 h-px bg-[#C8A46E]/30" />
          <div className="flex-1 h-px bg-neutral-100" />
        </div>

        {/* ═══ Part 3: Intangible Asset Management ═══ */}
        <div
          className="mb-14"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{intangibleAsset.tag}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-2">{intangibleAsset.title}</h2>
          <p className="text-[1.15rem] font-light text-neutral-400">{intangibleAsset.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-10">
          <div
          >
            <div className="aspect-[16/10] overflow-hidden mb-5 relative rounded-sm">
              <Image src={intangibleAsset.image} alt={intangibleAsset.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <p className="text-[0.95rem] text-neutral-600 font-light leading-relaxed">{intangibleAsset.desc}</p>
          </div>
          <div
            className="grid grid-cols-2 gap-3 content-start"
          >
            {intangibleAsset.highlights.map((h) => (
              <div
                key={h.title}
                className="bg-neutral-50 p-5 rounded-sm group hover:bg-neutral-100 transition-colors duration-300"
              >
                <div className="w-6 h-px bg-[#C8A46E]/30 mb-3 group-hover:w-10 transition-all duration-300" />
                <p className="text-[0.88rem] font-semibold text-[#111] mb-1">{h.title}</p>
                <p className="text-[0.63rem] text-neutral-400 uppercase tracking-[0.06em] mb-2">{h.enTitle}</p>
                <p className="text-[0.72rem] text-neutral-500 font-light leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Intangible Banner */}
        <div
          className="relative aspect-[21/4] overflow-hidden"
        >
          <Image src={intangibleAsset.bannerImage} alt="无形资产管理" fill className="object-contain" sizes="100vw" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-20">
          <div className="flex-1 h-px bg-neutral-100" />
          <div className="w-8 h-px bg-[#C8A46E]/30" />
          <div className="flex-1 h-px bg-neutral-100" />
        </div>

        {/* ═══ Part 4: Brand Investment ═══ */}
        <div
          className="mb-14"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">{investment.tag}</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-2">{investment.title}</h2>
          <p className="text-[1.15rem] font-light text-neutral-400">{investment.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div
          >
            <div className="aspect-[16/10] overflow-hidden mb-5 relative rounded-sm">
              <Image src={investment.image} alt={investment.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <p className="text-[0.95rem] text-neutral-600 font-light leading-relaxed">{investment.desc}</p>
          </div>
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-sm"
          >
            <Image src={investment.bannerImage} alt="品牌价值投资" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
