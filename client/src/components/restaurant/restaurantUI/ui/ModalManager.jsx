import ReservationModal from "../restaurantModals/ReservationModal";
import MenuModal from '../restaurantModals/MenuModal'

function ModalManager({ 
  selectedRestaurant, 
  showReservationModal, 
  showMenuModal, 
  onCloseReservation, 
  onCloseMenu,
  content,
  styles 
}) {
    
  if (!selectedRestaurant) return null;
  return (
    <>
      <ReservationModal
        isOpen={showReservationModal}
        onClose={onCloseReservation}
        restaurant={selectedRestaurant}
        content={content?.reservationFormContent}
        styles={styles}
      />
      <MenuModal
        isOpen={showMenuModal}
        onClose={onCloseMenu}
        restaurant={selectedRestaurant}
        content={content?.viewMenuContent}
        styles={styles}
      />
    </>
  )
}

export default ModalManager