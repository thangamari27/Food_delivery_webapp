import { useRef, useState, useEffect } from "react";
import OfferCardHeader from "./OfferCardHeader";
import OfferCardFooter from "./OfferCardFooter";
import OfferExpandPanel from "./OfferExpandPanel";
import OfferBackgroundImage from "./OfferBackgroundImage";
import { useNavigate } from "react-router-dom";

function OfferCard({ offer, styles }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // auto-scroll on opening
  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className={`${offer.bgColor} ${styles.card}`}
      aria-live="polite"
      onClick={() => navigate(`/order/${offer.id}`)}
    >
      <OfferBackgroundImage offer={offer} styles={styles.offerBgImage} />

      {/* CONTENT */}
      <div className={styles.offerCardHeader.container}>
        <OfferCardHeader offer={offer} styles={styles.offerCardHeader} />

        <OfferCardFooter offer={offer} expanded={expanded} setExpanded={setExpanded} styles={styles.offerCardFooter} />
      </div>

      {/* EXPAND PANEL */}
      <OfferExpandPanel expanded={expanded} offer={offer} setExpanded={setExpanded} panelContent={offer.panelContent} styles={styles.offerPanel} />
    </div>
  );
}

export default OfferCard;
