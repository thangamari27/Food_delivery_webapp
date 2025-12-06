import React, { useState, useEffect } from 'react'
import CarasouelArrow from './CarasouelArrow';
import CarasouelSlide from './CarasouelSlide';
import ScrollNavigation from './ScrollNavigation';

function HeroCarousel({ slides, styles  }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  return (
     <div className={styles.container} >
      {/* Carasouel slide component */}
      <CarasouelSlide slides={slides} 
        currentSlide={currentSlide}
        styles={styles}
      />
      
      {/* Carasouel left and right arrow */}
      <CarasouelArrow prevSlide={prevSlide} 
        nextSlide={nextSlide}
        styles={styles}
      />
      
      {/* Carasouel scroll navigation */}
      <ScrollNavigation slides={slides} goToSlide={goToSlide} currentSlide={currentSlide} styles={styles} />
    </div>
  )
}

export default HeroCarousel