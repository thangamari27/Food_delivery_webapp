import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function PopularMenuContent({itemName, description, price, icon: RupeeIcon, category, styles }) {
  return (
    <div className={styles.container}>
        <Title title={itemName} titleStyle={styles.title} />

        <Paragraph paragraph={description} paragraphStyle={styles.description} />
        
        <div className={styles.priceContainer.container}>
            <Paragraph paragraph={category} paragraphStyle={styles.priceContainer.category} />
            <span>
              {RupeeIcon && <RupeeIcon className={styles.priceContainer.icon} />}
              <Paragraph paragraph={price} paragraphStyle={styles.priceContainer.price} />
            </span>
        </div>
    </div>
  )
}

export default PopularMenuContent