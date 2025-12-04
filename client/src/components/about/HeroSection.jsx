import { heroContent } from '@/utils/constant/admin/AboutConstant'
import { heroSectionStyle } from '@/utils/styles/AboutStyle'
import HeroContent from './heroUI/HeroContent'
import HeroImage from './heroUI/HeroImage'

function HeroSection() {
  const styles = heroSectionStyle.hero;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
           {/* Hero section left content */}
           <HeroContent heroContent={heroContent} highlights={heroContent.highlights} styles={styles} />
           
           {/* Hero section right Image */}
          <HeroImage image={heroContent.image} styles={styles} />
        </div>
    </section>
  )
}

export default HeroSection