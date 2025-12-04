import React from 'react'
import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'

function WhyChooseHeader({ whyChooseUsContent, styles }) {
  return (
    <div className={styles.header}>
        <Title title={whyChooseUsContent.title} titleStyle={styles.badge} />
        <SubTitle subTitle={whyChooseUsContent.subTitle} subTitleStyle={styles.title} />
    </div>
  )
}

export default WhyChooseHeader