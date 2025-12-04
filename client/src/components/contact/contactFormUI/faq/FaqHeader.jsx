import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import SubTitle from '@/components/common/SubTitle'

function FaqHeader({ title, subTitle, description }) {
  return (
    <>
        <Title 
            title={title.title} 
            titleStyle={title.titleStyle} 
        />
        <SubTitle 
            subTitle={subTitle.subTitle}
            subTitleStyle={subTitle.subTitleStyle}
        />
        <Paragraph 
            paragraph={description.description} 
            paragraphStyle={description.descriptionStyle} 
        />
    </>
  )
}

export default FaqHeader