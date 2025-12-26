import HeroSection from '@/components/about/HeroSection'
import AchievementSection from '@/components/about/AchievementSection'
import WhyChooseUsSection from '@/components/about/WhyChooseUsSection'
import QualityCommitment from '@/components/about/QualityCommitment'
import BehindScenseSection from '@/components/about/BehindScenseSection'
import PageLoaderWrapper from '@/components/common/PageLoaderWrapper'

function AboutPage() {

  return (
    <PageLoaderWrapper>
      <main>
          <HeroSection />
          <AchievementSection />
          <WhyChooseUsSection />
          <QualityCommitment />
          <BehindScenseSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default AboutPage