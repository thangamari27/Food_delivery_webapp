import { useState, useEffect } from "react";
import {
  Check,
  Clock,
  XCircle,
  Calendar,
  User,
  RefreshCw,
  AlertCircle,
  Phone,
  Mail
} from "lucide-react";
import SlidePanel from "./SlidePanel";
import { useBooking } from '../../../../context/admin/Bookingcontext';
import { useAuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-hot-toast';

const BookingsPanel = ({
  isOpen,
  onClose,
  styles
}) => {
  const { fetchMyBookings, cancelBooking, loading, bookings } = useBooking();
  const { user } = useAuthContext();
  const [cancellingId, setCancellingId] = useState(null);
  const [localBookings, setLocalBookings] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Update local bookings when context bookings change
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      setLocalBookings(bookings);
      setFetchError(null);
    } else if (bookings && bookings.length === 0) {
      setLocalBookings([]);
    }
  }, [bookings]);

  // Fetch bookings when panel opens
  useEffect(() => {
    if (isOpen && user) {
      loadBookings();
    }
  }, [isOpen, user, refreshKey]);

  const loadBookings = async () => {
    setFetchError(null);
    try {
      
      const result = await fetchMyBookings({
        limit: 50,
        status: 'all',
        upcoming: false
      });
      
      
      if (result && result.length === 0) {
        toast('No bookings found', { icon: '📭' });
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      const errorMsg = error.message || 'Failed to load bookings';
      setFetchError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Handle cancel booking
  const handleCancelBooking = async (booking) => {
    // Extract the correct ID - backend expects bookingId (UUID)
    const bookingId = booking.bookingId || booking.id || booking._id;
    
    if (!bookingId) {
      console.error('No valid booking ID found:', booking);
      toast.error('Invalid booking ID');
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingId(bookingId);
    try {
      const response = await cancelBooking(
        bookingId, 
        'Customer Request', 
        'Cancelled by customer from bookings panel'
      );
      
      if (response?.success) {
        toast.success('Booking cancelled successfully');
        // Refresh the list
        setTimeout(() => setRefreshKey(prev => prev + 1), 500);
      } else {
        toast.success('Booking cancelled successfully');
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      if (error.message?.includes('not found')) {
        toast.error('Booking could not be found. It may have been already cancelled.');
      } else {
        toast.error(error.message || 'Failed to cancel booking');
      }
    } finally {
      setCancellingId(null);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getStatusConfig = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    
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
      },
      no_show: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: XCircle,
        label: "No Show"
      }
    };

    return configs[statusLower] || configs.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Date not set';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time not set';
    return timeString;
  };

  const bookPanelStyles = styles?.bookingsPanelStyles || {};

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="My Restaurant Bookings"
      styles={styles}
    >
      <div className={bookPanelStyles.contentContainer || "p-4"}>
        {/* Header with refresh */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Bookings
          </h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh bookings"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-orange-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Error State */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-700 font-medium">Failed to load bookings</p>
              <p className="text-red-600 text-sm mt-1">{fetchError}</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !fetchError && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
            <span className="ml-3 text-gray-600">Loading your bookings...</span>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !fetchError && localBookings.length > 0 ? (
          <div className="space-y-4">
            {localBookings.map((booking, index) => {
              const displayId = booking.id || booking._id || booking.bookingId || `booking-${index}`;
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;
              
              const cancelId = booking.bookingId || booking.id || booking._id;
              const isCancelling = cancellingId === cancelId;
              const canCancel = booking.canCancel !== false && 
                               booking.status !== 'cancelled' && 
                               booking.status !== 'completed';

              // Get restaurant info
              const restaurantName = booking.restaurantName || 
                                    booking.restaurant?.restaurantName || 
                                    booking.restaurant?.name || 
                                    'Restaurant';
              
              const cuisine = booking.cuisine || 
                            (booking.restaurant?.cuisine ? 
                              (Array.isArray(booking.restaurant.cuisine) ? 
                                booking.restaurant.cuisine.join(', ') : 
                                booking.restaurant.cuisine) : 
                              '');

              return (
                <div
                  key={displayId}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  {/* Header with status */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {restaurantName}
                      </h3>
                      {cuisine && (
                        <p className="text-xs text-gray-500 mt-0.5">{cuisine}</p>
                      )}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {formatDate(booking.date || booking.bookingDate)} at{' '}
                        {formatTime(booking.time || booking.bookingTime)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {booking.guests || booking.numberOfGuests || 0}{' '}
                        {(booking.guests || booking.numberOfGuests || 0) === 1 ? 'guest' : 'guests'}
                      </span>
                      {booking.tableType && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                          {booking.tableType}
                        </span>
                      )}
                    </div>

                    {/* Customer Contact */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {booking.customerPhone || booking.customer?.phone ? (
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {booking.customerPhone || booking.customer?.phone}
                        </span>
                      ) : null}
                      {booking.customerEmail || booking.customer?.email ? (
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {booking.customerEmail || booking.customer?.email}
                        </span>
                      ) : null}
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                        <p className="text-xs font-medium text-orange-700 mb-1">
                          Special Request:
                        </p>
                        <p className="text-sm text-orange-900">
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}

                    {/* Occasion */}
                    {booking.occasion && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs">
                          {booking.occasion}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cancel Button */}
                  {canCancel && (
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      disabled={isCancelling}
                      className="w-full mt-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCancelling ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : !loading && !fetchError && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-900 font-medium text-lg mb-2">
              No bookings yet
            </p>
            <p className="text-gray-500 text-sm mb-4 max-w-xs">
              Book a table at your favorite restaurant and they will appear here
            </p>
            <button
              onClick={() => window.location.href = '/restaurants'}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>
    </SlidePanel>
  );
};

export default BookingsPanel;