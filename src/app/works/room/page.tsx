'use client'

import './room'
// import './background'

export default function Room() {
  return (
    <>
      <div id="room-wrapper" className="flex justify-center">
        <canvas id="room" className="room"></canvas>
      </div>
      {/* <div id="background-wrapper">
        <canvas id="background" className="background"></canvas>
      </div> */}
      <div className="overlay text-center fixed top-1/2 left-1/2">
        <div className="loading-str">Loading...</div>
        <div className="loading-bar"></div>
      </div>
    </>
  )
}
