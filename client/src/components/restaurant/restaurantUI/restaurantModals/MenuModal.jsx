  import ModalBase from "./ModalBase";
  import MenuHeader from "./MenuHeader";
  import RestaurantInfo from "./RestaurantInfo";
  import MenuContent from "./MenuContent";

  const MenuModal = ({ isOpen, onClose, restaurant, content, styles }) => {
    const modalHeader = <MenuHeader restaurant={restaurant} styles={styles} onClose={onClose} />;

    const modalBody = (
      <>
        <RestaurantInfo restaurant={restaurant} styles={styles} />
        <MenuContent restaurant={restaurant} content={content} styles={styles} />
      </>
    );

    return (
      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        size="large"
        showCloseButton={true}
        closeButtonPosition="header"
        styles={styles}
      >
        {{ header: modalHeader, body: modalBody }}
      </ModalBase>
    );
  };

  export default MenuModal;