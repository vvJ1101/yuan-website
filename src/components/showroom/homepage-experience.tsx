'use client'

import { ProductTunnel } from './product-tunnel'

export function HomepageExperience() {
  return (
    <div className="showroom-cover__experience">
      <ProductTunnel />
      <div className="showroom-cover__statement">
        <h1>
          <span>Connecting creativity,</span>{' '}
          <span>markets and the world.</span>
        </h1>
      </div>
    </div>
  )
}
