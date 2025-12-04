import React from 'react'

function TimerBox ({ value, label, isAnimating, styles }) {
  return (
    <div className={styles.wrapper}>
        <div className={`${styles.boxContainer} ${isAnimating ? 'scale-95' : 'scale-100'}`}>
        <span className={styles.timeText}>
            {String(value).padStart(2, '0')}
        </span>
        </div>
        <span className={styles.label}>
        {label}
        </span>
    </div>
  )
}

export default TimerBox 