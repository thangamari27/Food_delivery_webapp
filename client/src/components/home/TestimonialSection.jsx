import React from 'react'
import TestimonialHeader from './testimonialUI/TestimonialHeader'
import TestimonialCardContent from './testimonialUI/TestimonialCardContent'
import ViewAllButton from './testimonialUI/ViewAllButton'
import { testimonials, testimonialsSection } from '@/utils/constant/admin/HomeConstant'
import { testimonialStyles } from '@/utils/styles/HomeStyle'

function TestimonialSection() {
  const styles = testimonialStyles;
  return (
     <section className={styles.section}>
          <div className={styles.container}>
            {/* Section Header */}
            <TestimonialHeader 
              title={testimonialsSection.title} 
              styles={styles.header} 
            />
    
            {/* Testimonials Grid */}
            <TestimonialCardContent 
              testimonials={testimonials} 
              testimonialsSection={testimonialsSection} 
              styles={styles.testimonialCard} 
            />

          </div>
        </section>
  )
}

export default TestimonialSection