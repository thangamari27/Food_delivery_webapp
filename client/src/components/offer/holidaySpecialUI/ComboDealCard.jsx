import Image from "@/components/common/Image"

function ComboDealCard({ content, styles }) {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderDecoration}></div>
            </div>
            <div className={styles.cardTitle}>
                <p className={styles.cardTitleText}>{content.title}</p>
            </div>
            <Image 
                src={content.src}
                srcFallback={content.srcFallback}
                alt={content.alt}
                pictureStyle={styles.picture}
                imageStyle={styles.mainImage}
            />       
        </div>
    </div>
  )
}

export default ComboDealCard