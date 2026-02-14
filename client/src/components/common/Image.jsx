import { useState } from 'react';
import { getCloudinaryUrl } from "../../utils/handler/cloudinary";

// Centralized placeholder URL
const PLACEHOLDER_IMAGE = "https://placehold.co/400x400/FF4F00/white?text=No+Image";

function Image({ 
  src, 
  srcFallback, 
  alt, 
  width, 
  height, 
  imageStyle, 
  pictureStyle,
}) {
  const [error, setError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  // Check if src is Cloudinary object
  const isCloudinarySrc = typeof src === "object" && src?.publicId;
  const isFallbackCloudinary = typeof srcFallback === "object" && srcFallback?.publicId;

  // Generate main source
  let mainSrc = PLACEHOLDER_IMAGE; // Default to placeholder
  
  if (isCloudinarySrc && src.publicId) {
    mainSrc = getCloudinaryUrl({
      publicId: src.publicId,
      resourceType: 'image',
      format: src.format || "webp",
      width,
      height,
    });
  } else if (typeof src === 'string' && src) {
    mainSrc = src;
  }

  // Generate fallback source
  let fallbackSrc = PLACEHOLDER_IMAGE; // Default to placeholder
  
  if (isFallbackCloudinary && srcFallback.publicId) {
    fallbackSrc = getCloudinaryUrl({
      publicId: srcFallback.publicId,
      resourceType: "image",
      format: srcFallback.format || "jpg",
      width,
      height,
    });
  } else if (typeof srcFallback === 'string' && srcFallback) {
    fallbackSrc = srcFallback;
  } else if (isCloudinarySrc && src.publicId) {
    // Use JPG version of main image as fallback
    fallbackSrc = getCloudinaryUrl({
      publicId: src.publicId,
      resourceType: "image",
      format: "jpg",
      width,
      height,
    });
  }

  /**
   * Handle image load errors
   * Progressive fallback: main → fallback → placeholder
   */
  const handleError = (e) => {
    if (!error) {
      // First error: Try fallback
      setError(true);
      e.target.src = fallbackSrc;
    } else if (!fallbackError) {
      // Second error: Use placeholder
      setFallbackError(true);
      e.target.src = PLACEHOLDER_IMAGE;
    }
  };

  // Determine which source to use
  const displaySrc = error ? (fallbackError ? PLACEHOLDER_IMAGE : fallbackSrc) : mainSrc;

  return (
    <picture className={pictureStyle}>
      {/* WebP source for modern browsers */}
      {!error && src?.format === "webp" && (
        <source type="image/webp" srcSet={mainSrc} />
      )}

      {/* Main image with error handling */}
      <img
        src={displaySrc}
        alt={alt || "Food item"}
        width={width}
        height={height}
        className={imageStyle}
        decoding="async"
        loading="lazy"
        onError={handleError}
      />
    </picture>
  );
}

export default Image;