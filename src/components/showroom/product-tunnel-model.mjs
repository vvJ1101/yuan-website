export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

export function selectTunnelImages(images, count, random = Math.random) {
  const unique = [...new Set(images)]
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[unique[i], unique[j]] = [unique[j], unique[i]]
  }
  return unique.slice(0, count)
}

export function getTunnelFrame(phase) {
  const progress = ((phase % 1) + 1) % 1
  // Constant world-space travel preserves the reference's outward perspective
  // acceleration. Fade the distant layers instead of removing their depth.
  const fade = Math.min(progress / 0.55, 1)
  return { z: -78 + 80 * progress, opacity: fade * fade * (3 - 2 * fade) }
}

export function createTunnelLayout(count, { radius = 10, spacing = 2, tailZ = -78 } = {}) {
  return Array.from({ length: count }, (_, index) => {
    const angle = index * GOLDEN_ANGLE
    return {
      angle,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: tailZ + index * spacing,
    }
  })
}

export function recycleTunnelDepth(z, speed, delta, nearZ = 5, tailZ = -78) {
  const nextZ = z + speed * delta
  return nextZ >= nearZ ? tailZ : nextZ
}

export function getTunnelBudget(width, reducedMotion) {
  if (reducedMotion) return { count: 1, dpr: 1 }
  if (width <= 640) return { count: 28, dpr: 1.25 }
  if (width <= 1180) return { count: 40, dpr: 1.5 }
  return { count: 52, dpr: 2 }
}
