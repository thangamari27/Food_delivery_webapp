import { Upload, X } from 'lucide-react';

const FormField = ({ label, error, children, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Input = ({ value, onChange, error, placeholder, type = "text", ...props }) => (
  <input
    type={type}
    value={value || ''}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
      error ? 'border-red-500' : 'border-gray-300'
    }`}
    {...props}
  />
);

const TextArea = ({ value, onChange, error, placeholder, rows = 3 }) => (
  <textarea
    value={value || ''}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
      error ? 'border-red-500' : 'border-gray-300'
    }`}
  />
);

const Select = ({ value, onChange, options, error }) => (
  <select
    value={value || ''}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
      error ? 'border-red-500' : 'border-gray-300'
    }`}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const MultiSelect = ({ value = [], onChange, options, label }) => {
  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange({ target: { value: newValue } });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <label
            key={option}
            className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              value.includes(option)
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleToggle(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

function RestaurantForm({ content, formData, setFormData, errors, setErrors, styles, imageFile, imagePreview, onImageChange }) {
  // Handle simple field changes
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle nested address fields
  const handleAddressChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
    }));
    if (errors[`address.${field}`]) {
      setErrors(prev => ({ ...prev, [`address.${field}`]: '' }));
    }
  };

  // Handle address coordinates
  const handleAddressCoordinateChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        coordinates: {
          ...prev.address?.coordinates,
          [field]: parseFloat(e.target.value) || 0
        }
      }
    }));
  };

  // Handle operating hours
  const handleOperatingHoursChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [field]: e.target.value
      }
    }));
  };

  // Handle array fields
  const handleArrayChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  // Handle service areas (array of strings)
  const handleServiceAreasChange = (e) => {
    const value = e.target.value;
    const areas = value.split(',').map(area => area.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, serviceAreas: areas }));
  };

  // Available options
  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Biryani', 'Punjabi', 
    'Mughlai', 'Seafood', 'Kerala', 'Italian', 'Continental', 
    'American', 'Japanese', 'Thai', 'Arabic', 'Pakistani', 'Indian',
    'Mexican', 'Healthy', 'Street Food', 'Cafe', 'Breakfast', 'Asian'
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Closed', label: 'Closed' }
  ];

  const verificationStatusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Rejected', label: 'Rejected' }
  ];

  const badgeOptions = [
    'Pure Veg', 'Bestseller', 'Fast Delivery', 'Trending', 
    'Award Winner', 'New', 'Eco-Friendly', 'Premium'
  ];

  const featureOptions = [
    'Outdoor Seating', 'Home Delivery', 'Takeaway', 'AC', 'WiFi', 
    'Parking', 'Family Dining', 'Late Night', 'Catering', 
    'Bar Available', 'Valet', 'Live Music', 'Contactless Delivery', 
    'Eco-Friendly', 'Breakfast Specials', 'Filter Coffee', 'Chaat'
  ];

  const paymentOptions = ['Cash', 'Card', 'UPI', 'Wallet', 'Net Banking'];

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto px-4">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Basic Information
        </h3>
        
        <FormField label="Restaurant Name" error={errors.name} required>
          <Input
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Enter restaurant name"
            error={errors.name}
          />
        </FormField>

        <FormField label="Description" error={errors.description} required>
          <TextArea
            value={formData.description}
            onChange={handleChange('description')}
            placeholder="Describe your restaurant..."
            rows={4}
            error={errors.description}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Contact Person" error={errors.contactPerson} required>
            <Input
              value={formData.contactPerson}
              onChange={handleChange('contactPerson')}
              placeholder="Contact person name"
              error={errors.contactPerson}
            />
          </FormField>

          <FormField label="Phone" error={errors.phone} required>
            <Input
              value={formData.phone}
              onChange={handleChange('phone')}
              placeholder="+91-XXXXXXXXXX"
              error={errors.phone}
            />
          </FormField>
        </div>

        <FormField label="Email" error={errors.email} required>
          <Input
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="restaurant@example.com"
            error={errors.email}
          />
        </FormField>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Address
        </h3>

        <FormField label="Street Address" error={errors['address.street']} required>
          <Input
            value={formData.address?.street}
            onChange={handleAddressChange('street')}
            placeholder="Street address"
            error={errors['address.street']}
          />
        </FormField>

        <FormField label="Area/Locality" error={errors['address.area']}>
          <Input
            value={formData.address?.area}
            onChange={handleAddressChange('area')}
            placeholder="Area or locality"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="City" error={errors['address.city']} required>
            <Input
              value={formData.address?.city}
              onChange={handleAddressChange('city')}
              placeholder="City"
              error={errors['address.city']}
            />
          </FormField>

          <FormField label="State" error={errors['address.state']}>
            <Input
              value={formData.address?.state}
              onChange={handleAddressChange('state')}
              placeholder="State"
            />
          </FormField>

          <FormField label="Pincode" error={errors['address.pincode']}>
            <Input
              value={formData.address?.pincode}
              onChange={handleAddressChange('pincode')}
              placeholder="Pincode"
              maxLength={6}
            />
          </FormField>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Latitude (Optional)">
            <Input
              type="number"
              step="0.000001"
              value={formData.address?.coordinates?.latitude || ''}
              onChange={handleAddressCoordinateChange('latitude')}
              placeholder="12.9716"
            />
          </FormField>

          <FormField label="Longitude (Optional)">
            <Input
              type="number"
              step="0.000001"
              value={formData.address?.coordinates?.longitude || ''}
              onChange={handleAddressCoordinateChange('longitude')}
              placeholder="77.5946"
            />
          </FormField>
        </div>
      </div>

      {/* Cuisine & Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Cuisine & Categories
        </h3>

        <FormField label="Cuisine Types" error={errors.cuisine} required>
          <MultiSelect
            value={formData.cuisine || []}
            onChange={handleArrayChange('cuisine')}
            options={cuisineOptions}
            label="Select cuisines"
          />
        </FormField>

        <FormField label="Badges">
          <MultiSelect
            value={formData.badges || []}
            onChange={handleArrayChange('badges')}
            options={badgeOptions}
            label="Select badges"
          />
        </FormField>

        <FormField label="Features">
          <MultiSelect
            value={formData.features || []}
            onChange={handleArrayChange('features')}
            options={featureOptions}
            label="Select features"
          />
        </FormField>
      </div>

      {/* Operating Hours */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Operating Hours
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Opening Time" error={errors['operatingHours.openingTime']} required>
            <Input
              type="time"
              value={formData.operatingHours?.openingTime}
              onChange={handleOperatingHoursChange('openingTime')}
              error={errors['operatingHours.openingTime']}
            />
          </FormField>

          <FormField label="Closing Time" error={errors['operatingHours.closingTime']} required>
            <Input
              type="time"
              value={formData.operatingHours?.closingTime}
              onChange={handleOperatingHoursChange('closingTime')}
              error={errors['operatingHours.closingTime']}
            />
          </FormField>
        </div>
      </div>

      {/* Pricing & Delivery */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Pricing & Delivery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Price Range (for two)" error={errors.priceRange} required>
            <Input
              value={formData.priceRange}
              onChange={handleChange('priceRange')}
              placeholder="₹300 for two"
              error={errors.priceRange}
            />
          </FormField>

          <FormField label="Delivery Time" error={errors.deliveryTime}>
            <Input
              value={formData.deliveryTime}
              onChange={handleChange('deliveryTime')}
              placeholder="30-40 mins"
            />
          </FormField>

          <FormField label="Minimum Order Amount">
            <Input
              type="number"
              value={formData.minOrderAmount || ''}
              onChange={handleChange('minOrderAmount')}
              placeholder="0"
              min="0"
            />
          </FormField>

          <FormField label="Delivery Fee">
            <Input
              type="number"
              value={formData.deliveryFee || ''}
              onChange={handleChange('deliveryFee')}
              placeholder="0"
              min="0"
            />
          </FormField>

          <FormField label="Delivery Radius (km)">
            <Input
              type="number"
              value={formData.deliveryRadius || ''}
              onChange={handleChange('deliveryRadius')}
              placeholder="10"
              min="1"
            />
          </FormField>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.deliveryAvailable || false}
              onChange={handleChange('deliveryAvailable')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Delivery Available</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.takeawayAvailable || false}
              onChange={handleChange('takeawayAvailable')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Takeaway Available</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.dineInAvailable || false}
              onChange={handleChange('dineInAvailable')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Dine-In Available</span>
          </label>
        </div>

        {/* Service Areas */}
        <FormField label="Service Areas (comma separated)">
          <TextArea
            value={Array.isArray(formData.serviceAreas) ? formData.serviceAreas.join(', ') : ''}
            onChange={handleServiceAreasChange}
            placeholder="MG Road, Brigade Road, Koramangala"
            rows={2}
          />
        </FormField>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Payment Methods
        </h3>

        <MultiSelect
          value={formData.paymentMethods || []}
          onChange={handleArrayChange('paymentMethods')}
          options={paymentOptions}
          label="Accepted payment methods"
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Additional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Current Offers">
            <Input
              value={formData.offers || ''}
              onChange={handleChange('offers')}
              placeholder="e.g., 20% off on first order"
            />
          </FormField>

          <FormField label="Status">
            <Select
              value={formData.status || 'Active'}
              onChange={handleChange('status')}
              options={statusOptions}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Verification Status">
            <Select
              value={formData.verificationStatus || 'Pending'}
              onChange={handleChange('verificationStatus')}
              options={verificationStatusOptions}
            />
          </FormField>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured || false}
              onChange={handleChange('isFeatured')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Featured Restaurant</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPremium || false}
              onChange={handleChange('isPremium')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Premium Restaurant</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive || false}
              onChange={handleChange('isActive')}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
          Restaurant Image
        </h3>

        <div className="space-y-4">
          {imagePreview && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Restaurant preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, image: null }));
                  if (onImageChange) {
                    onImageChange({ target: { files: [] } });
                  }
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default RestaurantForm;