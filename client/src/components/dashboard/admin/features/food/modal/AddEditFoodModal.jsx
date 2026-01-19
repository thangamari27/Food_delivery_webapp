import { Save } from 'lucide-react';
import Button from '../ui/Button';
import Modal from './Modal';
import FormSection from '../ui/FormSection';
import Select from '../ui/Select';
import Input from '../ui/Input';
import ImageUpload from '../ui/ImageUpload';

function AddEditFoodModal({
  content,
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
  styles
}) {
  const modalContent = isEdit ? content.modal.edit : content.modal.add;
  
  return (
    <Modal
      styles={styles}
      isOpen={isOpen}
      onClose={() => { onClose(); resetForm(); }}
      title={modalContent.title}
      footer={
        <>
          <Button variant="secondary" onClick={() => { onClose(); resetForm(); }} styles={styles}>
            {modalContent.cancelButton}
          </Button>
          <Button onClick={handleSubmit} styles={styles}>
            <Save size={18} />
            {modalContent.submitButton}
          </Button>
        </>
      }
    >
      <div className={styles.form.section}>
        <FormSection styles={styles} title="Basic Information">
          <div className={styles.form.group}>
            <Input
              label={content.form.name.label}
              required={content.form.name.required}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formErrors.name}
              placeholder={content.form.name.placeholder}
              styles={styles}
            />
            <div className={styles.form.grid}>
              <Select
                label={content.form.restaurant.label}
                required={content.form.restaurant.required}
                value={formData.restaurant}
                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                error={formErrors.restaurant}
                styles={styles}
              >
                <option value="">Select Restaurant</option>
                {content.restaurants.map(rest => (
                  <option key={rest.id} value={rest.name}>{rest.name}</option>
                ))}
              </Select>
              <Select
                label={content.form.category.label}
                required={content.form.category.required}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                error={formErrors.category}
                styles={styles}
              >
                <option value="">Select Category</option>
                {content.categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>
            <div className={styles.form.grid}>
              <Select
                label={content.form.cuisine.label}
                required={content.form.cuisine.required}
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                error={formErrors.cuisine}
                styles={styles}
              >
                <option value="">Select Cuisine</option>
                {content.cuisines.map(cui => (
                  <option key={cui} value={cui}>{cui}</option>
                ))}
              </Select>
              <Select
                label={content.form.type.label}
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                styles={styles}
              >
                {content.foodTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </Select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Pricing" styles={styles}>
          <div className={styles.form.grid}>
            <div>
              <label className={styles.form.label}>
                {content.form.price.label} <span className={styles.form.required}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={`${styles.inputs.base} pl-8 ${formErrors.price ? styles.inputs.error : styles.inputs.normal}`}
                  placeholder={content.form.price.placeholder}
                />
              </div>
              {formErrors.price && <p className={styles.form.error}>{formErrors.price}</p>}
            </div>
            <div>
              <label className={styles.form.label}>{content.form.originalPrice.label} (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className={`${styles.inputs.base} pl-8 ${formErrors.originalPrice ? styles.inputs.error : styles.inputs.normal}`}
                  placeholder={content.form.originalPrice.placeholder}
                />
              </div>
              {formErrors.originalPrice && <p className={styles.form.error}>{formErrors.originalPrice}</p>}
            </div>
          </div>
        </FormSection>

        <FormSection title="Description" styles={styles}>
          <div>
            <label className={styles.form.label}>{content.form.description.label}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              maxLength={content.form.description.maxLength}
              className={`${styles.inputs.base} resize-none`}
              placeholder={content.form.description.placeholder}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.description.length}/{content.form.description.maxLength} characters
            </div>
          </div>
        </FormSection>

        <FormSection title={content.form.image.label} styles={styles}>
          <ImageUpload content={content} preview={imagePreview} onChange={handleImageUpload} styles={styles} />
        </FormSection>

        <FormSection title="Status" styles={styles}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.status === 'Active'}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Inactive' })}
              className={`w-5 h-5 rounded border-gray-300 ${styles.theme.primaryText} ${styles.theme.primaryRing}`}
            />
            <span className="text-sm font-medium text-gray-700">{content.form.status.activeLabel}</span>
          </label>
        </FormSection>
      </div>
    </Modal>
  )
}

export default AddEditFoodModal