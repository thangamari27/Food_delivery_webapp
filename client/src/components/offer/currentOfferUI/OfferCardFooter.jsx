import React from 'react'

function OfferCardFooter({ offer, expanded, setExpanded }) {
  return (
     <div className="mt-4 flex items-center justify-between">
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent redirect
          setExpanded(true);
        }}
        aria-expanded={expanded}
        aria-controls={`offer-panel-${offer.id}`}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 110-16 8 8 0 010 16z" />
        </svg>
        <span className="hidden sm:inline">Details</span>
      </button>

      <div className="text-xs text-white/90">
        Ends: <span className="font-medium">
          {new Date(offer.endTime).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default OfferCardFooter