/**
 * AddEditFoodModal - UPDATED FOR RESTAURANT INTEGRATION
 */

import React, { useMemo, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Modal from './Modal';
import FormSection from '../ui/FormSection';
import Input from '../ui/Input';
import ImageUpload from '../ui/ImageUpload';

// Backend enum values - MUST match backend exactly
const BACKEND_ENUMS = {
  categories: [
    'Rolls and Wraps',
    'Noodle Dishes',
    'Rice Dishes',
    'Seafood Dishes',
    'Beverages',
    'Starters',
    'Main Course',
    'Breads',
    'Desserts'
  ],
  cuisines: [
    'Arabic', 'Thai', 'Pakistani', 'Indian',
    'North Indian', 'South Indian', 'Chinese',
    'Biryani', 'Punjabi', 'Mughlai', 'Seafood',
    'Kerala', 'Italian', 'Continental', 'American',
    'Japanese', 'Healthy', 'Street Food', 'Cafe'
  ],
  foodTypes: [
    { value: 'Special Menu', label: 'Special Menu' },
    { value: 'Regular Menu', label: 'Regular Menu' },
    { value: 'Seasonal Item', label: 'Seasonal' },
    { value: 'Limited Edition', label: 'Limited Edition' }
  ],
  spiceLevels: [
    'Not Applicable',
    'Mild',
    'Medium',
    'Spicy',
    'Extra Spicy'
  ],
  allergens: [
    'Nuts',
    'Dairy',
    'Gluten',
    'Soy',
    'Eggs',
    'Shellfish',
    'Fish',
    'None'
  ]
};

function AddEditFoodModal({
  content,
  loading,
  isOpen,
  onClose,
  isEdit,
  formData,
  formErrors,
  imagePreview,
  setFormData,
  handleImageUpload,
  handleSubmit,
  resetForm,
  restaurants = [], // From RestaurantContext via useFoodManagement
  loadingRestaurants = false, // From RestaurantContext via useFoodManagement
  styles
}) {
  const [imageUploading, setImageUploading] = useState(false);
  
  const modalContent = isEdit ? content?.modal?.edit : content?.modal?.add;
  // Use backend enums or fallback to content
  const categories = content?.categories || BACKEND_ENUMS.categories;
  const cuisines = content?.cuisines || BACKEND_ENUMS.cuisines;
  const foodTypes = content?.foodTypes || BACKEND_ENUMS.foodTypes;
  const spiceLevels = BACKEND_ENUMS.spiceLevels;
  const allergens = BACKEND_ENUMS.allergens;
  
  // Get selected restaurant name for display
  const selectedRestaurantName = useMemo(() => {
    if (!formData.restaurant) return '';
    const restaurant = restaurants.find(rest => 
      rest._id === formData.restaurant || rest.id === formData.restaurant
    );
    return restaurant?.name || '';
  }, [formData.restaurant, restaurants]);

  // Handle field changes
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle nested object changes
  const handleNestedChange = (parentField, childField) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  // Handle allergen changes
  const handleAllergenToggle = (allergen) => {
    const currentAllergens = formData.allergens || [];
    const newAllergens = currentAllergens.includes(allergen)
      ? currentAllergens.filter(a => a !== allergen)
      : [...currentAllergens, allergen];
    setFormData(prev => ({ ...prev, allergens: newAllergens }));
  };

  // Handle restaurant change
  const handleRestaurantChange = (e) => {
    const restaurantId = e.target.value;
    setFormData(prev => ({ ...prev, restaurant: restaurantId }));
  };

  // Custom image upload handler with loading state
  const handleImageUploadWithLoading = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageUploading(true);
    try {
      // Pass the event to the parent handler
      await handleImageUpload(e);
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setImageUploading(false);
    }
  };

  // Handle form submission with loading state
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  // Determine if form is submitting (overall loading or image uploading)
  const isSubmitting = loading || imageUploading;

  return (
    <Modal
      styles={styles}
      isOpen={isOpen}
      onClose={() => { onClose(); resetForm(); }}
      title={modalContent?.title || (isEdit ? 'Edit Food Item' : 'Add New Food Item')}
      size="lg"
      footer={
         <>
          <Button 
            variant="secondary" 
            onClick={() => { onClose(); resetForm(); }} 
            styles={styles}
            disabled={isSubmitting}
          >
            {modalContent?.cancelButton || 'Cancel'}
          </Button>
          <Button 
            onClick={handleFormSubmit} 
            styles={styles}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {imageUploading ? 'Uploading Image...' : (isEdit ? 'Updating...' : 'Adding...')}
              </>
            ) : (
              <>
                <Save size={18} />
                {modalContent?.submitButton || (isEdit ? 'Update' : 'Add')}
              </>
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <FormSection styles={styles} title="Basic Information">
          <div className="space-y-4">
            <Input
              label="Food Name"
              required
              value={formData.name}
              onChange={handleChange('name')}
              error={formErrors?.name}
              placeholder="e.g., Butter Chicken"
              styles={styles}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Restaurant Select - From RestaurantContext */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.restaurant || ''}
                  onChange={handleRestaurantChange}
                  disabled={loadingRestaurants}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors?.restaurant ? 'border-red-500' : 'border-gray-300'
                  } ${loadingRestaurants ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {loadingRestaurants ? 'Loading restaurants...' : 'Select Restaurant'}
                  </option>
                  {restaurants.map(rest => (
                    <option key={rest._id || rest.id} value={rest._id || rest.id}>
                      {rest.name}
                    </option>
                  ))}
                </select>
                {formErrors?.restaurant && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.restaurant}</p>
                )}
                {/* {!loadingRestaurants && restaurants.length === 0 && (
                  <p className="mt-1 text-sm text-yellow-600">
                    No restaurants found. Please add restaurants first.
                  </p>
                )}
                {selectedRestaurantName && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {selectedRestaurantName}
                  </p>
                )} */}
              </div>

              {/* Category Select - Backend enums */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={handleChange('category')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors?.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {formErrors?.category && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cuisine Select - Backend enums */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cuisine}
                  onChange={handleChange('cuisine')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors?.cuisine ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Cuisine</option>
                  {cuisines.map(cui => (
                    <option key={cui} value={cui}>{cui}</option>
                  ))}
                </select>
                {formErrors?.cuisine && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.cuisine}</p>
                )}
              </div>

              {/* Type Select - Backend enums */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Type
                </label>
                <select
                  value={formData.type || 'Regular Menu Item'}
                  onChange={handleChange('type')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {foodTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Pricing */}
        <FormSection title="Pricing" styles={styles}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange('price')}
                  className={`w-full pl-8 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors?.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {formErrors?.price && <p className="mt-1 text-sm text-red-500">{formErrors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice || ''}
                  onChange={handleChange('originalPrice')}
                  className={`w-full pl-8 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors?.originalPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {formErrors?.originalPrice && <p className="mt-1 text-sm text-red-500">{formErrors.originalPrice}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Leave empty if there's no discount
              </p>
            </div>
          </div>
        </FormSection>

        {/* Description & Ingredients */}
        <FormSection title="Description & Ingredients" styles={styles}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange('description')}
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                  formErrors?.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the food item..."
              />
              <div className="flex justify-between items-center mt-1">
                {formErrors?.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                <span className="text-sm text-gray-500 ml-auto">
                  {formData.description?.length || 0}/500
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients (Optional)
              </label>
              <textarea
                value={formData.ingredients || ''}
                onChange={handleChange('ingredients')}
                rows={3}
                maxLength={300}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="e.g., Chicken, tomatoes, cream, butter, cashews, spices"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.ingredients?.length || 0}/300
              </div>
            </div>
          </div>
        </FormSection>

        {/* Food Properties */}
        <FormSection title="Food Properties" styles={styles}>
          <div className="space-y-4">
            {/* Dietary Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg || false}
                    onChange={handleChange('isVeg')}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVegan || false}
                    onChange={handleChange('isVegan')}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Vegan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isGlutenFree || false}
                    onChange={handleChange('isGlutenFree')}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Gluten-Free</span>
                </label>
              </div>
            </div>

            {/* Spice Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spice Level</label>
              <select
                value={formData.spiceLevel || 'Not Applicable'}
                onChange={handleChange('spiceLevel')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {spiceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Allergens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergens</label>
              <div className="flex flex-wrap gap-2">
                {allergens.map(allergen => (
                  <label
                    key={allergen}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-sm ${
                      formData.allergens?.includes(allergen)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.allergens?.includes(allergen) || false}
                      onChange={() => handleAllergenToggle(allergen)}
                      className="sr-only"
                    />
                    {allergen}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Select all that apply. Select "None" if no allergens.
              </p>
            </div>
          </div>
        </FormSection>

        {/* Quantity & Timing */}
        <FormSection title="Quantity & Timing" styles={styles}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Preparation Time (minutes)"
              type="number"
              min="1"
              value={formData.preparationTime || 15}
              onChange={handleChange('preparationTime')}
              styles={styles}
            />
            <Input
              label="Available Quantity"
              type="number"
              min="0"
              value={formData.availableQuantity || 100}
              onChange={handleChange('availableQuantity')}
              styles={styles}
            />
            <Input
              label="Serving Size"
              value={formData.servingSize || '1 serving'}
              onChange={handleChange('servingSize')}
              placeholder="e.g., 1 bowl (450g)"
              styles={styles}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              label="Min Order Quantity"
              type="number"
              min="1"
              value={formData.minOrderQuantity || 1}
              onChange={handleChange('minOrderQuantity')}
              styles={styles}
            />
            <Input
              label="Max Order Quantity"
              type="number"
              min="1"
              value={formData.maxOrderQuantity || 10}
              onChange={handleChange('maxOrderQuantity')}
              styles={styles}
            />
          </div>
        </FormSection>

        {/* Nutritional Information */}
        <FormSection title="Nutritional Information (per serving)" styles={styles}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Input
              label="Calories"
              type="number"
              min="0"
              value={formData.nutritionalInfo?.calories || 0}
              onChange={handleNestedChange('nutritionalInfo', 'calories')}
              styles={styles}
            />
            <Input
              label="Protein (g)"
              type="number"
              step="0.1"
              min="0"
              value={formData.nutritionalInfo?.protein || 0}
              onChange={handleNestedChange('nutritionalInfo', 'protein')}
              styles={styles}
            />
            <Input
              label="Carbs (g)"
              type="number"
              step="0.1"
              min="0"
              value={formData.nutritionalInfo?.carbs || 0}
              onChange={handleNestedChange('nutritionalInfo', 'carbs')}
              styles={styles}
            />
            <Input
              label="Fat (g)"
              type="number"
              step="0.1"
              min="0"
              value={formData.nutritionalInfo?.fat || 0}
              onChange={handleNestedChange('nutritionalInfo', 'fat')}
              styles={styles}
            />
            <Input
              label="Fiber (g)"
              type="number"
              step="0.1"
              min="0"
              value={formData.nutritionalInfo?.fiber || 0}
              onChange={handleNestedChange('nutritionalInfo', 'fiber')}
              styles={styles}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Nutritional information is optional but recommended
          </p>
        </FormSection>

        {/* Image Upload */}
        <FormSection title="Food Image" styles={styles}>
          <ImageUpload 
            content={content} 
            preview={imagePreview} 
            onChange={handleImageUpload} 
            styles={styles} 
          />
        </FormSection>

        {/* Status & Features */}
        <FormSection title="Status & Features" styles={styles}>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'Active'}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  status: e.target.checked ? 'Active' : 'Inactive' 
                }))}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured || false}
                onChange={handleChange('isFeatured')}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestseller || false}
                onChange={handleChange('isBestseller')}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Bestseller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival || false}
                onChange={handleChange('isNewArrival')}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">New Arrival</span>
            </label>
          </div>
        </FormSection>
      </div>
    </Modal>
  );
}

export default AddEditFoodModal;