import RestaurantFilterSection from "@/components/restaurant/RestaurantFilterSection"
import HeroSection from "@/components/restaurant/HeroSection"
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

function RestaurantPage() {

  return (
    <PageLoaderWrapper>
      <main>
          <HeroSection />
          <RestaurantFilterSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default RestaurantPage