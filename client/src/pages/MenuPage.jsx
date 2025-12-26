import HeroSection from '@/components/menu/HeroSection'
import ComboDealSection from '@/components/menu/ComboDealSection'
import SpecialMenuSection from '@/components/menu/SpecialMenuSection'
import TopCategories from '@/components/menu/TopCategories'
import PageLoaderWrapper from '@/components/common/PageLoaderWrapper'

function MenuPage() {

  return (
    <PageLoaderWrapper>
      <main>
          <HeroSection />
          <SpecialMenuSection  />
          <TopCategories />
          <ComboDealSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default MenuPage