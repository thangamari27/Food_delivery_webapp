import React from 'react'

function OfferBadge({ text, styles }) {
  return (
    <div className={styles.container}>
        <div className={styles.leftLine}></div>
        <span className={styles.badge}>
          {text}
        </span>
        <div className={styles.rightLine}></div>
    </div>
  )
}

export default OfferBadge