import { useState } from "react";
import { X } from "lucide-react";

function CustomerFormModal({ content, customer, onSave, onClose, styles, loading = false }) {
  const [form, setForm] = useState(customer || {
    name: '', 
    email: '', 
    phone: '', 
    address: '', 
    city: '', 
    state: '', 
    postal: '', 
    status: 'active', 
    notes: ''
  });

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || loading) {
      return;
    }
    onSave(form);
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.modal.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>{customer ? content.form.editTitle : content.form.createTitle}</h2>
          <button 
            onClick={onClose} 
            className={styles.button.icon}
            aria-label="Close form"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={styles.modal.body}>
          <section className={styles.form.section}>
            <h3 className={styles.form.sectionTitle}>{content.form.sections.basic}</h3>
            <div className={styles.form.group}>
              <label className={styles.form.label}>
                {content.form.fields.name.label}
                <span className={styles.form.required} aria-hidden="true">*</span>
              </label>
              <input 
                type="text" 
                placeholder={content.form.fields.name.placeholder}
                value={form.name} 
                onChange={(e) => updateForm('name', e.target.value)} 
                className={styles.form.input}
                required 
                disabled={loading}
              />
            </div>
            <div className={styles.form.grid2}>
              <div className={styles.form.group}>
                <label className={styles.form.label}>
                  {content.form.fields.email.label}
                  <span className={styles.form.required} aria-hidden="true">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder={content.form.fields.email.placeholder}
                  value={form.email} 
                  onChange={(e) => updateForm('email', e.target.value)} 
                  className={styles.form.input}
                  required 
                  disabled={loading}
                />
              </div>
              <div className={styles.form.group}>
                <label className={styles.form.label}>
                  {content.form.fields.phone.label}
                  <span className={styles.form.required} aria-hidden="true">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder={content.form.fields.phone.placeholder}
                  value={form.phone} 
                  onChange={(e) => updateForm('phone', e.target.value)} 
                  className={styles.form.input}
                  required 
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          <section className={styles.form.section}>
            <h3 className={styles.form.sectionTitle}>{content.form.sections.address}</h3>
            <div className={styles.form.group}>
              <label className={styles.form.label}>{content.form.fields.address.label}</label>
              <input 
                type="text" 
                placeholder={content.form.fields.address.placeholder}
                value={form.address} 
                onChange={(e) => updateForm('address', e.target.value)} 
                className={styles.form.input}
                disabled={loading}
              />
            </div>
            <div className={styles.form.grid2}>
              <div className={styles.form.group}>
                <label className={styles.form.label}>{content.form.fields.city.label}</label>
                <input 
                  type="text" 
                  placeholder={content.form.fields.city.placeholder}
                  value={form.city} 
                  onChange={(e) => updateForm('city', e.target.value)} 
                  className={styles.form.input}
                  disabled={loading}
                />
              </div>
              <div className={styles.form.group}>
                <label className={styles.form.label}>{content.form.fields.state.label}</label>
                <input 
                  type="text" 
                  placeholder={content.form.fields.state.placeholder}
                  value={form.state} 
                  onChange={(e) => updateForm('state', e.target.value)} 
                  className={styles.form.input}
                  disabled={loading}
                />
              </div>
            </div>
            <div className={styles.form.group}>
              <label className={styles.form.label}>{content.form.fields.postal.label}</label>
              <input 
                type="text" 
                placeholder={content.form.fields.postal.placeholder}
                value={form.postal} 
                onChange={(e) => updateForm('postal', e.target.value)} 
                className={styles.form.input}
                disabled={loading}
              />
            </div>
          </section>

          <section className={styles.form.section}>
            <h3 className={styles.form.sectionTitle}>{content.form.sections.account}</h3>
            <div className={styles.form.group}>
              <label className={styles.form.label}>{content.form.fields.status.label}</label>
              <select 
                value={form.status} 
                onChange={(e) => updateForm('status', e.target.value)} 
                className={styles.form.input}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className={styles.form.group}>
              <label className={styles.form.label}>{content.form.fields.notes.label}</label>
              <textarea 
                placeholder={content.form.fields.notes.placeholder}
                value={form.notes} 
                onChange={(e) => updateForm('notes', e.target.value)} 
                className={styles.form.textarea}
                disabled={loading}
              />
            </div>
          </section>
        </div>
        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.button.secondary} disabled={loading}>
            {content.form.buttons.cancel}
          </button>
          <button 
            onClick={handleSave} 
            disabled={!form.name.trim() || !form.email.trim() || !form.phone.trim() || loading}
            className={styles.button.primary}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {content.form.buttons.saving || "Saving..."}
              </span>
            ) : (
              content.form.buttons.save
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerFormModal