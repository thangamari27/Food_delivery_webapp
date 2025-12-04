import React, { useState } from 'react';
import ImageSection from './ImageSection';
import RightSection from './RightSection';

function ContactForm({ contactForm, styles }) {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', purpose: '', message: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, purpose, message } = formData;
    if (!name || !email || !purpose || !message) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', subject: '', purpose: '', message: '' });
  };
  const { sectionLeft, sectionRight } = contactForm;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ImageSection src={sectionLeft.src} srcFallback={sectionLeft.srcFallback} alt={sectionLeft.alt} styles={styles.contactForm.leftImage} />
        <RightSection
          sectionRight={sectionRight}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          styles={styles.contactForm.rightForm}
        />
      </div>
    </section>
  )
}

export default ContactForm