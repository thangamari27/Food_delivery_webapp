import React from 'react'
import Carousel from '@/components/common/Carousel'
import { currentOfferSection } from '@/utils/constant/user/OfferConstant'
import { menuHeroStyle } from '@/utils/styles/MenuStyle'

function HeroSection() {
  const styles = menuHeroStyle;
  return (
    <section className={styles.section}>
        <Carousel carouselContent={currentOfferSection.heroCarousel} styles={styles} />
    </section>
  )
}

export default HeroSection