'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/types/showroom'

const galleryPanels = [
  { src: '/images/showroom/home/generated-fabric-v1.png', shape: 'hero', position: '50% 50%' },
  { src: '/images/showroom/home/texture.png', shape: 'small', position: '50% 50%' },
  { src: '/images/showroom/home/space-01.png', shape: 'tall', position: '50% 50%' },
  { src: '/images/showroom/home/flower-monochrome.png', shape: 'medium', position: '50% 50%' },
  { src: '/images/showroom/home/space-02.png', shape: 'wide', position: '50% 46%' },
  { src: '/images/showroom/home/flower-macro.png', shape: 'small-low', position: '50% 50%' },
  { src: '/images/showroom/home/space-03.png', shape: 'tall-low', position: '50% 48%' },
  { src: '/images/showroom/home/space-04.png', shape: 'wide-high', position: '50% 50%' },
] as const

function BrandLettering() {
  return (
    <div className="showroom-cover__lettering" aria-hidden="true">
      <span className="showroom-cover__word showroom-cover__word--yuan">YUAN</span>
      <span className="showroom-cover__word showroom-cover__word--showroom">SHOWROOM</span>
    </div>
  )
}

interface VisitorLocation {
  address: string
  coordinates: string
  timezone: string
}

const locationCopy = {
  cn: { label: '实时位置', locating: '正在获取位置', fallback: '上海 · 中国', time: '当地时间' },
  en: { label: 'LIVE LOCATION', locating: 'LOCATING', fallback: 'SHANGHAI · CHINA', time: 'LOCAL TIME' },
} as const

function Timepiece({ time, location, locale }: { time: string; location: VisitorLocation; locale: Locale }) {
  const copy = locationCopy[locale]
  return (
    <div className="showroom-cover__timepiece" aria-label={`${copy.label}: ${location.address}, ${copy.time}: ${time}`}>
      <div className="showroom-cover__clock" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--tick': index } as React.CSSProperties} />)}
      </div>
      <div className="showroom-cover__place">
        <span>{copy.time} · {location.timezone}</span>
        <strong>{copy.label} · {location.address}</strong>
        <time>{time}</time>
        <span>{location.coordinates}</span>
      </div>
    </div>
  )
}

