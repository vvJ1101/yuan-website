'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { productTunnelImages } from './product-tunnel-images'
import {
  createTunnelLayout,
  getTunnelBudget,
  getTunnelFrame,
  selectTunnelImages,
} from './product-tunnel-model.mjs'

const CAMERA_Z = 5
const TAIL_Z = -78
const SPACING = 1.9
const BASE_SCALE_MULTIPLIER = 1.12
const CYCLE_SECONDS = 12
const SPEED_PRESETS = {
  slow: 0.44,
  normal: 0.77,
  fast: 0.72,
} as const

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
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = CAMERA_Z

    const geometry = new THREE.PlaneGeometry(1, 1)
    const textureLoader = new THREE.TextureLoader()
    const meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []
    const textures: THREE.Texture[] = []
    const startedAt = performance.now()
    let previousTime = startedAt
    let cycleTime = 0
    let animationFrame = 0
    let disposed = false
    let announcedReady = false

    const imageSlots = selectTunnelImages(productTunnelImages, getTunnelBudget(window.innerWidth, false).count)
    const count = imageSlots.length
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
      mesh.scale.set(baseSize * BASE_SCALE_MULTIPLIER, baseSize * BASE_SCALE_MULTIPLIER * 1.1, 1)
      mesh.userData.baseScaleX = baseSize * BASE_SCALE_MULTIPLIER
      mesh.userData.baseScaleY = baseSize * BASE_SCALE_MULTIPLIER * 1.1
      mesh.userData.entranceDelay = index * 0.035
      mesh.userData.phase = index / count
      scene.add(mesh)
      meshes.push(mesh)

      window.setTimeout(() => {
        if (disposed) return
        textureLoader.load(imageSlots[index], (texture) => {
          if (disposed) {
            texture.dispose()
            return
          }
          texture.colorSpace = THREE.SRGBColorSpace
          texture.generateMipmaps = true
          texture.minFilter = THREE.LinearMipmapLinearFilter
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
            mesh.userData.baseScaleX = baseSize * aspect * BASE_SCALE_MULTIPLIER
            mesh.userData.baseScaleY = baseSize * BASE_SCALE_MULTIPLIER * 1.06
          } else {
            mesh.userData.baseScaleX = baseSize * BASE_SCALE_MULTIPLIER
            mesh.userData.baseScaleY = baseSize / aspect * BASE_SCALE_MULTIPLIER
          }
          if (mesh.userData.baseScaleY > 0) {
            mesh.userData.baseScaleY *= 1.05
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
      if (!document.hidden) cycleTime += delta * (speedMultiplier / SPEED_PRESETS.normal) / CYCLE_SECONDS
      for (const mesh of meshes) {
        const entranceTime = Math.max(0, (now - startedAt) / 1000 - mesh.userData.entranceDelay)
        const entrance = Math.min(entranceTime / 0.75, 1)
        const easedEntrance = 1 - (1 - entrance) ** 4
        const frame = getTunnelFrame(mesh.userData.phase + cycleTime)
        mesh.position.z = frame.z
        mesh.material.opacity = easedEntrance * frame.opacity
        mesh.visible = frame.opacity > 0 && mesh.material.map !== null
        mesh.scale.set(
          mesh.userData.baseScaleX,
          mesh.userData.baseScaleY,
          1,
        )
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
          src="/images/showroom/home-tunnel/5fef74d3ae8c4fef9a864ba1f4074699.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
    </div>
  )
}
