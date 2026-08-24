'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

function BrandLettering() {
  return (
    <>
      <div className="showroom-cover__word showroom-cover__word--yuan">
        {'YUAN'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
      </div>
      <div className="showroom-cover__word showroom-cover__word--showroom">
        {'SHOWROOM'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
      </div>
    </>
  )
}

function Lettering({ activeScene }: { activeScene: number }) {
  return (
    <div className="showroom-cover__sticky-lettering" data-active-scene={activeScene + 1} aria-hidden="true">
      <div className="showroom-cover__letter-layer showroom-cover__letter-layer--base"><BrandLettering /></div>
      {[1, 2, 3, 4].map((layer) => (
        <div className={`showroom-cover__letter-layer showroom-cover__letter-layer--image showroom-cover__letter-layer--image-${layer}`} key={layer}>
          <BrandLettering />
        </div>
      ))}
    </div>
  )
}

export function HomepageExperience() {
  const [activeScene, setActiveScene] = useState(0)
  const sceneRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (visible) setActiveScene(Number((visible.target as HTMLElement).dataset.homeScene) - 1)
    }, { rootMargin: '-28% 0px -28% 0px', threshold: [0.1, 0.3, 0.5, 0.7] })

    sceneRefs.current.forEach((scene) => { if (scene) observer.observe(scene) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="showroom-cover__experience">
      <Lettering activeScene={activeScene} />
      <div className="showroom-cover__scenes">
        <section className="showroom-cover__scene showroom-cover__scene--material" data-home-scene="1" ref={(node) => { sceneRefs.current[0] = node }}>
          <div className="showroom-cover__image showroom-cover__image--fabric"><Image src="/images/showroom/home/generated-fabric-v1.png" alt="" fill sizes="42vw" priority /></div>
          <div className="showroom-cover__image showroom-cover__image--texture"><Image src="/images/showroom/home/texture.png" alt="" fill sizes="18vw" priority /></div>
          <div className="showroom-cover__image showroom-cover__image--monochrome"><Image src="/images/showroom/home/flower-monochrome.png" alt="" fill sizes="17vw" /></div>
          <div className="showroom-cover__image showroom-cover__image--macro"><Image src="/images/showroom/home/flower-macro.png" alt="" fill sizes="20vw" /></div>
        </section>

        <section className="showroom-cover__scene showroom-cover__scene--space" data-home-scene="2" ref={(node) => { sceneRefs.current[1] = node }}>
          <div className="showroom-cover__image showroom-cover__space-image--one"><Image src="/images/showroom/home/space-01.png" alt="" fill sizes="27vw" /></div>
          <div className="showroom-cover__image showroom-cover__space-image--two"><Image src="/images/showroom/home/space-02.png" alt="" fill sizes="18vw" /></div>
          <div className="showroom-cover__image showroom-cover__space-image--three"><Image src="/images/showroom/home/space-03.png" alt="" fill sizes="24vw" /></div>
          <div className="showroom-cover__image showroom-cover__space-image--four"><Image src="/images/showroom/home/space-04.png" alt="" fill sizes="26vw" /></div>
        </section>

        <section className="showroom-cover__scene showroom-cover__scene--detail" data-home-scene="3" ref={(node) => { sceneRefs.current[2] = node }}>
          <div className="showroom-cover__image showroom-cover__detail-image--flower"><Image src="/images/showroom/home/flower-monochrome.png" alt="" fill sizes="44vw" /></div>
          <div className="showroom-cover__image showroom-cover__detail-image--macro"><Image src="/images/showroom/home/flower-macro.png" alt="" fill sizes="28vw" /></div>
          <div className="showroom-cover__image showroom-cover__detail-image--texture"><Image src="/images/showroom/home/texture.png" alt="" fill sizes="16vw" /></div>
        </section>
      </div>
    </div>
  )
}
