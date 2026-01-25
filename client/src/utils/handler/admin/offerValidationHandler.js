export const validate_offer_form = (form_data, current_step) => {
  const validation_errors = [];

  if (current_step >= 2) {
    if (!form_data.title || form_data.title.trim() === '') {
      validation_errors.push('Title is required');
    }
  }

  if (current_step >= 3) {
    const is_food_related = ['food', 'combo', 'holiday'].includes(form_data.type);
    
    if (is_food_related && form_data.discount) {
      if (form_data.discount_type === '%' && (form_data.discount < 0 || form_data.discount > 100)) {
        validation_errors.push('Discount percentage must be between 0-100');
      }
      if (form_data.price && form_data.discount >= form_data.price && form_data.discount_type !== '%') {
        validation_errors.push('Discount cannot exceed original price');
      }
    }
    
    if (form_data.type === 'subscription') {
      if (form_data.price && form_data.price < 0) {
        validation_errors.push('Price must be positive');
      }
      if (form_data.trial_days && form_data.trial_days < 0) {
        validation_errors.push('Trial days must be positive');
      }
    }
  }

  if (current_step >= 6 && form_data.end_time) {
    const end_date = new Date(form_data.end_time);
    const start_date = form_data.start_time ? new Date(form_data.start_time) : new Date();
    
    if (end_date < new Date()) {
      validation_errors.push('End date must be in the future');
    }
    if (form_data.start_time && end_date < start_date) {
      validation_errors.push('End date must be after start date');
    }
  }

  return validation_errors;
};