import { heroSection } from '@/utils/constant/admin/ContactConstant'
import { heroStyle } from '@/utils/styles/ContactStyle'
import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'
import Paragraph from '@/components/common/Paragraph'


function HeroSection() {
  const styles = heroStyle;
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.header.container}>
               <Title 
                    title={heroSection.title} 
                    titleStyle={styles.header.title} 
               /> 
               <SubTitle 
                    subTitle={heroSection.subHeading} 
                    subTitleStyle={styles.header.subTitle} 
               />
               <Paragraph 
                    paragraph={heroSection.paragraph} 
                    paragraphStyle={styles.header.paragraph} 
               />
               <Paragraph 
                    paragraph={heroSection.description} 
                    paragraphStyle={styles.header.description} 
               />
            </div>
        </div>
    </section>
  )
}

export default HeroSection