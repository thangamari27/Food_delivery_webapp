import React from 'react'

function CarasouelSlide( { slides, currentSlide} ) {
  return (
    <>
        {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`${slide.bgColor} h-full flex items-center justify-between px-8 md:px-16`}>
            <div className="text-white z-10 max-w-md">
              <h2 className="text-5xl md:text-7xl font-bold mb-2">{slide.title}</h2>
              <p className="text-2xl md:text-3xl font-semibold">{slide.subtitle}</p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 md:w-3/6 ">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover rounded-l-full md:brightness-100 sm:brightness-75 brightness-50"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CarasouelSlide