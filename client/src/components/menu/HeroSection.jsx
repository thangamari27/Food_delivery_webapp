import Carousel from '@/components/common/Carousel'
import { heroContent } from '@/utils/constant/admin/MenuConstant'
import { menuHeroStyle } from '@/utils/styles/MenuStyle'

function HeroSection() {
  const styles = menuHeroStyle;
  return (
    <section className={styles.section}>
        <Carousel 
          carouselContent={heroContent.heroCarousel} 
          styles={ styles.carousel } 
        />
    </section>
  )
}

export default HeroSection