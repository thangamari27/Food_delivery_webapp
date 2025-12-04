import React from 'react'
import FaqHeader from './contactFormUI/faq/FaqHeader'
import FaqList from './contactFormUI/faq/FaqList'
import { faqSection } from '@/utils/constant/admin/ContactConstant'

function FaqSection() {
  
  return (
    <section className='py-20 md:py-16 lg:py-32 bg-gray-200'>
        <div className='container mx-auto px-4 md:px-16 lg:px-24 xl:px-32'>
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center px-4 md:px-0">
                {/* Faq section Header */}
                <FaqHeader title={faqSection.title} subTitle={faqSection.subTitle} description={faqSection.description} />
                
                {/* Faq section List */}
                <FaqList faqData={faqSection.faqData} />
            </div>
        </div>
    </section>
  )
}

export default FaqSection