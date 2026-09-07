import Image from 'next/image'

import { shouldBypassImageOptimization } from '@/lib/image-delivery'
import { cn } from '@/lib/utils'

interface MediaFrameProps {
  src: string
  alt: string
  ratio: string
  priority?: boolean
  unoptimized?: boolean
  sizes?: string
  className?: string
}

export function MediaFrame({
  src,
  alt,
  ratio,
  priority = false,
  unoptimized,
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
        unoptimized={unoptimized ?? shouldBypassImageOptimization(src)}
        sizes={sizes}
      />
    </div>
  )
}
