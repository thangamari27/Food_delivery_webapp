import React from 'react'
import { heroSection } from '@/utils/constant/admin/ContactConstant'
import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'
import Paragraph from '@/components/common/Paragraph'

function HeroSection() {
  return (
    <section className='py-20 md:py-16 lg:py-32 bg-gradient-to-br from-orange-50 via-white to-orange-50'>
        <div className='container mx-auto px-4 md:px-16 lg:px-24 xl:px-32'>
            <div className='text-center'>
               <Title 
                    title={heroSection.title.title} 
                    titleStyle={heroSection.title.titleStyle} 
               /> 
               <SubTitle 
                    subTitle={heroSection.subTitle.subHeading} 
                    subTitleStyle={heroSection.subTitle.subTitleStyle} 
               />
               <Paragraph 
                    paragraph={heroSection.paragraph.paragraph} 
                    paragraphStyle={heroSection.paragraph.paragraphStyle} 
               />
               <Paragraph 
                    paragraph={heroSection.description.description} 
                    paragraphStyle={heroSection.description.descriptionStyle} 
               />
            </div>
        </div>
    </section>
  )
}

export default HeroSection