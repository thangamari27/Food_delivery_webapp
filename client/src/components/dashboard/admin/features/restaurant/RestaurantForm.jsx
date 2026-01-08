import React, { useCallback } from 'react';
import ImageUpload from './ImageUpload';
import MultiSelect from './MultiSelect';

const FormInput = ({ label, name, value, onChange, error, type = 'text', placeholder, required = false, className = '' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({ label, name, value, onChange, rows = 2, required = false, className = '' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none outline-none ${className}`}
    />
  </div>
);

const FormSection = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
    {children}
  </div>
);

function RestaurantForm({ content, formData, setFormData, errors, setErrors, styles }) {
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [setFormData, errors, setErrors]);

  const handleMultiSelect = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value) 
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [setFormData, errors, setErrors]);

  const handleImageChange = useCallback((img) => {
    setFormData(prev => ({ ...prev, image: img }));
  }, [setFormData]);

  return (
    <div className="p-6 space-y-6">
      <ImageUpload
        content={content}
        image={formData.image}
        onChange={handleImageChange}
        error={errors.image}
        styles={styles}
      />
      
      <FormSection title={content.labels.basicInfo}>
        <FormInput
          label={content.labels.restaurantName}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder={content.labels.restaurantName}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label={content.labels.contactPerson}
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            error={errors.contactPerson}
            required
          />
          
          <FormInput
            label={content.labels.phoneNumber}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder={content.labels.phonePlaceholder}
            required
          />
        </div>

        <FormInput
          label={content.labels.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </FormSection>

      <FormSection title={content.labels.location}>
        <FormTextarea
          label={content.labels.address}
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label={content.labels.city}
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
      </FormSection>

      <MultiSelect
        options={content.options.cuisine}
        selected={formData.cuisine}
        onChange={(val) => handleMultiSelect('cuisine', val)}
        label={content.labels.cuisineTypes}
        error={errors.cuisine}
        styles={styles}
      />

      <FormSection title={content.labels.operatingHours}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label={content.labels.openingTime}
            name="openingTime"
            type="time"
            value={formData.openingTime}
            onChange={handleChange}
          />
          <FormInput
            label={content.labels.closingTime}
            name="closingTime"
            type="time"
            value={formData.closingTime}
            onChange={handleChange}
          />
        </div>
      </FormSection>

      <FormSection title={content.labels.pricingDelivery}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label={content.labels.priceRange}
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            error={errors.priceRange}
            placeholder={content.labels.pricePlaceholder}
            required
          />
          
          <FormInput
            label={content.labels.deliveryTime}
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            placeholder={content.labels.deliveryTimePlaceholder}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="deliveryAvailable"
            name="deliveryAvailable"
            checked={formData.deliveryAvailable}
            onChange={handleChange}
            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="deliveryAvailable" className="text-sm font-medium text-gray-700">
            {content.labels.deliveryAvailable}
          </label>
        </div>
      </FormSection>

      <FormSection title={content.labels.additionalInfo}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content.labels.status}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="Active">{content.status.active}</option>
              <option value="Inactive">{content.status.inactive}</option>
              <option value="Closed">{content.status.closed}</option>
            </select>
          </div>
          
          <FormInput
            label={content.labels.rating}
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        
        <FormInput
          label={content.labels.offers}
          name="offers"
          value={formData.offers}
          onChange={handleChange}
          placeholder={content.labels.offersPlaceholder}
        />
        
        <MultiSelect
          options={content.options.badges}
          selected={formData.badges}
          onChange={(val) => handleMultiSelect('badges', val)}
          label={content.labels.badges}
          error={null}
          required={false}
          styles={styles}
        />
        
        <MultiSelect
          options={content.options.features}
          selected={formData.features}
          onChange={(val) => handleMultiSelect('features', val)}
          label={content.labels.features}
          error={null}
          required={false}
          styles={styles}
        />
        
        <FormTextarea
          label={content.labels.description}
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </FormSection>
    </div>
  );
}

export default RestaurantForm;