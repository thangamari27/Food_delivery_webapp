import { CheckCircle,AlertCircle, XCircle } from "lucide-react"
import BookingActions from "./BookingActions"

function BookingTable({ content, bookings, onBookingClick, onAction, styles }) {
  return (
    <div className={styles.layout.table_container}>
      <table className="w-full">
        <thead className={styles.layout.table_header}>
          <tr>
            {content.table_headers.map((header) => (
              <th key={header} className={styles.layout.table_cell + ' ' + styles.text.label.table_header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className={styles.layout.table_row}>
              <td className={styles.layout.table_cell + ' ' + styles.text.body.regular + ' font-medium'}>
                {booking.id}
              </td>
              <td className={styles.layout.table_cell}>
                <div className={styles.text.body.regular + ' font-medium'}>
                  {booking.restaurantName}
                </div>
                <div className={styles.text.body.muted}>
                  {booking.cuisine}
                </div>
              </td>
              <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                {new Date(booking.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </td>
              <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                {booking.time}
              </td>
              <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                {booking.guests}
              </td>
              <td className={styles.layout.table_cell}>
                <span className={styles.badges[booking.status]}>
                  {content.status_names[booking.status] || 
                   booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </td>
              <td className={`${styles.layout.table_cell} ${styles.text.body.regular} max-w-xs`}>
                {booking.specialRequests ? (
                  <div className="flex items-center gap-1 group relative">
                    <AlertCircle className={`w-4 h-4 ${styles.icon_colors.special_request}`} />
                    <span className="truncate">{booking.specialRequests.substring(0, 20)}...</span>
                    <div className={styles.special_requests.tooltip}>
                      {booking.specialRequests}
                    </div>
                  </div>
                ) : (
                  <span className={styles.text.body.muted}>None</span>
                )}
              </td>
              <td className={styles.layout.table_cell}>
                {booking.canCancel ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </td>
              <td className={`${styles.layout.table_cell} ${styles.text.body.small}`}>
                <BookingActions 
                  content={content}
                  booking={booking} 
                  onAction={onAction} 
                  onViewDetails={onBookingClick} 
                  compact 
                  styles={styles}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingTable