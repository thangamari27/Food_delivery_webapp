import HeroSection from "@/components/service/HeroSection"
import DeliverySection from "@/components/service/DeliverySection"
import CateringSection from "@/components/service/CateringSection"
import PickTakeawaySection from "@/components/service/PickTakeawaySection"
import FoodSubscriptionPlanSection from "@/components/service/FoodSubscriptionPlanSection"
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper"

function ServicePage() {
  return (
    <PageLoaderWrapper>
      <main>
          <HeroSection />
          <DeliverySection />
          <CateringSection />
          <PickTakeawaySection />
          <FoodSubscriptionPlanSection />
        </main>
    </PageLoaderWrapper>
  )
}

export default ServicePage