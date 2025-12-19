import RestaurantFilterSection from "../components/restaurant/RestaurantFilterSection"
import HeroSection from "../components/restaurant/HeroSection"

function RestaurantPage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <RestaurantFilterSection />
        </main>
    </div>
  )
}

export default RestaurantPage