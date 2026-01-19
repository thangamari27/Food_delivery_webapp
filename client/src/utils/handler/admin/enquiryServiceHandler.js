export const enquiryService = {
  generate_mock_data: () => {
    const names = ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Taylor', 'Robert Brown', 'Amanda Lee', 'Chris Wilson', 'Maria Garcia', 'James Anderson'];
    const subjects = ['Order Delivery Issue', 'Catering for Event', 'Food Quality Concern', 'Partnership Proposal', 'Menu Inquiry', 'Delivery Time Question', 'Special Dietary Request', 'Bulk Order Pricing', 'App Technical Issue', 'General Feedback'];
    
    return Array.from({ length: 45 }, (_, i) => {
      const created_date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const status = ['New', 'In Progress', 'Resolved', 'Closed'][Math.floor(Math.random() * 4)];
      
      return {
        id: `ENQ-${String(i + 1).padStart(4, '0')}`,
        name: names[Math.floor(Math.random() * names.length)],
        email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@email.com`,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        purpose: ['general', 'catering', 'complaint', 'partnership', 'other'][Math.floor(Math.random() * 5)],
        message: `I would like to inquire about your services and get more information regarding my specific needs. Could you please provide details about pricing, availability, and any special requirements?`,
        status,
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        created_at: created_date.toISOString(),
        updated_at: created_date.toISOString(),
        replies: status !== 'New' ? [{
          message: 'Thank you for reaching out. We are looking into your inquiry and will get back to you shortly.',
          replied_by: 'Admin Support',
          replied_at: new Date(created_date.getTime() + 3600000).toISOString()
        }] : []
      };
    });
  },

  calculate_stats: (enquiries) => {
    return {
      total: enquiries.length,
      new: enquiries.filter(e => e.status === 'New').length,
      in_progress: enquiries.filter(e => e.status === 'In Progress').length,
      resolved: enquiries.filter(e => e.status === 'Resolved').length,
      high_priority: enquiries.filter(e => e.priority === 'High').length
    };
  }
};