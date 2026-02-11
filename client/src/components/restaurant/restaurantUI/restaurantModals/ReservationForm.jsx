import { Clock, Loader2 } from "lucide-react";
import { useState } from "react";

const ReservationForm = ({ 
  restaurant, 
  content, 
  styles, 
  onSubmit, 
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
    occasion: 'Regular'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className={styles.modalBodyPadding}>
      <div className={styles.formGroup}>
        <FormFields 
          formData={formData} 
          handleChange={handleChange} 
          content={content} 
          styles={styles}
          today={today}
          disabled={isSubmitting}
        />
        
        <ImportantInfo content={content} styles={styles} />
        
        <FormActions 
          onCancel={onCancel} 
          content={content} 
          styles={styles}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

// Sub-component: Form Fields Grid
const FormFields = ({ formData, handleChange, content, styles, today, disabled }) => (
  <div className={styles.formGrid}>
    <FormField
      label={content.fields.name.label}
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      placeholder={content.fields.name.placeholder}
      required
      disabled={disabled}
      styles={styles}
    />
    
    <FormField
      label={content.fields.email.label}
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      placeholder={content.fields.email.placeholder}
      required
      disabled={disabled}
      styles={styles}
    />
    
    <FormField
      label={content.fields.phone.label}
      name="phone"
      type="tel"
      value={formData.phone}
      onChange={handleChange}
      placeholder={content.fields.phone.placeholder}
      required
      disabled={disabled}
      styles={styles}
    />
    
    <GuestSelect
      label={content.fields.guests.label}
      value={formData.guests}
      onChange={handleChange}
      options={content.guestOptions}
      disabled={disabled}
      styles={styles}
    />
    
    <FormField
      label={content.fields.date.label}
      name="date"
      type="date"
      value={formData.date}
      onChange={handleChange}
      min={today}
      required
      disabled={disabled}
      styles={styles}
    />
    
    <TimeSelect
      label={content.fields.time.label}
      value={formData.time}
      onChange={handleChange}
      options={content.timeSlots}
      disabled={disabled}
      styles={styles}
    />
    
    <div className="col-span-2">
      <label className={styles.formLabel}>
        {content.fields.specialRequests?.label || 'Special Requests'}
      </label>
      <textarea
        name="specialRequests"
        value={formData.specialRequests}
        onChange={handleChange}
        className={styles.formInput}
        placeholder={content.fields.specialRequests?.placeholder || 'Any special requests?'}
        rows={3}
        disabled={disabled}
      />
    </div>
  </div>
);

// Sub-component: Individual Form Field
const FormField = ({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required, 
  min, 
  disabled,
  styles 
}) => (
  <div>
    <label className={styles.formLabel}>
      {label} {required && '*'}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={styles.formInput}
      placeholder={placeholder}
      min={min}
    />
  </div>
);

// Sub-component: Guest Select
const GuestSelect = ({ label, value, onChange, options, disabled, styles }) => (
  <div>
    <label className={styles.formLabel}>
      {label} *
    </label>
    <select
      name="guests"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={styles.formSelect}
    >
      {options.map(num => (
        <option key={num} value={num}>
          {num} {num === 1 ? 'Guest' : 'Guests'}
        </option>
      ))}
    </select>
  </div>
);

// Sub-component: Time Select
const TimeSelect = ({ label, value, onChange, options, disabled, styles }) => (
  <div>
    <label className={styles.formLabel}>
      {label} *
    </label>
    <select
      name="time"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={styles.formSelect}
    >
      <option value="">Select time</option>
      {options.map(slot => (
        <option key={slot.value} value={slot.value}>
          {slot.label}
        </option>
      ))}
    </select>
  </div>
);

// Sub-component: Important Info
const ImportantInfo = ({ content, styles }) => (
  <div className={styles.formInfoBox}>
    <div className={styles.formInfoContent}>
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className={styles.formInfoTitle}>
          {content.importantInfo.title}
        </p>
        <ul className={styles.formInfoList}>
          {content.importantInfo.points.map((point, index) => (
            <li key={index}>• {point}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Sub-component: Form Actions
const FormActions = ({ onCancel, content, styles, isSubmitting }) => (
  <div className={styles.formActions}>
    <button
      type="button"
      onClick={onCancel}
      disabled={isSubmitting}
      className={`${styles.formButtonSecondary} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content.buttons.cancel}
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`${styles.formButtonPrimary} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Booking...
        </span>
      ) : (
        content.buttons.confirm
      )}
    </button>
  </div>
);

export default ReservationForm;