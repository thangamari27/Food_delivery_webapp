import HeroSection from "@/components/service/HeroSection"
import DeliverySection from "@/components/service/DeliverySection"
import CateringSection from "@/components/service/CateringSection"
import PickTakeaway from "@/components/service/PickTakeaway"

function ServicePage() {
  return (
    <div className=''>
        <main>
            <HeroSection />
            <DeliverySection />
            <CateringSection />
            <PickTakeaway />
        </main>
    </div>
  )
}

export default ServicePage