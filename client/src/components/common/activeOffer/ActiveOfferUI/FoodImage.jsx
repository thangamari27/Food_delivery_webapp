import React from 'react'

function FoodImage({ src, alt, className, position, styles }) {
  return (
    <div className={`${position} ${styles.container}`}>
        <div className={styles.wrapper}>
          <div className={styles.circleContainer}></div>
            <img
                src={src}
                alt={alt}
                className={`${className} ${styles.imageStyle}`}
            />
        </div>
    </div>
  )
}

export default FoodImage