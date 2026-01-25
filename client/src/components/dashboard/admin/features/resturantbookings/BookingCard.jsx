import { Calendar, Clock, Users, AlertCircle, ChevronRight  } from "lucide-react"

function BookingCard({ content, booking, onBookingClick, onAction, styles }) {
  return (
    <div className={styles.cards.hover} onClick={() => onBookingClick(booking)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className={styles.text.body.regular + ' font-semibold'}>
            {booking.restaurantName}
          </div>
          <div className={styles.text.body.small_muted}>
            {booking.cuisine}
          </div>
        </div>
        <span className={styles.badges[booking.status]}>
          {content.status_names[booking.status]}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(booking.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{booking.guests} guests</span>
        </div>
      </div>

      {booking.specialRequests && (
        <div className={styles.special_requests.container}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`w-4 h-4 ${styles.icon_colors.special_request} mt-0.5 flex-shrink-0`} />
            <span className="line-clamp-2">{booking.specialRequests}</span>
          </div>
        </div>
      )}

      <div className={styles.borders.card_divider + ' flex items-center justify-between'}>
        <span className={styles.text.body.small_muted + ' font-medium'}>
          ID: {booking.id}
        </span>
        <ChevronRight className={`w-5 h-5 ${styles.icon_colors.gray}`} />
      </div>
    </div>
  )
}

export default BookingCard