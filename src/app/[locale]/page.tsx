import Image from 'next/image'

export default function LocaleCoverPage() {
  return (
    <main className="showroom-cover">
      <h1 className="sr-only">YUAN SHOWROOM</h1>
      <div className="showroom-cover__logo">
        <Image
          className="showroom-cover__logo-image"
          src="/images/showroom/yuan-logo.png"
          alt=""
          fill
          sizes="84vw"
          priority
        />
      </div>
    </main>
  )
}
