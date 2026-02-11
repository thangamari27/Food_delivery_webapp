import { Calendar, Clock, Users, AlertCircle, ChevronRight  } from "lucide-react"

function BookingCard({ content, booking, onBookingClick, onAction, styles }) {
  
  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    if (content.status_names && content.status_names[status]) {
      return content.status_names[status];
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getBadgeClass = (status) => {
    if (styles.badges && styles.badges[status]) {
      return styles.badges[status];
    }
    return styles.badges?.default || 'bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded';
  };

  return (
    <div className={styles.cards.hover} onClick={() => onBookingClick(booking)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className={styles.text.body.regular + ' font-semibold'}>
            {booking.restaurantName || 'Restaurant'}
          </div>
          <div className={styles.text.body.small_muted}>
            {booking.cuisine || 'Cuisine'}
          </div>
        </div>
        <span className={getBadgeClass(booking.status)}>
          {getStatusDisplay(booking.status)}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {booking.date ? new Date(booking.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }) : 'Date not set'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{booking.time || 'Time not set'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{booking.guests || 0} guests</span>
        </div>
      </div>

      {booking.specialRequests && (
        <div className={styles.special_requests?.container || 'bg-orange-50 rounded p-2 mb-3'}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`w-4 h-4 ${styles.icon_colors?.special_request || 'text-orange-500'} mt-0.5 flex-shrink-0`} />
            <span className="line-clamp-2">
              {typeof booking.specialRequests === 'string' 
                ? booking.specialRequests
                : 'Special Request'}
            </span>
          </div>
        </div>
      )}

      <div className={styles.borders?.card_divider || 'border-t border-gray-200 pt-2 mt-3 flex items-center justify-between'}>
        <span className={styles.text.body?.small_muted || 'text-gray-500 text-sm font-medium'}>
          ID: {booking.id || 'N/A'}
        </span>
        <ChevronRight className={`w-5 h-5 ${styles.icon_colors?.gray || 'text-gray-400'}`} />
      </div>
    </div>
  )
}

export default BookingCard;