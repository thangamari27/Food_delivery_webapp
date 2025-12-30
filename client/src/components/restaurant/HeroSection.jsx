import { heroContent } from '@/utils/constant/admin/RestaurantConstant'
import { heroStyles } from '@/utils/styles/RestaurantStyle';
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function HeroSection() {
  const content = heroContent;
  const styles = heroStyles;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <Title title={content.title} titleStyle={styles.title} />
                <Paragraph paragraph={content.description} paragraphStyle={styles.description} />
            </div>
        </div>
    </section>
  )
}

export default HeroSection