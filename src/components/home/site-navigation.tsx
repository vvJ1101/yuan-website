'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '#about', label: '关于' },
  { href: '#bsi', label: '优势' },
  { href: '#services', label: '服务' },
  { href: '#brands', label: '品牌' },
  { href: '#showroom', label: '展厅' },
  { href: '#plus', label: 'PLUS' },
]

export function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 800)
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    drawerRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav
        aria-label="主导航"
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <Link
            href="/"
            className={`text-[0.85rem] font-medium tracking-[0.08em] no-underline transition-colors ${
              scrolled ? 'text-[#111]' : 'text-white'
            }`}
          >
            YUAN SHOWROOM
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.75rem] tracking-[0.1em] uppercase transition-colors no-underline font-light ${
                  scrolled ? 'text-neutral-500 hover:text-[#111]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className={`inline-flex items-center px-6 py-2 text-[0.72rem] tracking-[0.1em] uppercase border transition-all duration-300 no-underline font-medium ${
                scrolled
                  ? 'border-[#C8A46E] text-[#C8A46E] hover:bg-[#C8A46E] hover:text-white'
                  : 'border-[#C8A46E]/60 text-[#C8A46E] hover:bg-[#C8A46E] hover:text-white'
              }`}
            >
              预约合作
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 -mr-2 min-h-11 min-w-11"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-[#111]' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-[#111]' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-[#111]' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        <div
          ref={drawerRef}
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={`md:hidden absolute top-20 left-0 right-0 bg-white border-b border-neutral-100 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0 invisible'}`}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu} className="text-[0.85rem] text-neutral-600 hover:text-[#111] transition-colors no-underline font-light tracking-[0.04em] py-1">
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4 border-t border-neutral-100">
              <Link href="#contact" onClick={closeMenu} className="inline-flex items-center px-6 py-2.5 bg-[#111] text-white text-[0.78rem] font-medium tracking-[0.04em] no-underline">
                预约合作
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 min-w-11 min-h-11 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center transition-all duration-500 hover:border-neutral-400 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="返回顶部"
        tabIndex={showTop ? 0 : -1}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500" aria-hidden="true">
          <path d="M4 10L8 6L12 10" />
        </svg>
      </button>
    </>
  )
}
