import { Heart, ShoppingCart, User } from 'lucide-react';
import IconButton from "../IconButton";
import ProfileDropdown from "../profiledropdownUI/ProfileDropdown";

function DesktopActions({
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
  // Calculate badge counts
  const likesCount = likedItems?.length || 0;
  const cartCount = cartItems?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;

  return (
    <div className={styles.navbarHeader.rightSection.authIconContainer}>
      <IconButton
        icon={Heart}
        onClick={() => setIsLikesOpen(true)}
        badge={likesCount}
        ariaLabel="Liked items"
        styles={styles.iconbutton}
      />
      <IconButton
        icon={ShoppingCart}
        onClick={() => setIsCartOpen(true)}
        badge={cartCount}
        ariaLabel="Shopping cart"
        styles={styles.iconbutton}
      />
      <div className={styles.navbarHeader.rightSection.authProfileIconContainer}>
        <IconButton
          icon={User}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          ariaLabel="User profile"
          styles={styles.iconbutton}
        />
        <ProfileDropdown
          content={userData?.profiledropDown}
          isOpen={isProfileOpen}
          userData={userData}
          isClose={() => setIsProfileOpen(false)}
          styles={styles.profileDropdownStyles}
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

export default DesktopActions