import SignInButton from '../SignInButton'
import DesktopActions from './DesktopActions';
import MobileActions from './MobileActions';

function AuthActions({
  isLoggedIn,
  signInBtn,
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
    <div className={styles.navbarHeader.container}>
      {!isLoggedIn ? (
        // Show Sign In button when not logged in
        <SignInButton content={signInBtn.primary} styles={styles.signInBtn} />
      ) : (
        // Only show actions when logged in AND userData exists
        userData && (
          <>
            {/* Desktop Actions */}
            <DesktopActions
              likedItems={likedItems}
              cartItems={cartItems}
              isProfileOpen={isProfileOpen}
              userData={userData}
              handleLogout={handleLogout}
              setIsLikesOpen={setIsLikesOpen}
              setIsCartOpen={setIsCartOpen}
              setIsProfileOpen={setIsProfileOpen}
              setIsProfileModalOpen={setIsProfileModalOpen}
              setIsOrdersOpen={setIsOrdersOpen}
              setIsBookingsOpen={setIsBookingsOpen}
              styles={styles}
            />
            
            {/* Mobile Actions */}
            <MobileActions
              likedItems={likedItems}
              cartItems={cartItems}
              isProfileOpen={isProfileOpen}
              userData={userData}
              handleLogout={handleLogout}
              setIsLikesOpen={setIsLikesOpen}
              setIsCartOpen={setIsCartOpen}
              setIsProfileOpen={setIsProfileOpen}
              setIsProfileModalOpen={setIsProfileModalOpen}
              setIsOrdersOpen={setIsOrdersOpen}
              setIsBookingsOpen={setIsBookingsOpen}
              styles={styles}
            />
          </>
        )
      )}
    </div>
  )
}

export default AuthActions