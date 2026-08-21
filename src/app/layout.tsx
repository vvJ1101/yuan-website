import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://yuanshowroom.cn'),
  title: {
    default: 'YUAN SHOWROOM国际时尚品牌管理平台',
    template: '%s | YUAN SHOWROOM',
  },
  description: 'YUAN SHOWROOM是深圳（香港）时胜集团的综合性商业时尚管理平台。集品牌代理、全域营销、文娱传媒与战略投资于一体，融合AI智能与知识管理，赋能商业长期价值。',
  keywords: ['YUAN SHOWROOM', 'YUANSHOWROOM', 'YUAN', '设计师品牌代理', 'Showroom', '上海时装周', '品牌管理', '时尚买手', '订货会', '品牌服务', '市场开拓', '深圳Showroom', '香港Showroom', '国际设计师品牌', '时尚品牌代理'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://yuanshowroom.cn/cn',
    languages: {
      'zh-CN': 'https://yuanshowroom.cn/cn',
      en: 'https://yuanshowroom.cn/en',
    },
  },
  icons: { icon: '/favicon.png', apple: '/apple-icon.png' },
  openGraph: {
    title: 'YUAN SHOWROOM国际时尚品牌管理平台',
    description: 'YUAN SHOWROOM是深圳（香港）时胜集团的综合性商业时尚管理平台。集品牌代理、全域营销、文娱传媒与战略投资于一体，融合AI智能与知识管理，赋能商业长期价值。',
    url: 'https://yuanshowroom.cn/cn',
    siteName: 'YUAN SHOWROOM',
    images: [{ url: '/images/showroom/hero-reference.png', width: 1200, height: 630, alt: 'YUAN SHOWROOM 品牌形象' }],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YUAN SHOWROOM国际时尚品牌管理平台',
    description: 'YUAN SHOWROOM是深圳（香港）时胜集团的综合性商业时尚管理平台。集品牌代理、全域营销、文娱传媒与战略投资于一体，融合AI智能与知识管理，赋能商业长期价值。',
    images: [{ url: '/images/showroom/hero-reference.png', alt: 'YUAN SHOWROOM 品牌形象' }],
  },
  other: {
    'baidu-site-verification': 'codeva-0wAwq3lCfI',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get('x-showroom-locale') ?? 'zh-CN'

  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'YUAN SHOWROOM',
              alternateName: 'YUANSHOWROOM',
              description: '连接国际设计师品牌与中国市场生态的系统性品牌管理支持平台',
              url: 'https://yuanshowroom.cn/',
              logo: 'https://yuanshowroom.cn/favicon.png',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'heshiya@yuanshowroom.vip',
                contactType: 'Brand Cooperation',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: '深圳',
                addressRegion: '广东',
                addressCountry: 'CN',
              },
              sameAs: ['https://yuanshowroom.cn/'],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
