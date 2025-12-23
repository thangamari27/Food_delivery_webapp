import { useState } from 'react'
import NavbarHeader from './navHeader/NavbarHeader'
import DemoToggleButton from './DemoToggleButton'
import MobileDrawer from './mobiledrawerUI/MobileDrawer'
import ProfileModal from './modals/ProfileModal'
import CartPanel from './panel/CartPanel'
import LikedItemsModal from './modals/LikedItemsModal'
import OrdersPanel from './panel/orderPanel'
import BookingsPanel from './panel/BookingsPanel'
import { createNavbarHandlers } from '@/utils/handler/navbarHandlers'

function Navbar({ content, styles, navbarState }) {

  const {
    isScrolled,
    isLoggedIn,
    setIsLoggedIn,

    isMobileOpen,
    setIsMobileOpen,

    isProfileOpen,
    setIsProfileOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,

    isCartOpen,
    setIsCartOpen,
    isLikesOpen,
    setIsLikesOpen,

    isOrdersOpen,
    setIsOrdersOpen,
    isBookingsOpen,
    setIsBookingsOpen,
  } = navbarState

  
  const [userData, setUserData] = useState(content.initialUserData)
  const [cartItems, setCartItems] = useState(content.initialCartItems)
  const [likedItems, setLikedItems] = useState(content.initialLikedItems)
  const [orders, setOrders] = useState(content.initialOrders)
  const [bookings, setBookings] = useState(content.initialBookings)

  
  const handlers = createNavbarHandlers(
    setCartItems,
    setLikedItems,
    setOrders,
    setBookings,
    setIsLikesOpen,
    setIsCartOpen,
    setIsLoggedIn,
    setIsProfileOpen,
    setIsMobileOpen,
    setUserData
  )

  
  const navLinks = isLoggedIn
    ? content.headerNavLinks.loggedIn
    : content.headerNavLinks.loggedOut

  return (
    <>
      <NavbarHeader
        brandConfig={content.headerBrandConfig}
        signInBtn={content.headerNavLinks.ctaButtons}
        isScrolled={isScrolled}
        isProfileOpen={isProfileOpen}
        isLoggedIn={isLoggedIn}
        navLinks={navLinks}
        userData={userData}
        likedItems={likedItems}
        cartItems={cartItems}
        styles={styles}
        setIsMobileOpen={setIsMobileOpen}
        setIsLikesOpen={setIsLikesOpen}
        setIsCartOpen={setIsCartOpen}
        setIsProfileOpen={setIsProfileOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
        setIsOrdersOpen={setIsOrdersOpen}
        setIsBookingsOpen={setIsBookingsOpen}
        handleLogout={handlers.handleLogout}
      />

      {/* Demo toggle – isolated, safe */}
      <DemoToggleButton
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        drawerNavLink={userData.profiledropDown}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
        onLogout={handlers.handleLogout}
        styles={styles.mobileDrawerStyles}
      />

      {/* Modals & Panels */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
        onUpdate={handlers.handleUpdateProfile}
        styles={styles.modal}
      />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handlers.handleUpdateQuantity}
        onRemoveItem={handlers.handleRemoveFromCart}
        onClearCart={handlers.handleClearCart}
        styles={styles.slidePanel}
      />

      <OrdersPanel
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onCancelOrder={handlers.handleCancelOrder}
        styles={styles.slidePanel}
      />

      <BookingsPanel
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handlers.handleCancelBooking}
        styles={styles.slidePanel}
      />

      <LikedItemsModal
        isOpen={isLikesOpen}
        onClose={() => setIsLikesOpen(false)}
        items={likedItems}
        onRemoveLike={handlers.handleRemoveLike}
        onAddToCart={handlers.handleAddToCart}
        styles={styles.modal}
      />
    </>
  )
}

export default Navbar