import { serviceHeroContent } from "@/utils/constant/admin/ServiceConstant"
import { serviceHeroStyles } from "@/utils/styles/ServiceStyle"
import LeftContent from "./heroUI/LeftContent"
import Image from '@/components/common/Image'

function HeroSection() {
  const content = serviceHeroContent;
  const styles = serviceHeroStyles;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Hero left layout content */}
                <LeftContent content={content.leftContent} styles={styles.leftStyle} />
                {/* Hero right layout content */}
                <div className={styles.rightStyle.container}>
                    <Image 
                        src={content.rightContent.src}
                        srcFallback={content.rightContent.srcFallback}
                        alt={content.rightContent.alt}
                        pictureStyle={styles.rightStyle.picture}
                        imageStyle={styles.rightStyle.image}
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection