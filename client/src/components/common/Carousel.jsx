import React from 'react'
import HeroCarousel from './carouselUI/HeroCarousel'

function Carousel({ carouselContent, styles }) {
  return (
    <HeroCarousel slides={ carouselContent } />
  )
}

export default Carousel