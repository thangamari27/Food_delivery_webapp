import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import SubTitle from '@/components/common/SubTitle'

function FaqHeader({ title, subTitle, description, styles }) {
  return (
    <>
        <Title 
            title={title} 
            titleStyle={styles.title} 
        />
        <SubTitle 
            subTitle={subTitle}
            subTitleStyle={styles.subTitle}
        />
        <Paragraph 
            paragraph={description} 
            paragraphStyle={styles.description} 
        />
    </>
  )
}

export default FaqHeader