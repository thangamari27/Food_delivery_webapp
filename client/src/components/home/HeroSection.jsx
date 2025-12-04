import React from 'react';
import OrangeCircles from './heroUI/OrangeCircles';
import Wave from './heroUI/Wave';
import LeftSection from './heroUI/LeftSection';
import RightSection from './heroUI/RightSection';
import { heroContent } from '@/utils/constant/admin/HomeConstant';
import { heroSectionStyles } from '@/utils/styles/HomeStyle';

const HeroSection = () => {
  const styles = heroSectionStyles;
  return (
    <section className={styles.section}>
      {/* Decorative orange circles */}
      <OrangeCircles styles={ styles.orangeCircle } />

      {/* Wave decoration */}
      <Wave styles={styles.wave} />

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <LeftSection 
            title={heroContent.title} 
            description={heroContent.description} 
            buttonContent={heroContent.buttonContent}
            styles={styles.leftContainer}
          />

          {/* Right Images */}
          <RightSection heroContent={heroContent} styles={styles.rightContainer} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;