import { z } from 'zod';

// Email regex pattern from backend
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Phone regex pattern - international format
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

// Time regex pattern - HH:MM 24-hour format
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * Zod schema for restaurant table booking
 * Matches backend Mongoose BookingSchema exactly
 */
export const bookingFormSchema = z.object({
  // Customer Information (Required)
  customer: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim(),
    email: z.string()
      .regex(EMAIL_REGEX, 'Please enter a valid email address')
      .toLowerCase()
      .trim(),
    phone: z.string()
      .regex(PHONE_REGEX, 'Please enter a valid phone number')
      .trim()
  }),

  // Booking Details (Required)
  bookingDate: z.date()
    .refine(date => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const bookingDate = new Date(date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= today;
    }, 'Booking date must be today or in the future'),

  bookingTime: z.string()
    .regex(TIME_REGEX, 'Time must be in HH:MM format (24-hour)'),

  numberOfGuests: z.number()
    .int('Number of guests must be a whole number')
    .min(1, 'At least 1 guest is required')
    .max(50, 'Cannot book for more than 50 guests'),

  tableType: z.enum([
    'Standard',
    'Window', 
    'Outdoor',
    'Private',
    'Bar',
    'VIP'
  ]).default('Standard'),

  tableNumber: z.string().optional(),

  // Special Requirements (Optional)
  specialRequests: z.string()
    .max(500, 'Special requests cannot exceed 500 characters')
    .trim()
    .optional(),

  dietaryRestrictions: z.array(
    z.enum([
      'Vegetarian',
      'Vegan',
      'Gluten-Free',
      'Dairy-Free',
      'Nut Allergy',
      'Seafood Allergy',
      'None'
    ])
  ).optional().default([]),

  occasion: z.enum([
    'Birthday',
    'Anniversary',
    'Business Meeting',
    'Date',
    'Family Gathering',
    'Celebration',
    'Regular',
    'Other'
  ]).default('Regular')
});

/**
 * Type inference for TypeScript/JSDoc
 */
export const bookingFormDefaults = {
  customer: {
    name: '',
    email: '',
    phone: ''
  },
  bookingDate: new Date(),
  bookingTime: '',
  numberOfGuests: 2,
  tableType: 'Standard',
  tableNumber: '',
  specialRequests: '',
  dietaryRestrictions: [],
  occasion: 'Regular'
};

/**
 * Helper function to validate form data
 */
export const validateBookingForm = (data) => {
  try {
    const validated = bookingFormSchema.parse(data);
    return { success: true, data: validated, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = {};
      error.errors.forEach(err => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      return { success: false, data: null, errors: formattedErrors };
    }
    return { success: false, data: null, errors: { _form: error.message } };
  }
};

/**
 * Partial validation for individual fields (for real-time validation)
 */
export const validateBookingField = (fieldPath, value, formData = {}) => {
  try {
    const fullData = { ...bookingFormDefaults, ...formData };
    
    // Set the field value in the full data
    const pathParts = fieldPath.split('.');
    let target = fullData;
    for (let i = 0; i < pathParts.length - 1; i++) {
      target = target[pathParts[i]];
    }
    target[pathParts[pathParts.length - 1]] = value;

    // Validate the full schema
    bookingFormSchema.parse(fullData);
    return { valid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find(err => 
        err.path.join('.') === fieldPath
      );
      if (fieldError) {
        return { valid: false, error: fieldError.message };
      }
    }
    return { valid: true, error: null };
  }
};

/**
 * Transform form data to backend API format
 */
export const transformToBackendFormat = (formData, restaurantData) => {
  return {
    restaurant: {
      restaurantId: restaurantData.id || restaurantData._id,
      restaurantName: restaurantData.name,
      cuisine: Array.isArray(restaurantData.cuisine) 
        ? restaurantData.cuisine[0] 
        : restaurantData.cuisine,
      phone: restaurantData.phone,
      address: typeof restaurantData.address === 'string' 
        ? restaurantData.address 
        : restaurantData.address?.street || ''
    },
    customer: formData.customer,
    bookingDate: formData.bookingDate,
    bookingTime: formData.bookingTime,
    numberOfGuests: formData.numberOfGuests,
    tableType: formData.tableType,
    tableNumber: formData.tableNumber || undefined,
    specialRequests: formData.specialRequests || '',
    dietaryRestrictions: formData.dietaryRestrictions || [],
    occasion: formData.occasion,
    source: 'Web'
  };
};

export default bookingFormSchema;