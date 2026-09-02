'use client'

import { ProductTunnel } from './product-tunnel'

export function HomepageExperience() {
  return (
    <div className="showroom-cover__experience">
      <ProductTunnel />
      <div className="showroom-cover__statement">
        <h1>Connecting creativity, markets and the world.</h1>
      </div>
    </div>
  )
}