export function HomepageExperience({ locale }: { locale: Locale }) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef(0)
  const scrollingRef = useRef(false)
  const pointerSlowingRef = useRef(false)
  const scrollResumeTimer = useRef<number | null>(null)
  const pointerSlowTimer = useRef<number | null>(null)
  const cursorHideTimer = useRef<number | null>(null)
  const [time, setTime] = useState('00:00:00')
  const [visitorLocation, setVisitorLocation] = useState<VisitorLocation>({
    address: locationCopy[locale].locating,
    coordinates: '31.2304° N  121.4737° E',
    timezone: '—',
  })

  useEffect(() => {
    const formatLocalTime = () => setTime(new Intl.DateTimeFormat(locale === 'cn' ? 'zh-CN' : 'en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()))
    formatLocalTime()
    const timer = window.setInterval(formatLocalTime, 1000)
    return () => window.clearInterval(timer)
  }, [locale])

  useEffect(() => {
    const copy = locationCopy[locale]
    const fallback = () => setVisitorLocation({
      address: copy.fallback,
      coordinates: '31.2304° N  121.4737° E',
      timezone: 'Asia/Shanghai',
    })

    if (!navigator.geolocation) { fallback(); return }

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const latitude = coords.latitude
      const longitude = coords.longitude
      const coordinates = `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}  ${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setVisitorLocation({ address: copy.locating, coordinates, timezone })

      try {
        const language = locale === 'cn' ? 'zh-CN' : 'en'
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=14&lat=${latitude}&lon=${longitude}&accept-language=${language}`, { headers: { Accept: 'application/json' } })
        if (!response.ok) throw new Error('Reverse geocoding failed')
        const result = await response.json() as { display_name?: string; address?: Record<string, string> }
        const address = result.address ?? {}
        const displayParts = (result.display_name ?? '').split(/[,，]/).map((part) => part.trim())
        const rawCity = address.city || address.municipality || address.town
        const cityFromDisplay = locale === 'cn' ? displayParts.find((part) => /市$/.test(part)) : undefined
        const district = address.city_district || address.district || address.borough || address.county || (rawCity && /区$|District$/i.test(rawCity) ? rawCity : undefined)
        const city = rawCity && rawCity !== district ? rawCity : cityFromDisplay || address.state
        const parts = [city, district, address.country].filter((part, index, values): part is string => Boolean(part) && values.indexOf(part) === index)
        setVisitorLocation({ address: parts.join(' · ') || result.display_name || copy.fallback, coordinates, timezone })
      } catch { setVisitorLocation({ address: copy.fallback, coordinates, timezone }) }
    }, fallback, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 })
  }, [locale])

  useEffect(() => {
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track) return

    let animationFrame = 0
    let previousTime = performance.now()
    let loopWidth = track.scrollWidth / 2
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const normalizePosition = () => {
      if (loopWidth > 0) positionRef.current = ((positionRef.current % loopWidth) + loopWidth) % loopWidth
    }

    const render = (now: number) => {
      const elapsed = Math.min(now - previousTime, 64)
      previousTime = now
      if (!scrollingRef.current && !reduceMotion) positionRef.current += elapsed * (pointerSlowingRef.current ? 0.036 : 0.14)
      normalizePosition()
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
      animationFrame = requestAnimationFrame(render)
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      scrollingRef.current = true
      stage.dataset.scrolling = 'true'
      positionRef.current += event.deltaY * 0.72
      if (scrollResumeTimer.current) window.clearTimeout(scrollResumeTimer.current)
      scrollResumeTimer.current = window.setTimeout(() => {
        scrollingRef.current = false
        stage.dataset.scrolling = 'false'
      }, 800)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerSlowingRef.current = true
      stage.dataset.cursor = 'visible'
      stage.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 2}`)
      stage.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight - 0.5) * 2}`)
      if (pointerSlowTimer.current) window.clearTimeout(pointerSlowTimer.current)
      pointerSlowTimer.current = window.setTimeout(() => { pointerSlowingRef.current = false }, 420)
      if (cursorHideTimer.current) window.clearTimeout(cursorHideTimer.current)
      cursorHideTimer.current = window.setTimeout(() => { stage.dataset.cursor = 'hidden' }, 1400)
    }

    const onResize = () => { loopWidth = track.scrollWidth / 2; normalizePosition() }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      if (scrollResumeTimer.current) window.clearTimeout(scrollResumeTimer.current)
      if (pointerSlowTimer.current) window.clearTimeout(pointerSlowTimer.current)
      if (cursorHideTimer.current) window.clearTimeout(cursorHideTimer.current)
    }
  }, [])

  return (
    <div className="showroom-cover__experience">
      <div className="showroom-cover__stage" ref={stageRef} data-scrolling="false" data-cursor="visible">
        <div className="showroom-cover__track" ref={trackRef} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="showroom-cover__sequence" key={copy}>
              {galleryPanels.map((panel, index) => (
                <div className={`showroom-cover__panel showroom-cover__panel--${panel.shape}`} key={`${copy}-${panel.src}`} style={{ '--panel-index': index } as React.CSSProperties}>
                  <Image src={panel.src} alt="" fill sizes="(max-width: 640px) 70vw, 42vw" priority={copy === 0 && index < 3} style={{ objectPosition: panel.position }} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <BrandLettering />
        <Timepiece time={time} location={visitorLocation} locale={locale} />
        <span className="showroom-cover__direction" aria-hidden="true">SCROLL TO EXPLORE&nbsp;&nbsp;→</span>
      </div>
    </div>
  )
}
