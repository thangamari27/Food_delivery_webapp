import React from 'react'

function ScrollNavigation({ slides, goToSlide, currentSlide, styles }) {
  return (
    <div className={styles.scrollNavContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.scrollButton} ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
  )
}

export default ScrollNavigation