import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function CarasouelArrow({ prevSlide, nextSlide, styles}) {
  return (
    <>
    <button
        onClick={prevSlide}
        className={styles.leftArrow}
      >
        <ChevronLeft className={styles.leftArrowIcon} />
      </button>
      
    <button
        onClick={nextSlide}
        className={styles.rightArrow}
      >
        <ChevronRight className={styles.rightArrowIcon} />
      </button>
    </>
  )
}

export default CarasouelArrow