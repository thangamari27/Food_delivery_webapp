import React from 'react'

function ExpireOffer({ offerExpire, offerExpireDescription }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
        <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
            {offerExpire}
        </h1>
        <p className="text-xl text-white/90">
            {offerExpireDescription}
        </p>
        </div>
    </div>
  )
}

export default ExpireOffer