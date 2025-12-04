export const heroSection = {
    title: 'Contact Us',
    subHeading: 'Get In Touch',
    desciption1: 'We respond to all messages within 24 hours. Guaranteed.',
    desciption2: 'All orders prepared with strict hygiene protocols and contactless delivery for your safety.',
}

export const contactForm = {
  sectionLeft: {
    src: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop',
    alt: 'Contact us illustration'
  },
  sectionRight: {
    badge: {
      text: 'Contact Us',
      bgColor: 'bg-orange-400',
      textColor: 'text-white'
    },
    heading: "Let's Get In Touch.",
    description: {
      text: 'Or just reach out manually to us at',
      email: 'hello@letsfood.com',
      linkColor: 'text-orange-600'
    },
    fields: [
      {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        requiredField: "*",
        required: true,
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
          </svg>
        )
      },
      {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        requiredField: "*",
        required: true,
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#475569"/>
          </svg>
        )
      },
      {
        id: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Subject (e.g., Catering Inquiry)',
        requiredField: "(optional)",
        required: true
      },
      {
        id: 'purpose',
        label: 'Purpose',
        type: 'select',
        placeholder: 'Select purpose',
        options: [
          { value: '', label: 'Select purpose' },
          { value: 'general', label: 'General' },
          { value: 'catering', label: 'Catering' },
          { value: 'complaint', label: 'Complaints' },
          { value: 'partnership', label: 'Partnership' },
          { value: 'other', label: 'Other' }
        ],
        requiredField: "*",
        required: true
      },
      {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message',
        requiredField: "*",
        required: true,
        rows: 5
      }
    ],
    submitButton: {
      text: 'Submit Form',
      bgColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-400',
      icon: (
        <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
        </svg>
      )
    }
  }
};

export const faqSection = {
    title: 'Frequently Asked Questions',
    subHeading: 'Food Delivery FAQs',
    description: 'Find quick answers to your questions about ordering, delivery, payments and more',

    faqData: [
        {
            question: 'What areas in Tamil Nadu do you deliver to?',
            answer: 'We deliver across all major cities in Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Salem, and Tirunelveli with plans to expand to more locations.'
        },
        {
            question: 'What are your delivery timings?',
            answer: 'We deliver from 7 AM to 11 PM daily. Early morning breakfast orders can be scheduled the previous night.'
        },
        {
            question: 'Do you offer traditional Tamil meals?',
            answer: 'Yes! We specialize in authentic Tamil cuisine including traditional meals, Chettinad dishes, Kongunadu specials, and local delicacies from across Tamil Nadu.'
        },
        {
            question: 'How do you ensure food hygiene and safety?',
            answer: 'All our partner restaurants follow FSSAI guidelines, our delivery executives maintain hygiene protocols, and we use tamper-proof packaging with contactless delivery options.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery. All digital payments are secure and encrypted.'
        },
        {
            question: 'Can I schedule orders in advance?',
            answer: 'Absolutely! You can schedule orders up to 48 hours in advance for any meal - breakfast, lunch, or dinner.'
        },
    ],
}