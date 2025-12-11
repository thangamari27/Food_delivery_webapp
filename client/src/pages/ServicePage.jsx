import HeroSection from "@/components/service/HeroSection"
import DeliverySection from "@/components/service/DeliverySection"
import CateringSection from "@/components/service/CateringSection"
import PickTakeawaySection from "@/components/service/PickTakeawaySection"
import FoodSubscriptionPlanSection from "@/components/service/FoodSubscriptionPlanSection"

function ServicePage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <DeliverySection />
            <CateringSection />
            <PickTakeawaySection />
            <FoodSubscriptionPlanSection />
        </main>
    </div>
  )
}

export default ServicePage