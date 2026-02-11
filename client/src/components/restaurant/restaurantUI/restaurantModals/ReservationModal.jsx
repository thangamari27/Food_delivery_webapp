import { useState, useEffect } from 'react';
import ModalBase from "./ModalBase";
import ReservationForm from "./ReservationForm";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { transformToBackendFormat } from '../../../../utils/handler/bookingHandler';

const ReservationModal = ({ 
  isOpen, 
  onClose, 
  restaurant, 
  content, 
  styles,
  onSubmitBooking,
  bookingSuccess,
  bookingError,
  bookingLoading
}) => {
  const [localError, setLocalError] = useState(null);

  // Reset local error when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (validatedFormData) => {
    try {
      setLocalError(null);
      
      // Transform data to backend format
      const bookingData = transformToBackendFormat(validatedFormData, restaurant);
      
      // Submit through parent handler
      await onSubmitBooking(bookingData);
    } catch (error) {
      setLocalError(error.message || 'Failed to create booking. Please try again.');
      throw error;
    }
  };

  const modalHeader = (
    <>
      <h2 className={styles.modalTitle}>
        {bookingSuccess ? 'Booking Confirmed!' : content?.title || 'Book a Table'}
      </h2>
      {!bookingSuccess && (
        <p className={styles.modalSubtitle}>{restaurant.name}</p>
      )}
    </>
  );

  const modalBody = (
    <>
      {bookingSuccess ? (
        // Success State
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-full p-4 mb-4 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            Reservation Confirmed!
          </h3>
          <p className="text-gray-600 text-center mb-4 max-w-md">
            Your table has been successfully reserved at <span className="font-semibold">{restaurant.name}</span>.
            You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 w-full max-w-md">
            <p className="text-sm text-gray-600 text-center">
              Please check your email for booking details and arrival instructions.
            </p>
          </div>
        </div>
      ) : (
        // Form State
        <>
          {/* Display error messages */}
          {(bookingError || localError) && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Booking Failed</p>
                <p className="text-sm text-red-600 mt-1">
                  {bookingError || localError}
                </p>
              </div>
            </div>
          )}
          
          {/* Booking Form */}
          <ReservationForm
            restaurant={restaurant}
            content={content}
            styles={styles}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={bookingLoading}
          />
        </>
      )}
    </>
  );

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={bookingSuccess ? onClose : (bookingLoading ? null : onClose)}
      size="medium"
      showCloseButton={!bookingLoading}
      closeButtonPosition="header"
      styles={styles}
    >
      {{ header: modalHeader, body: modalBody }}
    </ModalBase>
  );
};

export default ReservationModal;