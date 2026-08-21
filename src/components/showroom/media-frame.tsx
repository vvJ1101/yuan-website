import Image from 'next/image'

import { cn } from '@/lib/utils'

interface MediaFrameProps {
  src: string
  alt: string
  ratio: string
  priority?: boolean
  sizes?: string
  className?: string
}

export function MediaFrame({
  src,
  alt,
  ratio,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 64vw',
  className,
}: MediaFrameProps) {
  return (
    <div className={cn('media-frame', className)} style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
      />
    </div>
  )
}
