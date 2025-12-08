import HeroSection from '@/components/menu/HeroSection'
import ComboDealSection from '@/components/menu/ComboDealSection'
import SpecialMenuSection from '@/components/menu/SpecialMenuSection'
import TopCategories from '@/components/menu/TopCategories'

function MenuPage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <SpecialMenuSection  />
            <TopCategories />
            <ComboDealSection />
        </main>
    </div>
  )
}

export default MenuPage