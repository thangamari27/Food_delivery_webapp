import React from 'react'
import HeroSection from '@/components/menu/HeroSection'
import ComboDealSection from '@/components/menu/ComboDealSection'
import SpecialMenuSection from '../components/menu/SpecialMenuSection'

function MenuPage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <SpecialMenuSection  />
            <ComboDealSection />
        </main>
    </div>
  )
}

export default MenuPage