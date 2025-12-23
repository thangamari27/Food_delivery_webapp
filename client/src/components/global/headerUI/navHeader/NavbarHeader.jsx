import { Menu } from 'lucide-react';
import Logo from '../Logo'
import NavLinksWrapper from './NavLinksWrapper';
import AuthActions from './AuthActions'

function NavbarHeader({
  brandConfig,
  signInBtn,
  isScrolled,
  isLoggedIn,
  setIsMobileOpen,
  navLinks,
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
  const headerStyles = styles.navbarHeader;

  return (
    <nav
      className={`${headerStyles.nav.container} ${
        isScrolled ? headerStyles.nav.scrolled : headerStyles.nav.transparent
      }`}
    >
      <div className={headerStyles.nav.wrapper}>
        <div className={headerStyles.nav.content}>
          
          {/* Left Section: Mobile Menu + Logo */}
          <div className={headerStyles.leftSection.container}>
            <button
              onClick={() => setIsMobileOpen(true)}
              className={headerStyles.leftSection.menuButton}
              aria-label="Open menu"
            >
              <Menu className={headerStyles.leftSection.menuIcon} />
            </button>
            <Logo isLoggedIn={isLoggedIn} content={brandConfig} styles={styles.brand} />
          </div>

          {/* Center Section: Desktop Navigation */}
          <NavLinksWrapper navLinks={navLinks} styles={styles.navLinks} />

          {/* Right Section: Actions */}
          <AuthActions
            isLoggedIn={isLoggedIn}
            signInBtn={signInBtn}
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
        </div>
      </div>
    </nav>
  )
}

export default NavbarHeader