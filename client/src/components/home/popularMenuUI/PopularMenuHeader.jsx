import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function PopularMenuHeader({ title, description, styles }) {
  return (
    <div className={styles.container}>
        {/* popular menu header title */}
        <Title 
          title={title.title} 
          titleStyle={styles.title} 
        />
        {/* popular menu header description */}
        <Paragraph
         paragraph={description.description} 
         paragraphStyle={styles.description} 
        />
    </div>
  )
}

export default PopularMenuHeader