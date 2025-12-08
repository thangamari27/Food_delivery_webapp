import Carousel from '@/components/common/Carousel'
import { offerHeroContent } from '@/utils/constant/admin/OfferConstant'
import { offerHeroStyle } from '@/utils/styles/OfferStyle'

function OfferSection() {
  const content  = offerHeroContent;
  const styles = offerHeroStyle;

  return (
    <section className={styles.section}>
        <Carousel 
          carouselContent={content.heroCarousel}
          styles={styles.carousel}
        />
    </section>
  )
}

export default OfferSection