import React from 'react'
import HeroSection from '@/components/contact/HeroSection'
import FaqSection from '@/components/contact/FAQSection'
import ContactFormSection from '@/components/contact/ContactFormSection'

function ContactPage() {
  return (
    <div className=''>
        <main>
          <HeroSection />
          <ContactFormSection />
          <FaqSection />
        </main>
    </div>
  )
}

export default ContactPage