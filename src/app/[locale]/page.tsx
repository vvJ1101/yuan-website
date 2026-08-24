import Image from 'next/image'

export default function LocaleCoverPage() {
  return (
    <main className="showroom-cover">
      <h1 className="sr-only">YUAN SHOWROOM</h1>
      <div className="showroom-cover__collage" aria-hidden="true">
        <div className="showroom-cover__image showroom-cover__image--fabric">
          <Image src="/images/showroom/home/generated-fabric-v1.png" alt="" fill sizes="42vw" priority />
        </div>
        <div className="showroom-cover__image showroom-cover__image--texture">
          <Image src="/images/showroom/home/texture.png" alt="" fill sizes="18vw" priority />
        </div>
        <div className="showroom-cover__image showroom-cover__image--monochrome">
          <Image src="/images/showroom/home/flower-monochrome.png" alt="" fill sizes="17vw" />
        </div>
        <div className="showroom-cover__image showroom-cover__image--macro">
          <Image src="/images/showroom/home/flower-macro.png" alt="" fill sizes="11vw" />
        </div>
        <div className="showroom-cover__word showroom-cover__word--yuan">
          {'YUAN'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
        </div>
        <div className="showroom-cover__word showroom-cover__word--showroom">
          {'SHOWROOM'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
        </div>
      </div>
    </main>
  )
}
