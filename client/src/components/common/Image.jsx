import { getCloudinaryUrl } from "../../utils/handler/cloudinary";

function Image({ 
  src, 
  srcFallback, 
  alt, 
  width, 
  height, 
  imageStyle, 
  pictureStyle,
}) {
  const isCloudinarySrc = typeof src === "object" && src?.publicId;

  let mainSrc = src;
  let fallbackSrc = srcFallback;

  if (isCloudinarySrc) {
    mainSrc = getCloudinaryUrl({
      publicId: src.publicId,
      resourceType: 'image',
      format: src.format || "webp",
      width,
      height,
    });

    fallbackSrc = getCloudinaryUrl({
      publicId: srcFallback?.publicId || src.publicId,
      resourceType: "image",
      format: srcFallback?.format || "jpg",
      width,
      height,
    });
  }

  return (
    <picture className={pictureStyle}>
      {src?.format === "webp" && (
        <source type="image/webp" srcSet={mainSrc} />
      )}

      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={imageStyle}
        decoding="async"
        loading="lazy"
      />
    </picture>
  );
}

export default Image;