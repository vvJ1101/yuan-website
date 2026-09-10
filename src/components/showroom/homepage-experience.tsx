import type { Locale } from '@/types/showroom'

const homepageCopy = {
  cn: {
    introduction: ' 是连接国际设计师品牌与中国市场的品牌管理平台。',
    service: '我们通过品牌代理、订货会与长期运营支持，协助品牌建立清晰且持续的市场路径。',
    closingPrefix: '从上海出发，',
    closing: ' 让创意、商业与长期价值在真实的合作中相遇。',
  },
  en: {
    introduction: ' connects international designer brands with the Chinese market.',
    service:
      'Through representation, ordering events, and long-term operational support, we help brands build clear and sustainable paths for growth.',
    closingPrefix: 'Based in Shanghai, ',
    closing:
      ' brings creativity, commerce, and lasting value together through meaningful partnerships.',
  },
} as const

export function HomepageExperience({ locale }: { locale: Locale }) {
  const copy = homepageCopy[locale]

  return (
    <section className="showroom-cover__experience" aria-label="YUAN SHOWROOM">
      <div className="showroom-cover__introduction">
        <p>
          <strong>YUANSHOWROOM</strong>
          {copy.introduction}
        </p>
        <p>{copy.service}</p>
        <p>
          {copy.closingPrefix}
          <strong>YUANSHOWROOM</strong>
          {copy.closing}
        </p>
      </div>
    </section>
  )
}
