export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

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
  if (width <= 640) return { count: 32, dpr: 1.25 }
  if (width <= 1180) return { count: 44, dpr: 1.5 }
  return { count: 56, dpr: 2 }
}
