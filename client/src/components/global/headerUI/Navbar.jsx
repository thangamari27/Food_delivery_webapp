import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'
import { User, Package, Calendar, Info, Briefcase, Phone } from 'lucide-react'
import NavbarHeader from './navHeader/NavbarHeader'
import MobileDrawer from './mobiledrawerUI/MobileDrawer'
import ProfileModal from './modals/ProfileModal'
import CartPanel from './panel/CartPanel'
import LikedItemsModal from './modals/LikedItemsModal'
import OrdersPanel from './panel/orderPanel'
import BookingsPanel from './panel/BookingsPanel'
import { createNavbarHandlers } from '@/utils/handler/navbarHandlers'

function Navbar({ content, styles, navbarState }) {
  const navigate = useNavigate()
  const { user, logout: authLogout } = useAuthContext()

  const {
    isScrolled,
    isLoggedIn,
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

  // State for user data (synced with auth context)
  const [localUserData, setLocalUserData] = useState(null)
  const [cartItems, setCartItems] = useState(content.initialCartItems)
  const [likedItems, setLikedItems] = useState(content.initialLikedItems)
  const [orders, setOrders] = useState(content.initialOrders)
  const [bookings, setBookings] = useState(content.initialBookings)

  // Sync localUserData with auth context user
  useEffect(() => {
    if (user) {
      const transformedUserData = {
        name: user.fullname || user.username,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.profile_image || null,
        profiledropDown: content.profiledropDown
      };
      setLocalUserData(transformedUserData);
    } else {
      setLocalUserData(null);
    }
  }, [user]);

  // Custom logout handler
  const handleLogout = async () => {
    try {
      await authLogout()
      toast.success('Logged out successfully')
      
      // Close all modals/panels
      setIsProfileOpen(false)
      setIsMobileOpen(false)
      setIsProfileModalOpen(false)
      setIsCartOpen(false)
      setIsLikesOpen(false)
      setIsOrdersOpen(false)
      setIsBookingsOpen(false)
      
      // Navigate to home
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  const handlers = createNavbarHandlers(
    setCartItems,
    setLikedItems,
    setOrders,
    setBookings,
    setIsLikesOpen,
    setIsCartOpen,
    null,
    setIsProfileOpen,
    setIsMobileOpen,
    setLocalUserData
  )

  // Determine nav links based on login status
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
        userData={localUserData}
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
        handleLogout={handleLogout}
      />

      {/* Mobile Drawer - Show different versions based on auth */}
      {isLoggedIn && localUserData ? (
        <MobileDrawer
          drawerNavLink={localUserData.profiledropDown}
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          navLinks={navLinks}
          isLoggedIn={isLoggedIn}
          userData={localUserData}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenOrders={() => setIsOrdersOpen(true)}
          onOpenBookings={() => setIsBookingsOpen(true)}
          onLogout={handleLogout}
          styles={styles.mobileDrawerStyles}
        />
      ) : (
        <MobileDrawer
          drawerNavLink={{ quickLinks: [] }}
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          navLinks={navLinks}
          isLoggedIn={false}
          userData={null}
          onOpenProfile={() => {}}
          onOpenOrders={() => {}}
          onOpenBookings={() => {}}
          onLogout={() => {}}
          styles={styles.mobileDrawerStyles}
        />
      )}

      {/* Modals & Panels - Only show when logged in */}
      {isLoggedIn && localUserData && (
        <>
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            userData={localUserData}
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
      )}
    </>
  )
}

export default Navbar