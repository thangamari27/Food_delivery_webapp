import React from 'react'

function FeaturesList({ features, icon: Icon, styles }) {
  return (
    <div className={styles.container}>
        {features.map((feature, index) => (
            <div key={index} className={styles.wrapper}>
                <div className={styles.iconContainer}>
                    <Icon className={styles.icon} />
                </div>
                <span className={styles.feature}>{feature}</span>
            </div>
        ))}
    </div>
  )
}

export default FeaturesList