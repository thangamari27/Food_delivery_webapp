import React from 'react'
import ContactForm from './contactFormUI/contactForm/ContactForm'
import { contactForm } from '@/utils/constant/admin/ContactConstant'
import { contactFormStyles } from '@/utils/styles/ContactStyle'

function ContactFormSection() {
  const styles = contactFormStyles;
  return (
    <ContactForm 
      contactForm={contactForm} 
      styles={styles} 
    />
  )
}

export default ContactFormSection