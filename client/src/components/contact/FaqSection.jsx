import React from 'react'
import FaqHeader from './contactFormUI/faq/FaqHeader'
import FaqList from './contactFormUI/faq/FaqList'
import { faqSection } from '@/utils/constant/admin/ContactConstant'
import { faqStyles } from '@/utils/styles/ContactStyle'

function FaqSection() {
  const styles = faqStyles;
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Faq section Header */}
                <FaqHeader 
                  title={faqSection.title} 
                  subTitle={faqSection.subTitle} 
                  description={faqSection.description} 
                  styles={styles.header}  
                />
                
                {/* Faq section List */}
                <FaqList 
                  faqData={faqSection.faqData} 
                  styles={styles.faqList} 
                />
            </div>
        </div>
    </section>
  )
}

export default FaqSection