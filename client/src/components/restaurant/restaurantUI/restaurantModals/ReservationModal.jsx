import ModalBase from "./ModalBase";
import ReservationForm from "./ReservationForm";

const ReservationModal = ({ isOpen, onClose, restaurant, content, styles }) => {
  const handleSubmit = (formData) => {
    console.log('Reservation submitted:', formData);
    alert(`Reservation confirmed for ${restaurant.name}!`);
    onClose();
  };

  const modalHeader = (
    <>
      <h2 className={styles.modalTitle}>{content.title}</h2>
      <p className={styles.modalSubtitle}>{restaurant.name}</p>
    </>
  );

  const modalBody = (
    <ReservationForm
      restaurant={restaurant}
      content={content}
      styles={styles}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      showCloseButton={true}
      closeButtonPosition="header"
      styles={styles}
    >
      {{ header: modalHeader, body: modalBody }}
    </ModalBase>
  );
};

export default ReservationModal;