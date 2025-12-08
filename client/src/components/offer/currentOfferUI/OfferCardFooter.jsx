import React from 'react'

function OfferCardFooter({ offer, expanded, setExpanded, styles }) {
  return (
     <div className={styles.container}>
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          setExpanded(true);
        }}
        aria-expanded={expanded}
        aria-controls={`offer-panel-${offer.id}`}
        className={styles.button}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 110-16 8 8 0 010 16z" />
        </svg>
        <span className={styles.detailHide}>Details</span>
      </button>

      <div className={styles.dateContainer}>
        Ends: <span className={styles.date}>
          {new Date(offer.endTime).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default OfferCardFooter