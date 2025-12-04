import React from 'react'
import Title from '@/components/common/Title'

function TestimonialHeader({ title, styles }) {
  return (
    <div className={styles.container}>
        <Title title={title} titleStyle={styles.title} />
    </div>
  )
}

export default TestimonialHeader