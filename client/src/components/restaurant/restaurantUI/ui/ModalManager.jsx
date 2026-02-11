import ReservationModal from "../restaurantModals/ReservationModal";
import MenuModal from '../restaurantModals/MenuModal';

function ModalManager({ 
  selectedRestaurant, 
  showReservationModal, 
  showMenuModal, 
  onCloseReservation, 
  onCloseMenu,
  onSubmitBooking,
  bookingSuccess,
  bookingError,
  bookingLoading,
  content,
  styles 
}) {
    
  if (!selectedRestaurant) return null;
  
  return (
    <>
      {/* Reservation Modal */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={onCloseReservation}
        restaurant={selectedRestaurant}
        content={content?.reservationFormContent}
        styles={styles}
        onSubmitBooking={onSubmitBooking}
        bookingSuccess={bookingSuccess}
        bookingError={bookingError}
        bookingLoading={bookingLoading}
      />
      
      {/* Menu Modal */}
      <MenuModal
        isOpen={showMenuModal}
        onClose={onCloseMenu}
        restaurant={selectedRestaurant}
        content={content?.viewMenuContent}
        styles={styles}
      />
    </>
  );
}

export default ModalManager;