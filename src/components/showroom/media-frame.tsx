import Image from 'next/image'

import { cn } from '@/lib/utils'

interface MediaFrameProps {
  src: string
  alt: string
  ratio: string
  priority?: boolean
  className?: string
}

export function MediaFrame({
  src,
  alt,
  ratio,
  priority = false,
  className,
}: MediaFrameProps) {
  return (
    <div className={cn('media-frame', className)} style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 760px) 100vw, 64vw"
      />
    </div>
  )
}
