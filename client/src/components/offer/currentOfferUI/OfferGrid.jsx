import React from 'react'

import OfferCard from "./OfferCard";
import { currentOfferSection } from "@/utils/constant/user/OfferConstant";

function OfferGrid() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentOfferSection.activeOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer}  />
      ))}
    </div>
  )
}

export default OfferGrid