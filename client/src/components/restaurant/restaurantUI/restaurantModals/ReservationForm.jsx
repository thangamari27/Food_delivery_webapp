import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, User, ChevronDown } from 'lucide-react';
import { 
  bookingFormDefaults, 
  validateBookingField,
  validateBookingForm 
} from '../../../../utils/handler/bookingHandler';

const ReservationForm = ({ 
  restaurant, 
  content, 
  styles, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState(bookingFormDefaults);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // Populate minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  // Field change handler with validation
  const handleFieldChange = (fieldPath, value) => {
    // Update form data
    const pathParts = fieldPath.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let target = newData;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        target = target[pathParts[i]];
      }
      target[pathParts[pathParts.length - 1]] = value;
      
      return newData;
    });

    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldPath]: true }));

    // Validate field
    if (touched[fieldPath]) {
      const validation = validateBookingField(fieldPath, value, formData);
      setErrors(prev => ({
        ...prev,
        [fieldPath]: validation.error
      }));
    }
  };

  // Handle blur to trigger validation
  const handleBlur = (fieldPath) => {
    setTouched(prev => ({ ...prev, [fieldPath]: true }));
    
    const pathParts = fieldPath.split('.');
    let value = formData;
    for (const part of pathParts) {
      value = value[part];
    }
    
    const validation = validateBookingField(fieldPath, value, formData);
    setErrors(prev => ({
      ...prev,
      [fieldPath]: validation.error
    }));
  };

  // Handle dietary restrictions (multi-select)
  const toggleDietaryRestriction = (restriction) => {
    setFormData(prev => {
      const current = prev.dietaryRestrictions || [];
      const isSelected = current.includes(restriction);
      
      return {
        ...prev,
        dietaryRestrictions: isSelected
          ? current.filter(r => r !== restriction)
          : [...current, restriction]
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    // Validate entire form
    const validation = validateBookingForm(formData);
    
    if (!validation.success) {
      setErrors(validation.errors);
      setIsValidating(false);
      
      // Mark all fields as touched
      const allTouched = {};
      Object.keys(validation.errors).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      
      return;
    }

    // Submit form
    try {
      await onSubmit(validation.data);
    } catch (error) {
      setErrors({ _form: error.message });
    } finally {
      setIsValidating(false);
    }
  };

  // Dietary restriction options
  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut Allergy',
    'Seafood Allergy',
    'None'
  ];

  // Occasion options
  const occasionOptions = [
    'Regular',
    'Birthday',
    'Anniversary',
    'Business Meeting',
    'Date',
    'Family Gathering',
    'Celebration',
    'Other'
  ];

  // Table type options
  const tableTypeOptions = [
    { value: 'Standard', label: 'Standard Table'},
    { value: 'Window', label: 'Window Seat'},
    { value: 'Outdoor', label: 'Outdoor Seating'},
    { value: 'Private', label: 'Private Room'},
    { value: 'Bar', label: 'Bar Counter'},
    { value: 'VIP', label: 'VIP Section'}
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Restaurant Info Banner */}
      <div className="mt-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
            <p className="text-sm text-gray-600">
              {typeof restaurant.address === 'string' 
                ? restaurant.address 
                : `${restaurant.address?.street || ''}, ${restaurant.address?.city || ''}`}
            </p>
            {restaurant.phone && (
              <p className="text-sm text-gray-600 mt-1">
                <Phone className="w-3 h-3 inline mr-1" />
                {restaurant.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
          Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            value={formData.customer.name}
            onChange={(e) => handleFieldChange('customer.name', e.target.value)}
            onBlur={() => handleBlur('customer.name')}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
              errors['customer.name'] && touched['customer.name'] 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors['customer.name'] && touched['customer.name'] && (
            <p className="text-sm text-red-600 mt-1">{errors['customer.name']}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={formData.customer.email}
            onChange={(e) => handleFieldChange('customer.email', e.target.value)}
            onBlur={() => handleBlur('customer.email')}
            placeholder="your@email.com"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
              errors['customer.email'] && touched['customer.email']
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors['customer.email'] && touched['customer.email'] && (
            <p className="text-sm text-red-600 mt-1">{errors['customer.email']}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.customer.phone}
            onChange={(e) => handleFieldChange('customer.phone', e.target.value)}
            onBlur={() => handleBlur('customer.phone')}
            placeholder="+91 00000 00000"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
              errors['customer.phone'] && touched['customer.phone']
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors['customer.phone'] && touched['customer.phone'] && (
            <p className="text-sm text-red-600 mt-1">{errors['customer.phone']}</p>
          )}
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
          Booking Details
        </h3>

        {/* Date and Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Booking Date *
            </label>
            <input
              type="date"
              min={minDate}
              value={formData.bookingDate instanceof Date 
                ? formData.bookingDate.toISOString().split('T')[0]
                : ''}
              onChange={(e) => handleFieldChange('bookingDate', new Date(e.target.value))}
              onBlur={() => handleBlur('bookingDate')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.bookingDate && touched.bookingDate
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.bookingDate && touched.bookingDate && (
              <p className="text-sm text-red-600 mt-1">{errors.bookingDate}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Booking Time *
            </label>
            <select
              value={formData.bookingTime}
              onChange={(e) => handleFieldChange('bookingTime', e.target.value)}
              onBlur={() => handleBlur('bookingTime')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none ${
                errors.bookingTime && touched.bookingTime
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select time</option>
              {content?.timeSlots?.map(slot => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            {errors.bookingTime && touched.bookingTime && (
              <p className="text-sm text-red-600 mt-1">{errors.bookingTime}</p>
            )}
          </div>
        </div>

        {/* Guests and Table Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Number of Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Number of Guests *
            </label>
            <select
              value={formData.numberOfGuests}
              onChange={(e) => handleFieldChange('numberOfGuests', parseInt(e.target.value))}
              onBlur={() => handleBlur('numberOfGuests')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.numberOfGuests && touched.numberOfGuests
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              {content?.guestOptions?.map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            {errors.numberOfGuests && touched.numberOfGuests && (
              <p className="text-sm text-red-600 mt-1">{errors.numberOfGuests}</p>
            )}
          </div>

          {/* Table Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Preference
            </label>
            <select
              value={formData.tableType}
              onChange={(e) => handleFieldChange('tableType', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              disabled={isSubmitting}
            >
              {tableTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occasion
          </label>
          <select
            value={formData.occasion}
            onChange={(e) => handleFieldChange('occasion', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            disabled={isSubmitting}
          >
            {occasionOptions.map(occasion => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
          Special Requirements
        </h3>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dietaryOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => toggleDietaryRestriction(option)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  formData.dietaryRestrictions?.includes(option)
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                }`}
                disabled={isSubmitting}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests
            <span className="text-xs text-gray-500 ml-2">
              ({formData.specialRequests?.length || 0}/500)
            </span>
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleFieldChange('specialRequests', e.target.value)}
            onBlur={() => handleBlur('specialRequests')}
            placeholder="Any dietary restrictions, occasion details, or seating preferences..."
            rows={4}
            maxLength={500}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
              errors.specialRequests && touched.specialRequests
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.specialRequests && touched.specialRequests && (
            <p className="text-sm text-red-600 mt-1">{errors.specialRequests}</p>
          )}
        </div>
      </div>

      {/* Important Information */}
      {content?.importantInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            {content.importantInfo.title}
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {content.importantInfo.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Error */}
      {errors._form && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errors._form}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {content?.buttons?.cancel || 'Cancel'}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isValidating}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            content?.buttons?.confirm || 'Confirm Reservation'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;