import React from "react";
import StarIcon from "./StarIcon";
import HalfStar from "./HalfStar";

function StarRating({ rating = 5, max = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} filled={true} className="text-yellow-400" />
      ))}

      {/* Half Star */}
      {hasHalf && <HalfStar />}

      {/* Empty Stars */}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          filled={false}
          className="text-gray-300"
        />
      ))}
    </>
  );
}

export default StarRating;
