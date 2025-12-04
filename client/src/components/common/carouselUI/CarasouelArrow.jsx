import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function CarasouelArrow({ prevSlide, nextSlide}) {
  return (
    <>
    <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
    <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  )
}

export default CarasouelArrow