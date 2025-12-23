import { Heart, ShoppingCart, User } from 'lucide-react';
import IconButton from "../IconButton";
import ProfileDropdown from "../profiledropdownUI/ProfileDropdown";

function MobileActions({
  likedItems,
  cartItems,
  isProfileOpen,
  userData,
  handleLogout,
  setIsLikesOpen,
  setIsCartOpen,
  setIsProfileOpen,
  setIsProfileModalOpen,
  setIsOrdersOpen,
  setIsBookingsOpen,
  styles
}) {
  return (
    <div className={styles.navbarHeader.rightSection.authMobileIconContainer}>
        <IconButton
        icon={Heart}
        onClick={() => setIsLikesOpen(true)}
        badge={likedItems.length}
        ariaLabel="Liked items"
        styles={styles.iconbutton}
        />
        <IconButton
        icon={ShoppingCart}
        onClick={() => setIsCartOpen(true)}
        badge={cartItems.length}
        ariaLabel="Shopping cart"
        styles={styles.iconbutton}
        />
        <div className={styles.navbarHeader.rightSection.authMobileProfileIconContainer}>
        <IconButton
            icon={User}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            ariaLabel="User profile"
            styles={styles.iconbutton}
        />
        <ProfileDropdown
            content={userData.profiledropDown}
            isOpen={isProfileOpen}
            userData={userData}
            styles={{
            ...styles.profileDropdownStyles,
            container: `${styles.profileDropdownStyles.container} right-0 md:right-auto`
            }}
            onOpenProfile={() => {
            setIsProfileModalOpen(true);
            setIsProfileOpen(false);
            }}
            onOpenOrders={() => {
            setIsOrdersOpen(true);
            setIsProfileOpen(false);
            }}
            onOpenBookings={() => {
            setIsBookingsOpen(true);
            setIsProfileOpen(false);
            }}
            onLogout={handleLogout}
        />
        </div>
    </div>
  )
}

export default MobileActions