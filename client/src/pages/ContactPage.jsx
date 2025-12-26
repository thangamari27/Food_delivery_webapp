import HeroSection from '@/components/contact/HeroSection'
import FaqSection from '@/components/contact/FAQSection'
import ContactFormSection from '@/components/contact/ContactFormSection'
import PageLoaderWrapper from '@/components/common/PageLoaderWrapper'

function ContactPage() {
  return (
    <PageLoaderWrapper>
      <main>
        <HeroSection />
        <ContactFormSection />
        <FaqSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default ContactPage