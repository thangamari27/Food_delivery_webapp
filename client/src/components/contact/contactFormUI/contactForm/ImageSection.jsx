import Image from '@/components/common/Image'

function ImageSection({ src, srcFallback, alt, styles }) {
  return (
    <div className="w-full md:w-1/2 lg:w-auto flex-shrink-0 hidden lg:block">
        <Image 
          src={src}
          srcFallback={srcFallback}
          alt={alt}
          pictureStyle={styles.picture}
          imageStyle={styles.image}
        />
  </div>
  )
}

export default ImageSection