import React from 'react'
import HeroSection from '@/components/about/HeroSection'
import AchievementSection from '@/components/about/AchievementSection'
import WhyChooseUsSection from '@/components/about/WhyChooseUsSection'
import QualityCommitment from '@/components/about/QualityCommitment'
import BehindScenseSection from '@/components/about/BehindScenseSection'

function AboutPage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <AchievementSection />
            <WhyChooseUsSection />
            <QualityCommitment />
            <BehindScenseSection />
        </main>
    </div>
  )
}

export default AboutPage