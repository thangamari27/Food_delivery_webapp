import React from 'react'
import { pageNotFoundSection, pageNotFoundStyle } from '@/utils/constant/admin/PageNotFoundConstant'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph';
import Button from '@/components/common/Button'

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-sm py-20 md:py-16 lg:py-32 bg-amber-50">
        <Title 
          title={pageNotFoundSection.title} 
          titleStyle={pageNotFoundStyle.titleStyle}  
        />

        <Paragraph 
          paragraph={pageNotFoundSection.description}  
          paragraphStyle={pageNotFoundStyle.description}
        />

        <Button 
          buttonText={pageNotFoundSection.buttonText} 
          buttonLink={pageNotFoundSection.buttonLink}
          buttonStyle={pageNotFoundStyle.buttonStyle}  
        />
    </div>
  )
}

export default PageNotFound