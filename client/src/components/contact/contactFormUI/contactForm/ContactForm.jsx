import React from 'react';
import ImageSection from './ImageSection';
import RightSection from './RightSection';
import { useContactForm } from '@/hooks/useContactForm';

function ContactForm({ contactForm, styles }) {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading
  } = useContactForm();

  const { sectionLeft, sectionRight } = contactForm;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ImageSection
          src={sectionLeft.src}
          srcFallback={sectionLeft.srcFallback}
          alt={sectionLeft.alt}
          styles={styles.contactForm.leftImage}
        />
        <RightSection
          sectionRight={sectionRight}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          styles={styles.contactForm.rightForm}
        />
      </div>
    </section>
  );
}

export default ContactForm;