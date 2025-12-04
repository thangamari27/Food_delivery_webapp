import React from 'react'

function Image({ src, srcFallback, alt, width, height, imageStyle, pictureStyle }) {
  return (
    <picture className={pictureStyle}>
        <source type='image/webp' srcSet={src} />
        <img 
            src={srcFallback} 
            alt={alt} 
            width={width} 
            height={height} 
            className={imageStyle}
            decoding="async"
            loading="lazy"
        />
    </picture>
  )
}

export default Image