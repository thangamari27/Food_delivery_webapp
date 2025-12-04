import React from 'react'
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';

function WhyChooseCard({ features, styles }) {
  return (
    <div className={styles.grid}>
        {features.map((features) => {
            const IconCompoent = features.icon;

            return (
                <div key={features.id} className={styles.featureCard}>
                    <div className={styles.iconContainer}>
                        <IconCompoent className={styles.icon} />
                    </div>
                    <Title title={features.title} titleStyle={styles.featureTitle} />
                    <Paragraph paragraph={features.description} paragraphStyle={styles.featureDescription} />
                </div>
            );
        })}
    </div>
  )
}

export default WhyChooseCard