import ModalBase from "./ModalBase";
import ReservationForm from "./ReservationForm";
import { CheckCircle, Loader2 } from "lucide-react";

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
  const handleSubmit = async (formData) => {
    try {
      await onSubmitBooking(formData);
    } catch (error) {
      // Error is handled by parent component
      console.error('Booking submission error:', error);
    }
  };

  const modalHeader = (
    <>
      <h2 className={styles.modalTitle}>{content.title}</h2>
      <p className={styles.modalSubtitle}>{restaurant.name}</p>
    </>
  );

  const modalBody = (
    <>
      {bookingSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-full p-4 mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Your reservation has been successfully created. You will receive a confirmation email shortly.
          </p>
        </div>
      ) : (
        <>
          {bookingError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{bookingError}</p>
            </div>
          )}
          
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
      onClose={onClose}
      size="small"
      showCloseButton={!bookingLoading}
      closeButtonPosition="header"
      styles={styles}
    >
      {{ header: modalHeader, body: modalBody }}
    </ModalBase>
  );
};

export default ReservationModal;