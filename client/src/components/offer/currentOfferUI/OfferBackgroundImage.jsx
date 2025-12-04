import React from 'react'

function OfferBackgroundImage({ offer }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img
        src={offer.image}
        alt={offer.title}
        className="w-full h-full object-cover scale-[1.03] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />
    </div>
  )
}

export default OfferBackgroundImage