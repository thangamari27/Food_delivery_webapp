import React from 'react'
import ContactForm from './contactFormUI/contactForm/ContactForm'
import { contactForm } from '@/utils/constant/admin/ContactConstant'
function ContactFormSection() {
  return (
    <ContactForm contactForm={contactForm} />
  )
}

export default ContactFormSection