import React from 'react'
import HeroBowl from './HeroBowl';

function RightSection({ heroContent, styles }) {
  return (
     <div className={styles.container}>
        <HeroBowl
            image={heroContent.image[0]}
            position={styles.heroBowl.bowl1.position}
            size={styles.heroBowl.bowl1.size}
            gradient={styles.heroBowl.bowl1.gradient}
            borderColor={styles.heroBowl.bowl1.borderColor}
            sizeClass={styles.sizeClass}
        />
        
        <HeroBowl
            image={heroContent.image[1]}
            position={styles.heroBowl.bowl2.position}
            size={styles.heroBowl.bowl2.size}
            gradient={styles.heroBowl.bowl2.gradient}
            borderColor={styles.heroBowl.bowl2.borderColor}
            sizeClass={styles.sizeClass}
        />
        
        <HeroBowl
            image={heroContent.image[2]}
            position={styles.heroBowl.bowl3.position}
            size={styles.heroBowl.bowl3.size}
            gradient={styles.heroBowl.bowl3.gradient}
            borderColor={styles.heroBowl.bowl3.borderColor}
            sizeClass={styles.sizeClass}
        />
    </div>
  )
}

export default RightSection