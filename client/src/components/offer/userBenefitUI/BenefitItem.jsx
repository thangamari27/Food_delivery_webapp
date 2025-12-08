import React from 'react'
import IconComponent from '@/components/common/IconComponent'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function BenefitItem({ icon, title, description, styles }) {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.iconContainer}>
                <IconComponent Icon={icon} className={styles.icon} />
            </div>
            <div className={styles.content}>
                <Title title={title} titleStyle={styles.title} />
                <Paragraph paragraph={description} paragraphStyle={styles.description} />
            </div>
        </div>
    </div>
  )
}

export default BenefitItem