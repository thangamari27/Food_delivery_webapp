import { Clock } from "lucide-react";
import { useState } from "react";

const ReservationForm = ({ restaurant, content, styles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        />
        
        <ImportantInfo content={content} styles={styles} />
        
        <FormActions onCancel={onCancel} content={content} styles={styles} />
      </div>
    </form>
  );
};

// Sub-component: Form Fields Grid
const FormFields = ({ formData, handleChange, content, styles, today }) => (
  <div className={styles.formGrid}>
    <FormField
      label={content.fields.name.label}
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      placeholder={content.fields.name.placeholder}
      required
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
      styles={styles}
    />
    
    <GuestSelect
      label={content.fields.guests.label}
      value={formData.guests}
      onChange={handleChange}
      options={content.guestOptions}
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
      styles={styles}
    />
    
    <TimeSelect
      label={content.fields.time.label}
      value={formData.time}
      onChange={handleChange}
      options={content.timeSlots}
      styles={styles}
    />
  </div>
);

// Sub-component: Individual Form Field
const FormField = ({ label, name, type, value, onChange, placeholder, required, min, styles }) => (
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
      className={styles.formInput}
      placeholder={placeholder}
      min={min}
    />
  </div>
);

// Sub-component: Guest Select
const GuestSelect = ({ label, value, onChange, options, styles }) => (
  <div>
    <label className={styles.formLabel}>
      {label} *
    </label>
    <select
      name="guests"
      value={value}
      onChange={onChange}
      required
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
const TimeSelect = ({ label, value, onChange, options, styles }) => (
  <div>
    <label className={styles.formLabel}>
      {label} *
    </label>
    <select
      name="time"
      value={value}
      onChange={onChange}
      required
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
const FormActions = ({ onCancel, content, styles }) => (
  <div className={styles.formActions}>
    <button
      type="button"
      onClick={onCancel}
      className={styles.formButtonSecondary}
    >
      {content.buttons.cancel}
    </button>
    <button
      type="submit"
      className={styles.formButtonPrimary}
    >
      {content.buttons.confirm}
    </button>
  </div>
);

export default ReservationForm;