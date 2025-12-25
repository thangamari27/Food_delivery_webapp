import { useState } from "react";
import Video from "../../common/Video";
import Image from "../../common/Image";

function VideoContainer({ videoContent, imageContent, styles }) {
  const [videoError, setVideoError] = useState(false);

  const showVideo = videoContent?.src && !videoError;

  return (
    <div className={styles.imageContainer}>
      {showVideo ? (
        <Video
          className={styles.mainImage}
          src={videoContent.src}
          poster={videoContent.srcFallback}
          width={videoContent.width}
          height={videoContent.height}
          onError={() => setVideoError(true)}
        />
      ) : imageContent?.srcFallback ? (
        <Image
          src={imageContent.src}
          srcFallback={imageContent.srcFallback}
          alt={imageContent.alt}
          width={imageContent.width}
          height={imageContent.height}
          imageStyle={styles.mainImage}
        />
      ) : null}
    </div>
  );
}

export default VideoContainer;
