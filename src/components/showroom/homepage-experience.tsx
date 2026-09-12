import Image from 'next/image'

import type { Locale } from '@/types/showroom'

const homepageLogo = {
  src: '/images/showroom/yuan-inline-logo-horizontal.png',
  width: 1888,
  height: 118,
} as const

const homepageCopy = {
  cn: {
    introduction: ' 是连接国际设计师品牌与中国市场的品牌管理平台。',
    service: '我们通过品牌代理、订货会与长期运营支持，协助品牌建立清晰且持续的市场路径。',
    closingPrefix: '立足深圳与香港，',
    closing: ' 让创意、商业与长期价值在真实的合作中相遇。',
  },
  en: {
    introduction: ' connects international designer brands with the Chinese market.',
    service:
      'Through representation, ordering events, and long-term operational support, we help brands build clear and sustainable paths for growth.',
    closingPrefix: 'Based in Shenzhen and Hong Kong, ',
    closing:
      ' brings creativity, commerce, and lasting value together through meaningful partnerships.',
  },
} as const

function BrandSignature() {
  return (
    <span className="showroom-cover__inline-logo">
      <Image
        src={homepageLogo.src}
        width={homepageLogo.width}
        height={homepageLogo.height}
        alt="YUAN SHOWROOM"
        sizes="150px"
      />
    </span>
  )
}

export function HomepageExperience({ locale }: { locale: Locale }) {
  const copy = homepageCopy[locale]

  return (
    <section className="showroom-cover__experience" aria-label="YUAN SHOWROOM">
      <div className="showroom-cover__introduction">
        <p>
          <BrandSignature />
          {copy.introduction}
        </p>
        <p>{copy.service}</p>
        <p>
          {copy.closingPrefix}
          <BrandSignature />
          {copy.closing}
        </p>
      </div>
    </section>
  )
}
