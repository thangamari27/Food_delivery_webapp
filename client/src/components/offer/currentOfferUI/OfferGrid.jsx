import OfferCard from "./OfferCard";

function OfferGrid({ content, styles }) {
  return (
    <div className={styles.container}>
      {content.map((offer) => (
        <OfferCard 
          key={offer.id} 
          offer={offer} 
          styles={styles}
        />
      ))}
    </div>
  )
}

export default OfferGrid