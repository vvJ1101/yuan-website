'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { productTunnelImages } from './product-tunnel-images'
import {
  createTunnelLayout,
  getTunnelBudget,
  recycleTunnelDepth,
} from './product-tunnel-model.mjs'

const CAMERA_Z = 5
const TAIL_Z = -78
const SPACING = 2
const SPEED_PRESETS = {
  slow: 0.22,
  normal: 0.3,
  fast: 0.36,
} as const

function easeOutExpo(value: number) {
  return value >= 1 ? 1 : 1 - 2 ** (-10 * value)
}

function getSpeedMultiplier() {
  if (typeof window === 'undefined') return SPEED_PRESETS.normal
  const value = window.localStorage.getItem('ys-tunnel-speed')
  if (value === 'slow' || value === 'normal' || value === 'fast') return SPEED_PRESETS[value]
  return SPEED_PRESETS.normal
}

export function ProductTunnel() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      root.dataset.state = 'fallback'
      return
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'high-performance' })
    } catch {
      root.dataset.state = 'fallback'
      return
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    scene.fog = new THREE.Fog(0xffffff, 0, 78)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = CAMERA_Z

    const geometry = new THREE.PlaneGeometry(1, 1)
    const textureLoader = new THREE.TextureLoader()
    const meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []
    const textures: THREE.Texture[] = []
    const startedAt = performance.now()
    let previousTime = startedAt
    let animationFrame = 0
    let disposed = false
    let announcedReady = false

    const { count } = getTunnelBudget(window.innerWidth, false)
    const speedMultiplier = getSpeedMultiplier()
    const layout = createTunnelLayout(count, { radius: 10, spacing: SPACING, tailZ: TAIL_Z })

    layout.forEach((point, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const baseSize = 1 + ((index * 37) % 101) / 100
      mesh.position.set(point.x, point.y, point.z)
      mesh.scale.set(baseSize * 0.75, baseSize, 1)
      mesh.userData.baseScaleX = baseSize * 0.75
      mesh.userData.baseScaleY = baseSize
      mesh.userData.baseY = point.y
      mesh.userData.wobble = (index * 0.22) % (Math.PI * 2)
      mesh.userData.entranceDelay = index * 0.05
      mesh.userData.pulseDelay = index * 0.08
      scene.add(mesh)
      meshes.push(mesh)

      window.setTimeout(() => {
        if (disposed) return
        textureLoader.load(productTunnelImages[index % productTunnelImages.length], (texture) => {
          if (disposed) {
            texture.dispose()
            return
          }
          texture.colorSpace = THREE.SRGBColorSpace
          texture.generateMipmaps = false
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          material.map = texture
          material.color.set(0xffffff)
          material.needsUpdate = true
          textures.push(texture)

          const image = texture.image as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number }
          const width = image.naturalWidth ?? image.width ?? 1
          const height = image.naturalHeight ?? image.height ?? 1
          const aspect = width / height
          if (aspect >= 1) mesh.scale.set(baseSize * aspect, baseSize, 1)
          else mesh.scale.set(baseSize, baseSize / aspect, 1)
          if (aspect >= 1) {
            mesh.userData.baseScaleX = baseSize * aspect
            mesh.userData.baseScaleY = baseSize
          } else {
            mesh.userData.baseScaleX = baseSize
            mesh.userData.baseScaleY = baseSize / aspect
          }
        })
      }, Math.min(index * 28, 900))
    })

    const resize = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      const budget = getTunnelBudget(window.innerWidth, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.dpr))
      renderer.setSize(width, height, false)
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      root.dataset.state = 'fallback'
    }

    const render = (now: number) => {
      const delta = Math.min((now - previousTime) / 1000, 0.05)
      previousTime = now
      const elapsed = Math.min((now - startedAt) / 1100, 1)
      const startupSpeed = 300 + (10 - 300) * easeOutExpo(elapsed)
      const speed = startupSpeed * speedMultiplier

      const tail = Math.min(...meshes.map((candidate) => candidate.position.z)) - SPACING
      for (const mesh of meshes) {
        const entranceTime = Math.max(0, (now - startedAt) / 1000 - mesh.userData.entranceDelay)
        const entrance = Math.min(entranceTime / 0.75, 1)
        const easedEntrance = 1 - (1 - entrance) ** 4
        const life = (mesh.position.z - TAIL_Z) / (CAMERA_Z - TAIL_Z)
        const depthFade = THREE.MathUtils.lerp(0.16, 1, THREE.MathUtils.clamp(life, 0, 1))
        const pulseTime = now * 0.0015 + mesh.userData.pulseDelay
        const pulse = 1 + Math.sin(pulseTime) * 0.04
        const wobble = Math.sin(now * 0.001 + mesh.userData.wobble) * 0.18
        mesh.material.opacity = easedEntrance * depthFade
        mesh.rotation.z = Math.sin(mesh.position.z * 0.08) * 0.03
        mesh.position.y = mesh.userData.baseY + wobble
        mesh.scale.set(
          mesh.userData.baseScaleX * (1 + Math.sin(pulseTime) * 0.04),
          mesh.userData.baseScaleY * (1 - Math.sin(pulseTime) * 0.02),
          1,
        )
        mesh.position.z = recycleTunnelDepth(mesh.position.z, speed, delta, CAMERA_Z, tail)
      }

      renderer.render(scene, camera)
      if (!announcedReady) {
        announcedReady = true
        root.dataset.state = 'ready'
      }
      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('webglcontextlost', onContextLost)
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      for (const mesh of meshes) mesh.material.dispose()
      for (const texture of textures) texture.dispose()
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="product-tunnel" ref={rootRef} data-state="loading" aria-hidden="true">
      <canvas className="product-tunnel__canvas" ref={canvasRef} />
      <div className="product-tunnel__fallback">
        <Image
          src="/images/showroom/brand-room/ranyepersonal-main.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
    </div>
  )
}
