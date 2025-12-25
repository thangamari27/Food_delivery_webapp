import Image from "@/components/common/Image"

function FoodImage({ src, srcFallback, alt, height, width, className, position, styles }) {
  return (
    <div className={`${position} ${styles.container}`}>
        <div className={styles.wrapper}>
          <div className={styles.circleContainer}></div>
            <Image 
               src={src}
               srcFallback={srcFallback}
               alt={alt}
               height={height}
               width={width}
               imageStyle={`${className} ${styles.imageStyle}`}
            />
        </div>
    </div>
  )
}

export default FoodImage