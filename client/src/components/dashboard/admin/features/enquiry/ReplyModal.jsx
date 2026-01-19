import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

function ReplyModal({ content, enquiry, on_close, on_submit, styles }) {
  const [reply, setReply] = useState('');
  const [internal_note, setInternalNote] = useState('');

  const handle_submit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    on_submit(enquiry.id, {
      message: reply,
      replied_by: 'Admin Support',
      replied_at: new Date().toISOString(),
      internal_note: internal_note.trim() || null
    });
    on_close();
  };

  if (!enquiry) return null;

  return (
    <div className={styles.modal_overlay} onClick={on_close}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            <MessageSquare className="w-5 h-5 inline mr-2" />
            {content.modal_content.reply.title}
          </h2>
          <button onClick={on_close} className={styles.modal_close_button}>
            <X className={styles.modal_close_icon} />
          </button>
        </div>
        <form onSubmit={handle_submit} className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {enquiry.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{enquiry.name}</p>
                <p className="text-xs text-gray-500">{enquiry.email}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">{enquiry.subject}</p>
            <p className="text-xs text-gray-600 line-clamp-2">{enquiry.message}</p>
          </div>

          <div className={styles.form_group_full}>
            <label className={styles.form_label}>
              {content.form_fields.reply.label} *
            </label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={content.form_fields.reply.placeholder}
              rows={6}
              required
              className={styles.form_textarea}
            />
          </div>

          <div className={styles.form_group_full}>
            <label className={styles.form_label}>
              {content.form_fields.internal_note.label}
            </label>
            <textarea
              value={internal_note}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder={content.form_fields.internal_note.placeholder}
              rows={3}
              className={styles.form_textarea}
            />
            <p className="text-xs text-gray-500 mt-1">This note is for internal reference only</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={on_close} 
              className={styles.button_secondary}
            >
              {content.modal_content.reply.cancel_button}
            </button>
            <button 
              type="submit" 
              disabled={!reply.trim()} 
              className={styles.button_primary}
            >
              {content.modal_content.reply.submit_button}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReplyModal