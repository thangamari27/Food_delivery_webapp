import React, { useState, useEffect } from 'react'
import CarasouelArrow from './CarasouelArrow';
import CarasouelSlide from './CarasouelSlide';
import ScrollNavigation from './ScrollNavigation';

function HeroCarousel({ slides  }) {
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
     <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
      {/* Carasouel slide component */}
      <CarasouelSlide slides={slides} currentSlide={currentSlide} />
      
      {/* Carasouel left and right arrow */}
      <CarasouelArrow prevSlide={prevSlide} nextSlide={nextSlide} />
      
      {/* Carasouel scroll navigation */}
      <ScrollNavigation slides={slides} goToSlide={goToSlide} currentSlide={currentSlide} />
    </div>
  )
}

export default HeroCarousel