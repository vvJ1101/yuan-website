import Image from 'next/image'

export function HomepageExperience() {
  return (
    <div className="showroom-cover__experience showroom-cover__experience--static">
      <Image
        className="showroom-cover__background"
        src="/images/showroom/yuan-home-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="showroom-cover__hero-logo">
        <Image
          className="showroom-cover__hero-logo-image"
          src="/images/showroom/yuan-home-logo.png"
          alt="YUAN SHOWROOM"
          fill
          priority
          sizes="(max-width: 640px) 72vw, 44vw"
        />
      </div>
    </div>
  )
}
