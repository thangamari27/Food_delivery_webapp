import React from 'react'
import { qualityCommitmentStyle } from '@/utils/styles/AboutStyle'
import { qualityCommitmentContent } from '@/utils/constant/admin/AboutConstant'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import CardList from '@/components/common/cardWrapper/CardList'

function QualityCommitment() {
  const styles = qualityCommitmentStyle.qualitySection;
  
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* Quality commitment Header */}
            <Title title={qualityCommitmentContent.title} titleStyle={styles.title} />
            <Paragraph paragraph={qualityCommitmentContent.description} paragraphStyle={styles.description} />

            {/* Quality Commitment Grid */}
            <CardList 
                items={qualityCommitmentContent.qualityCommitmentData}
                cardStyles={styles.qualityWrapper}
                gridStyles={styles.grid}
                cardType={styles.cardType}
            />
        </div>
    </section>
  )
}

export default QualityCommitment