import {
  Check,
  Clock,
  XCircle,
  Calendar,
  User
} from "lucide-react";
import SlidePanel from "./SlidePanel";

const BookingsPanel = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  styles
}) => {
  const getStatusConfig = status => {
    const configs = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: Check,
        label: "Confirmed"
      },
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: Clock,
        label: "Pending"
      },
      completed: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: Check,
        label: "Completed"
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled"
      }
    };

    return configs[status] || configs.pending;
  };

  const bookPanelStyles = styles.bookingsPanelStyles;

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Restaurant Bookings"
      styles={styles}
    >
      <div className={bookPanelStyles.contentContainer}>
        {bookings.length > 0 ? (
          bookings.map(booking => {
            const statusConfig = getStatusConfig(
              booking.status
            );
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={booking.id}
                className={bookPanelStyles.bookingItem.container}
              >
                <div className={bookPanelStyles.bookingItem.header}>
                  <h3
                    className={
                      bookPanelStyles.bookingItem.restaurantName
                    }
                  >
                    {booking.restaurant}
                  </h3>

                  <span
                    className={`${bookPanelStyles.bookingItem.statusBadge} ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon
                      className={
                        bookPanelStyles.bookingItem.statusIcon
                      }
                    />
                    {statusConfig.label}
                  </span>
                </div>

                <div
                  className={
                    bookPanelStyles.bookingItem.detailsContainer
                  }
                >
                  <div
                    className={
                      bookPanelStyles.bookingItem.detailItem
                    }
                  >
                    <Calendar
                      className={
                        bookPanelStyles.bookingItem.detailIcon
                      }
                    />
                    {booking.date} at {booking.time}
                  </div>

                  <div
                    className={
                      bookPanelStyles.bookingItem.detailItem
                    }
                  >
                    <User
                      className={
                        bookPanelStyles.bookingItem.detailIcon
                      }
                    />
                    {booking.guests} guests
                  </div>

                  {booking.specialRequests && (
                    <div
                      className={
                        bookPanelStyles.bookingItem.specialRequestContainer
                      }
                    >
                      <p
                        className={
                          bookPanelStyles.bookingItem.specialRequestTitle
                        }
                      >
                        Special Request:
                      </p>
                      <p
                        className={
                          bookPanelStyles.bookingItem.specialRequestText
                        }
                      >
                        {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </div>

                {booking.canCancel && (
                  <button
                    onClick={() =>
                      onCancelBooking(booking.id)
                    }
                    className={
                      bookPanelStyles.bookingItem.cancelBtn
                    }
                  >
                    <XCircle
                      className={
                        bookPanelStyles.bookingItem.cancelIcon
                      }
                    />
                    Cancel Booking
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className={bookPanelStyles.emptyState.container}>
            <Calendar
              className={bookPanelStyles.emptyState.icon}
            />
            <p className={bookPanelStyles.emptyState.title}>
              No bookings yet
            </p>
            <p className={bookPanelStyles.emptyState.description}>
              Book a table at your favorite restaurant!
            </p>
          </div>
        )}
      </div>
    </SlidePanel>
  );
};

export default BookingsPanel;
