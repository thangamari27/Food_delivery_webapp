import React from 'react'

function ImageSection({ src, alt }) {
  return (
    <div className="w-full md:w-1/2 lg:w-auto flex-shrink-0 hidden lg:block">
        <img
        className="max-w-sm w-full rounded-xl h-full shadow-lg object-cover"
        src={src}
        alt={alt}
        />
  </div>
  )
}

export default ImageSection