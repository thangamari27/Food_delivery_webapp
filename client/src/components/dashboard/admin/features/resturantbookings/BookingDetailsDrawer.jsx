import React, { useState, useEffect } from 'react'
import { AlertCircle, X,  } from 'lucide-react';
import RestaurantInfoPanel from './RestaurantInfoPanel';
import BookingActions from './BookingActions';

function BookingDetailsDrawer({ content, booking, restaurant, isOpen, onClose, onAction, onSaveNote, styles }) {
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (booking) {
      setAdminNote(booking.adminNotes || '');
    }
  }, [booking]);

  const handleSaveNote = () => {
    onSaveNote(adminNote);
  };

  if (!isOpen || !booking) return null;

  return (
    <React.Fragment>
      <div
        className={styles.layout.drawer_overlay}
        onClick={onClose}
      />
      
      <div className={`${styles.layout.drawer_container} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={styles.layout.drawer_header}>
          <div>
            <h2 className={styles.text.heading.h2}>
              {content.drawer.title}
            </h2>
            <p className={styles.text.body.small_muted}>
              ID: {booking.id}
            </p>
          </div>
          <button onClick={onClose} className={styles.buttons.icon}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={styles.layout.drawer_content}>
          <section>
            <h3 className={styles.text.heading.h3 + ' mb-3'}>
              {content.drawer.booking_summary}
            </h3>
            <div className={styles.cards.base}>
              <div className="space-y-3">
                {Object.entries(content.drawer.summary_labels).map(([key, label]) => {
                  let value;
                  
                  switch(key) {
                    case 'status':
                      value = (
                        <span className={styles.badges[booking.status]}>
                          {content.status_names[booking.status]}
                        </span>
                      );
                      break;
                    case 'date':
                      value = (
                        <span className={styles.text.body.small + ' font-medium'}>
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      );
                      break;
                    case 'time':
                      value = (
                        <span className={styles.text.body.small + ' font-medium'}>
                          {booking.time}
                        </span>
                      );
                      break;
                    case 'guests':
                      value = (
                        <span className={styles.text.body.small + ' font-medium'}>
                          {booking.guests} people
                        </span>
                      );
                      break;
                    case 'can_cancel':
                      value = booking.canCancel ? (
                        <span className={styles.text.body.small + ' font-medium text-green-600'}>
                          Yes
                        </span>
                      ) : (
                        <span className={styles.text.body.small + ' font-medium text-red-600'}>
                          No
                        </span>
                      );
                      break;
                    case 'created':
                      value = (
                        <span className={styles.text.body.small + ' font-medium'}>
                          {new Date(booking.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      );
                      break;
                    default:
                      value = '';
                  }
                  
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className={styles.text.body.small_muted}>
                        {label}
                      </span>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <h3 className={styles.text.heading.h3 + ' mb-3'}>
              {content.drawer.customer_information}
            </h3>
            <div className={styles.cards.base}>
              <div className="space-y-3">
                {Object.entries(content.drawer.customer_labels).map(([key, label]) => {
                  let value;
                  
                  switch(key) {
                    case 'name':
                      value = (
                        <span className={styles.text.body.small + ' font-medium'}>
                          {booking.customerName}
                        </span>
                      );
                      break;
                    case 'email':
                      value = (
                        <a href={`mailto:${booking.customerEmail}`} 
                           className={styles.text.body.small + ' text-orange-600 hover:underline'}>
                          {booking.customerEmail}
                        </a>
                      );
                      break;
                    case 'phone':
                      value = (
                        <a href={`tel:${booking.customerPhone}`} 
                           className={styles.text.body.small + ' text-orange-600 hover:underline'}>
                          {booking.customerPhone}
                        </a>
                      );
                      break;
                    default:
                      value = '';
                  }
                  
                  return (
                    <div key={key}>
                      <span className={styles.text.body.small_muted + ' block mb-1'}>
                        {label}
                      </span>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <h3 className={styles.text.heading.h3 + ' mb-3'}>
              {content.drawer.restaurant_information}
            </h3>
            <div className={styles.cards.base}>
              <RestaurantInfoPanel content={content} restaurant={restaurant} styles={styles} />
            </div>
          </section>

          {booking.specialRequests && (
            <section>
              <h3 className={styles.text.heading.h3 + ' mb-3'}>
                {content.drawer.special_requests}
              </h3>
              <div className={styles.cards.base}>
                <div className="flex items-start gap-2">
                  <AlertCircle className={`w-5 h-5 ${styles.icon_colors.special_request} mt-0.5 flex-shrink-0`} />
                  <p className={styles.text.body.small}>
                    {booking.specialRequests}
                  </p>
                </div>
              </div>
            </section>
          )}

          <section>
            <h3 className={styles.text.heading.h3 + ' mb-3'}>
              {content.drawer.admin_notes}
            </h3>
            <div className={styles.cards.base}>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder={content.drawer.admin_notes_placeholder}
                className={styles.inputs.textarea}
                rows={4}
              />
              <button
                onClick={handleSaveNote}
                className={`${styles.buttons.primary} mt-2 w-full justify-center text-sm`}
              >
                {content.drawer.save_note}
              </button>
            </div>
          </section>

          <section>
            <h3 className={styles.text.heading.h3 + ' mb-3'}>
              {content.drawer.actions}
            </h3>
            <BookingActions content={content} booking={booking} onAction={onAction} onViewDetails={() => {}} styles={styles}  />
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BookingDetailsDrawer