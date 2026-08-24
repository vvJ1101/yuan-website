'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

function Timepiece({ time }: { time: string }) {
  return (
    <div className="showroom-cover__timepiece" aria-label={`Shanghai local time ${time}`}>
      <div className="showroom-cover__clock" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--tick': index } as React.CSSProperties} />)}
      </div>
      <div className="showroom-cover__place">
        <span>SHANGHAI · CST</span>
        <time>{time}</time>
        <span>31.2304° N&nbsp;&nbsp;121.4737° E</span>
      </div>
    </div>
  )
}

export function HomepageExperience() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef(0)
  const scrollingRef = useRef(false)
  const scrollResumeTimer = useRef<number | null>(null)
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    const formatShanghaiTime = () => setTime(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()))
    formatShanghaiTime()
    const timer = window.setInterval(formatShanghaiTime, 1000)
    return () => window.clearInterval(timer)
  }, [])

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
      if (!scrollingRef.current && !reduceMotion) positionRef.current += elapsed * 0.052
      normalizePosition()
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
      animationFrame = requestAnimationFrame(render)
    }

    const onWheel = (event: WheelEvent) => {
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
      stage.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 2}`)
      stage.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight - 0.5) * 2}`)
    }

    const onResize = () => { loopWidth = track.scrollWidth / 2; normalizePosition() }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      if (scrollResumeTimer.current) window.clearTimeout(scrollResumeTimer.current)
    }
  }, [])

  return (
    <div className="showroom-cover__experience">
      <div className="showroom-cover__stage" ref={stageRef} data-scrolling="false">
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
        <Timepiece time={time} />
        <span className="showroom-cover__direction" aria-hidden="true">SCROLL TO EXPLORE&nbsp;&nbsp;→</span>
      </div>
    </div>
  )
}
