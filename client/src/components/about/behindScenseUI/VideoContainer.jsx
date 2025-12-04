import React from 'react'

function VideoContainer({ videoContent, imageContent,styles }) {
  return (
    <div className={styles.imageContainer}>
        {videoContent.src ? (
            <video
            className={styles.mainImage}
            src={videoContent.src}
            poster={videoContent.srcFallback}
            autoPlay
            muted
            loop
            playsInline
            controls
            width={videoContent.width}
            height={videoContent.height}
            onError={(e) => {
                // If video fails, replace with fallback image
                e.target.outerHTML = `
                <img
                    src="${imageContent.srcFallback}"
                    alt="${imageContent.alt}"
                    class="${styles.mainImage}"
                />
                `;
            }}
            />
        ) : (
            // If no video src, but fallback exists → show fallback image
            imageContent.srcFallback ? (
            <img
                src={imageContent.srcFallback}
                alt={imageContent.alt}
                className={styles.mainImage}
            />
            ) : null
        )}
    </div>
  )
}

export default VideoContainer