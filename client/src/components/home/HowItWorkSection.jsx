import React from 'react'
import CardList from '../common/cardWrapper/CardList'
import StepHeader from './deliveryStepsUI/StepHeader'
import { howItWorkContent } from '@/utils/constant/admin/HomeConstant'
import { cardStylesConfig, gridStylesConfig } from '@/utils/styles/Common'
import { howItWorkStyles } from '@/utils/styles/HomeStyle'

function HowItWorkSection() {
  const styles = howItWorkStyles;
  return (
    <section className={styles.section}>
       <div className={styles.container}>
            {/* delivery step Section Header */}
            <StepHeader 
              title={howItWorkContent.title} 
              subTitle={howItWorkContent.subTitle}  
              description={howItWorkContent.description}
              styles={styles.stepHeader}
            />

            {/* delivery step Section Card */}
            <CardList
              items={howItWorkContent.howItWorksData}
              cardStyles={cardStylesConfig.howItWorks}
              gridStyles={gridStylesConfig.howItWorks}
              cardType={howItWorkContent.cardType}
            />
       </div>
    </section>
  )
}

export default HowItWorkSection