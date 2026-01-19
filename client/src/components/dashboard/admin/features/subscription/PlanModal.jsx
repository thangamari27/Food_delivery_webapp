import { useState, useEffect, useCallback } from 'react';
import { IndianRupee, Check, X, Save } from 'lucide-react';

function PlanModal({ 
  content, 
  modalTypes, 
  planStatus, 
  isOpen, 
  mode, 
  plan, 
  activePeriod, 
  onClose, 
  onSave, 
  styles 
}) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    savings: '',
    popular: false,
    badge_text: 'Most Popular',
    status: planStatus.ACTIVE,
    features: []
  });

  const [featuresText, setFeaturesText] = useState('');

  // Initialize form when modal opens or plan changes
  useEffect(() => {
    if (isOpen && plan) {
      setFormData({
        id: plan.id || '',
        name: plan.name || '',
        price: plan.price || '',
        savings: plan.savings || '',
        popular: plan.popular || false,
        badge_text: plan.badge_text || content.plan_form.placeholders.badge_text,
        status: plan.status || planStatus.ACTIVE,
        features: plan.features || []
      });
      setFeaturesText(plan.features ? plan.features.join('\n') : '');
    } else if (isOpen && mode === modalTypes.CREATE) {
      const newId = `${formData.name.toLowerCase()}-${activePeriod.toLowerCase()}`;
      setFormData({
        id: newId,
        name: '',
        price: '',
        savings: '',
        popular: false,
        badge_text: content.plan_form.placeholders.badge_text,
        status: planStatus.ACTIVE,
        features: []
      });
      setFeaturesText('');
    }
  }, [isOpen, plan, mode, activePeriod, content, planStatus, modalTypes]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFeaturesChange = useCallback((value) => {
    setFeaturesText(value);
    const featuresArray = value.split('\n').filter(f => f.trim() !== '');
    setFormData(prev => ({ ...prev, features: featuresArray }));
  }, []);

  const handleSubmit = useCallback(() => {
    const updatedFormData = {
      ...formData,
      id: formData.id || `${formData.name.toLowerCase()}-${activePeriod.toLowerCase()}`,
      price: Number(formData.price),
      savings: formData.savings ? Number(formData.savings) : null
    };
    onSave(updatedFormData, activePeriod);
    onClose();
  }, [formData, activePeriod, onSave, onClose]);

  if (!isOpen) return null;

  const isViewMode = mode === modalTypes.VIEW;
  const isDisabled = !formData.name || !formData.price || formData.features.length === 0;
  
  const getModalTitle = () => {
    if (mode === modalTypes.CREATE) {
      return `Create New ${activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)} Plan`;
    }
    if (mode === modalTypes.EDIT) {
      return `Edit ${plan?.name} Plan`;
    }
    return `View ${plan?.name} Plan Details`;
  };

  return (
    <div 
      className={styles.modal.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal.container}>
        {/* Modal Header */}
        <div className={styles.modal.header}>
          <h2 className={styles.typography.heading_2}>
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className={styles.button.ghost}
            aria-label="Close modal"
          >
            <X className={styles.icon.medium} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modal.body}>
          <div className={styles.form.field}>
            {/* Plan Name */}
            <div>
              <label className={styles.form.label}>
                {content.plan_form.labels.plan_name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isViewMode}
                className={styles.input.text}
                placeholder={content.plan_form.placeholders.plan_name}
              />
            </div>

            {/* Price and Savings */}
            <div className={styles.form.grid_2}>
              <div>
                <label className={styles.form.label}>
                  {content.plan_form.labels.price}
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    disabled={isViewMode}
                    className={styles.input.currency}
                    placeholder={content.plan_form.placeholders.price}
                  />
                </div>
              </div>
              
              <div>
                <label className={styles.form.label}>
                  {content.plan_form.labels.savings}
                </label>
                <input
                  type="number"
                  value={formData.savings || ''}
                  onChange={(e) => handleInputChange('savings', e.target.value)}
                  disabled={isViewMode}
                  className={styles.input.text}
                  placeholder={content.plan_form.placeholders.savings}
                />
              </div>
            </div>

            {/* Popular Badge */}
            <div className="space-y-3">
              <div className={styles.layout.flex.row}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => handleInputChange('popular', e.target.checked)}
                    disabled={isViewMode}
                    className={styles.input.checkbox}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {content.plan_form.labels.popular_plan}
                  </span>
                </label>
              </div>
              
              {formData.popular && (
                <div>
                  <label className={styles.form.label}>
                    {content.plan_form.labels.badge_text}
                  </label>
                  <input
                    type="text"
                    value={formData.badge_text}
                    onChange={(e) => handleInputChange('badge_text', e.target.value)}
                    disabled={isViewMode}
                    className={styles.input.text}
                    placeholder={content.plan_form.placeholders.badge_text}
                  />
                </div>
              )}
            </div>

            {/* Plan Status */}
            <div>
              <label className={styles.form.label}>
                {content.plan_form.labels.plan_status}
              </label>
              <div className={styles.form.group}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={planStatus.ACTIVE}
                    checked={formData.status === planStatus.ACTIVE}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    disabled={isViewMode}
                    className={styles.input.radio}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {content.plan_form.status_options.active}
                  </span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={planStatus.INACTIVE}
                    checked={formData.status === planStatus.INACTIVE}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    disabled={isViewMode}
                    className={styles.input.radio}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {content.plan_form.status_options.inactive}
                  </span>
                </label>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className={styles.form.label}>
                {content.plan_form.labels.plan_features}
              </label>
              <textarea
                rows={8}
                value={featuresText}
                onChange={(e) => handleFeaturesChange(e.target.value)}
                disabled={isViewMode}
                className={styles.input.textarea}
                placeholder={content.plan_form.placeholders.features}
              />
              <p className={styles.typography.body_xsmall}>
                {formData.features.length} {content.plan_form.labels.features_added}
              </p>
            </div>

            {/* Feature Preview */}
            {formData.features.length > 0 && (
              <div className={styles.form.preview}>
                <h4 className={styles.typography.heading_3}>
                  {content.plan_form.labels.feature_preview}
                </h4>
                <div className="space-y-2 mt-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className={styles.feature_list.item}>
                      <Check className={`${styles.icon.small} ${styles.icon.success} mt-0.5 flex-shrink-0`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modal.footer}>
          <button
            onClick={onClose}
            className={styles.button.secondary}
          >
            {isViewMode 
              ? content.plan_form.buttons.close
              : content.plan_form.buttons.cancel
            }
          </button>
          
          {!isViewMode && (
            <button
              onClick={handleSubmit}
              className={`${styles.button.success} ${isDisabled ? styles.button.disabled : ''}`}
              disabled={isDisabled}
            >
              <Save className={styles.icon.small} />
              {mode === modalTypes.CREATE 
                ? content.plan_form.buttons.create_plan
                : content.plan_form.buttons.update_plan
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanModal;