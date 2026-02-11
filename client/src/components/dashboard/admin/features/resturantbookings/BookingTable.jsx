import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import BookingActions from "./BookingActions"

function BookingTable({ content, bookings, onBookingClick, onAction, styles }) {
  
  // Helper function to safely get status display
  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    
    if (content.status_names && content.status_names[status]) {
      return content.status_names[status];
    }
    
    // Safely capitalize
    return typeof status === 'string' 
      ? status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
      : String(status);
  };
  
  // Helper function to get badge class
  const getBadgeClass = (status) => {
    if (styles.badges && styles.badges[status]) {
      return styles.badges[status];
    }
    return styles.badges?.default || 'bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded';
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className={styles.layout.table_container}>
      <table className="w-full">
        <thead className={styles.layout.table_header}>
          <tr>
            {content.table_headers.map((header, index) => (
              <th key={`header-${index}`} className={styles.layout.table_cell + ' ' + styles.text.label.table_header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking, index) => {
            // Generate unique key
            const uniqueKey = booking.id || booking._id || booking.bookingId || `booking-${index}`;
            
            return (
              <tr key={uniqueKey} className={styles.layout.table_row}>
                <td className={styles.layout.table_cell + ' ' + styles.text.body.regular + ' font-medium'}>
                  <span className="block truncate max-w-[120px]">
                    {booking.bookingId || booking.id || booking._id || 'N/A'}
                  </span>
                </td>
                <td className={styles.layout.table_cell}>
                  <div className={styles.text.body.regular + ' font-medium'}>
                    {booking.restaurantName || 'N/A'}
                  </div>
                  <div className={styles.text.body.muted}>
                    {booking.cuisine || 'N/A'}
                  </div>
                </td>
                <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                  {formatDate(booking.date)}
                </td>
                <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                  {booking.time || 'N/A'}
                </td>
                <td className={styles.layout.table_cell + ' ' + styles.text.body.regular}>
                  {booking.guests || 'N/A'}
                </td>
                <td className={styles.layout.table_cell}>
                  <span className={getBadgeClass(booking.status)}>
                    {getStatusDisplay(booking.status)}
                  </span>
                </td>
                <td className={`${styles.layout.table_cell} ${styles.text.body.regular} max-w-xs`}>
                  {booking.specialRequests ? (
                    <div className="flex items-center gap-1 group relative">
                      <AlertCircle className={`w-4 h-4 ${styles.icon_colors?.special_request || 'text-orange-500'}`} />
                      <span className="truncate">
                        {typeof booking.specialRequests === 'string' 
                          ? (booking.specialRequests.length > 20 
                              ? booking.specialRequests.substring(0, 20) + '...'
                              : booking.specialRequests)
                          : 'Special Request'}
                      </span>
                      {booking.specialRequests.length > 20 && (
                        <div className={styles.special_requests?.tooltip || 'hidden group-hover:block absolute z-10 p-2 bg-gray-900 text-white text-xs rounded top-full left-0 min-w-[200px]'}>
                          {booking.specialRequests}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className={styles.text.body?.muted || 'text-gray-500'}>None</span>
                  )}
                </td>
                <td className={styles.layout.table_cell}>
                  {booking.canCancel === true ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : booking.canCancel === false ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </td>
                <td className={`${styles.layout.table_cell} ${styles.text.body.small}`}>
                  <BookingActions 
                    content={content}
                    booking={booking} 
                    onAction={onAction} 
                    onViewDetails={() => onBookingClick(booking)} 
                    compact 
                    styles={styles}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BookingTable;