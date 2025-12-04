import React from "react";

function Avatar({ name, size = 48 }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const sizeClass = size === 48 ? "w-12 h-12 text-lg" : `${size}px`;

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${sizeClass}`}
      style={{
        background: "linear-gradient(135deg,#d1d5db,#9ca3af)",
      }}
      aria-hidden
    >
      {initial}
    </div>
  );
}

export default Avatar;