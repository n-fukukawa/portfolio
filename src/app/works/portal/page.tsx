'use client'

import './index'

export default function FireflyPortal() {
  return (
    <div className="fixed left-0" style={{ top: 90 }}>
      <canvas className="webgl"></canvas>
      <div className="loading-bar"></div>
    </div>
  )
}
