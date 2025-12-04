import React from 'react'
import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'

function HeroContent({ heroContent, highlights, styles }) {
  const IconComponent = heroContent.highlightsIcon;
  return (
    <div className={styles.left}>
        <Title title={heroContent.badge} titleStyle={styles.badge} />  
        <SubTitle subTitle={heroContent.title} subTitleStyle={styles.title} />
        <Paragraph paragraph={heroContent.description} paragraphStyle={styles.description} />
        {/* <div className={styles.highlightsList}>
            {highlights.map((description, index) => (
            <div key={index} className={styles.highlightItem}>
                <IconComponent className={styles.highlightIcon} />
                <span>
                {description}
                </span>
            </div>
            ))}
        </div> */}
        <Button buttonText={heroContent.button.text} buttonLink={heroContent.button.link} buttonStyle={styles.button} />
    </div>
  )
}

export default HeroContent