import React, { useRef, useState, useEffect } from "react";
import OfferCardHeader from "./OfferCardHeader";
import OfferCardFooter from "./OfferCardFooter";
import OfferExpandPanel from "./OfferExpandPanel";
import OfferBackgroundImage from "./OfferBackgroundImage";
import { useNavigate } from "react-router-dom";

function OfferCard({ offer }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // auto-scroll on opening
  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${offer.bgColor} shadow-lg transition-transform`}
      aria-live="polite"
      onClick={() => navigate(`/order/${offer.id}`)}
    >
      <OfferBackgroundImage offer={offer} />

      {/* CONTENT */}
      <div className="relative p-5 text-white flex flex-col justify-between h-full min-h-[320px]">
        <OfferCardHeader offer={offer} />

        <OfferCardFooter offer={offer} expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* EXPAND PANEL */}
      <OfferExpandPanel expanded={expanded} offer={offer} setExpanded={setExpanded} />
    </div>
  );
}

export default OfferCard;
