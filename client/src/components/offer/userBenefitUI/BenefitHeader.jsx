import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function BenefitHeader({ header, styles }) {
  return (
    <div className={styles.container}>
        <Title 
            title={header.title} 
            titleStyle={styles.title} 
        />
        <Paragraph 
            paragraph={header.description}
            paragraphStyle={styles.description}
        />
    </div>
  )
}

export default BenefitHeader