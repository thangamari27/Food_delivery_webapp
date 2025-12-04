import React from "react";
import StarIcon from "./StarIcon";

function HalfStar() {
  return (
    <span className="relative inline-block text-yellow-400">
      {/* Filled left half */}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: "50%" }}
      >
        <StarIcon filled={true} />
      </span>

      {/* Outline star behind */}
      <span className="relative text-gray-300">
        <StarIcon filled={false} />
      </span>
    </span>
  );
}

export default HalfStar;