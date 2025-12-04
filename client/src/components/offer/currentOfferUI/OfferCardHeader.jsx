import React from 'react'

function OfferCardHeader({ offer }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="max-w-[70%]">
        <h3 className="text-lg md:text-xl font-extrabold drop-shadow-sm">
          {offer.title}
        </h3>
        <p className="text-sm md:text-base opacity-95 mt-1">
          {offer.subtitle}
        </p>
      </div>

      <div className="ml-auto">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm">
          {offer.discount}
        </div>
      </div>
    </div>
  )
}

export default OfferCardHeader