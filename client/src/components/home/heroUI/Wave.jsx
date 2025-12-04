import React from 'react'

function Wave({ styles }) {
  return (
    <div className={styles.waveContainer}>
        <svg viewBox="0 0 200 100" className={styles.waveSvg}>
          <path d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 L200,100 L0,100 Z" />
          <path d="M0,70 Q25,50 50,70 T100,70 T150,70 T200,70 L200,100 L0,100 Z" className="fill-orange-300" />
        </svg>
    </div>
  )
}

export default Wave