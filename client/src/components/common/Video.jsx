import { getCloudinaryUrl } from "@/utils/handler/cloudinary";

function Video({
  className,
  src,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = true,
  width,
  height,
  onError,
}) {
  const isCloudinarySrc = typeof src === "object" && src?.publicId;

  const videoSrc = isCloudinarySrc
    ? getCloudinaryUrl({
        publicId: src.publicId,
        resourceType: "video",
        format: src.format || "mp4",
        width,
        height,
      })
    : src;

  const posterSrc =
    typeof poster === "object" && poster?.publicId
      ? getCloudinaryUrl({
          publicId: poster.publicId,
          format: poster.format || "jpg",
          width,
          height,
        })
      : poster;

  return (
    <video
      className={className}
      src={videoSrc}
      poster={posterSrc}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      width={width}
      height={height}
      onError={onError}
    />
  );
}

export default Video;