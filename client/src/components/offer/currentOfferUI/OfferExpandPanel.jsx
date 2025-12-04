import React from 'react'

function OfferExpandPanel({ expanded, offer, setExpanded }) {
  return (
     <div
      id={`offer-panel-${offer.id}`}
      className={`absolute inset-x-0 bottom-0 bg-white/95 text-slate-900 rounded-t-xl shadow-2xl 
        transition-transform duration-300 ${expanded ? "translate-y-0" : "translate-y-full"}`}
      style={{ minHeight: "120px" }}
      role="region"
      aria-hidden={!expanded}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h4 className="text-lg font-bold">{offer.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{offer.subtitle}</p>
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="p-2 rounded-md hover:bg-slate-100"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-700 space-y-3">
          <p><strong>Offer:</strong> {offer.discount}</p>

          <p><strong>What's included:</strong> Combo deals, fast delivery.</p>

          <div className="flex gap-3 mt-2">
            <button className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold">
              Order Now
            </button>
            <button className="px-4 py-2 rounded-md border border-slate-200">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferExpandPanel