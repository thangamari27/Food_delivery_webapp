import React, { useState } from 'react';
import ImageSection from './ImageSection';
import RightSection from './RightSection';

function ContactForm({ contactForm }) {
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
    <section className="py-20 md:py-12 lg:py-26 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8 lg:gap-12 px-4 md:px-6">
        <ImageSection src={sectionLeft.src} alt={sectionLeft.alt} />
        <RightSection
          sectionRight={sectionRight}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default ContactForm