import React from 'react'
import { whyChooseUsContent } from '@/utils/constant/admin/AboutConstant'
import { whyChooseUsStyle } from '@/utils/styles/AboutStyle'
import WhyChooseHeader from './whyChooseUI/WhyChooseHeader';
import WhyChooseCard from './whyChooseUI/WhyChooseCard';

function WhyChooseUsSection() {
  const styles = whyChooseUsStyle.whyChooseUs;
  const stats = whyChooseUsStyle.stats;
  const content = whyChooseUsContent.stats;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* Why choose us header section content */}
            <WhyChooseHeader whyChooseUsContent={whyChooseUsContent} styles={styles} />

            {/* why choose us card section content */}
            <WhyChooseCard features={whyChooseUsContent.features} styles={styles} />
        </div>
        
    </section>
  )
}

export default WhyChooseUsSection