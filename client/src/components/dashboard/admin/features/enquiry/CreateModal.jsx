import { useState } from 'react';
import { Plus, X } from 'lucide-react';

function CreateModal({ content, on_close, on_create, styles }) {
  const [form_data, setFormData] = useState({
    name: '', 
    email: '', 
    subject: '', 
    purpose: 'general', 
    message: '', 
    priority: 'Medium'
  });

  const handle_submit = (e) => {
    e.preventDefault();
    on_create(form_data);
    on_close();
  };

  // Helper to render purpose option with icon
  const render_purpose_option = (purpose_config) => {
    const IconComponent = purpose_config.icon;
    if (IconComponent) {
      return (
        <span className="flex items-center gap-2">
          <IconComponent className={`w-4 h-4 ${purpose_config.icon_color || 'text-gray-500'}`} />
          {purpose_config.label}
        </span>
      );
    }
    // Fallback for compatibility (if purpose_config doesn't have icon property)
    return (
      <span className="flex items-center gap-2">
        {purpose_config.emoji || ''} {purpose_config.label}
      </span>
    );
  };

  return (
    <div className={styles.modal_overlay} onClick={on_close}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            <Plus className="w-5 h-5 inline mr-2" />
            {content.modal_content.create.title}
          </h2>
          <button onClick={on_close} className={styles.modal_close_button}>
            <X className={styles.modal_close_icon} />
          </button>
        </div>
        <form onSubmit={handle_submit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className={styles.form_grid}>
            <div className={styles.form_group}>
              <label className={styles.form_label}>
                {content.form_fields.name.label} *
              </label>
              <input 
                type="text" 
                value={form_data.name} 
                onChange={(e) => setFormData({ ...form_data, name: e.target.value })} 
                placeholder={content.form_fields.name.placeholder} 
                required 
                className={styles.form_input} 
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label}>
                {content.form_fields.email.label} *
              </label>
              <input 
                type="email" 
                value={form_data.email} 
                onChange={(e) => setFormData({ ...form_data, email: e.target.value })} 
                placeholder={content.form_fields.email.placeholder} 
                required 
                className={styles.form_input} 
              />
            </div>
          </div>
          <div className={styles.form_group_full}>
            <label className={styles.form_label}>
              {content.form_fields.subject.label} *
            </label>
            <input 
              type="text" 
              value={form_data.subject} 
              onChange={(e) => setFormData({ ...form_data, subject: e.target.value })} 
              placeholder={content.form_fields.subject.placeholder} 
              required 
              className={styles.form_input} 
            />
          </div>
          <div className={styles.form_grid}>
            <div className={styles.form_group}>
              <label className={styles.form_label}>
                {content.form_fields.purpose.label} *
              </label>
              <select 
                value={form_data.purpose} 
                onChange={(e) => setFormData({ ...form_data, purpose: e.target.value })} 
                className={styles.form_select}
              >
                {content.purposes.map(p => {
                  // Handle both old (emoji) and new (icon) format
                  const has_icon = p.icon !== undefined;
                  const IconComponent = p.icon;
                  
                  return (
                    <option key={p.value} value={p.value}>
                      {has_icon ? (
                        // New format with Lucide icon
                        `${p.label}`
                      ) : (
                        // Old format with emoji (for backward compatibility)
                        `${p.emoji || ''} ${p.label}`
                      )}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label}>
                {content.form_fields.priority.label} *
              </label>
              <select 
                value={form_data.priority} 
                onChange={(e) => setFormData({ ...form_data, priority: e.target.value })} 
                className={styles.form_select}
              >
                {content.priorities.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.form_group_full}>
            <label className={styles.form_label}>
              {content.form_fields.message.label} *
            </label>
            <textarea 
              value={form_data.message} 
              onChange={(e) => setFormData({ ...form_data, message: e.target.value })} 
              placeholder={content.form_fields.message.placeholder} 
              rows={6} 
              required 
              className={styles.form_textarea} 
            />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={on_close} 
              className={styles.button_secondary}
            >
              {content.modal_content.create.cancel_button}
            </button>
            <button 
              type="submit" 
              className={styles.button_primary}
            >
              {content.modal_content.create.submit_button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;