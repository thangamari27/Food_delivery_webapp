import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useLikes } from '@/context/LikesContext'
import { toast } from 'react-hot-toast'
import NavbarHeader from './navHeader/NavbarHeader'
import MobileDrawer from './mobiledrawerUI/MobileDrawer'
import ProfileModal from './modals/ProfileModal'
import CartPanel from './panel/CartPanel'
import LikedItemsModal from './modals/LikedItemsModal'
import OrdersPanel from './panel/orderPanel'
import BookingsPanel from './panel/BookingsPanel'

function Navbar({ content, styles, navbarState }) {
  const navigate = useNavigate()
  const { user, logout: authLogout } = useAuthContext()
  
  // Cart and Likes contexts
  const { 
    items: cartItems, 
    cartCount,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart()
  
  const { 
    items: likedItems, 
    likesCount,
    removeLike,
    toggleLike
  } = useLikes()

  const {
    isScrolled,
    isLoggedIn,
    isMobileOpen,
    setIsMobileOpen,
    isProfileOpen,
    setIsProfileOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isLikesOpen,
    setIsLikesOpen,
    isOrdersOpen,
    setIsOrdersOpen,
    isBookingsOpen,
    setIsBookingsOpen,
  } = navbarState

  // State for user data (synced with auth context)
  const [localUserData, setLocalUserData] = useState(null)
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
  }, [user, content.profiledropDown]);

  // Custom logout handler
  const handleLogout = async () => {
    try {
      await authLogout()
      toast.success('Logged out successfully')
      
      // Close all modals/panels
      setIsProfileOpen(false)
      setIsMobileOpen(false)
      setIsProfileModalOpen(false)
      setCartOpen(false)
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

  // Handler functions
  const handleUpdateProfile = (newData) => {
    setLocalUserData(newData);
  };

  const handleUpdateQuantity = (id, delta) => {
    updateQuantity(id, delta);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleRemoveLike = (id) => {
    removeLike(id);
  };

  const handleAddToCart = (item) => {
    const { addToCart } = useCart();
    const success = addToCart(item, 1, true);
    
    if (success) {
      // Remove from likes after adding to cart
      removeLike(item._id || item.id);
      setIsLikesOpen(false);
      setCartOpen(true);
    }
  };

  const handleCancelOrder = (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: 'cancelled', canCancel: false } : order
        )
      );
    }
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'cancelled', canCancel: false } : booking
        )
      );
    }
  };

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
        setIsCartOpen={setCartOpen}
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
            onUpdate={handleUpdateProfile}
            styles={styles.modal}
          />

          <CartPanel
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            styles={styles.slidePanel}
          />

          <OrdersPanel
            isOpen={isOrdersOpen}
            onClose={() => setIsOrdersOpen(false)}
            orders={orders}
            onCancelOrder={handleCancelOrder}
            styles={styles.slidePanel}
          />

          <BookingsPanel
            isOpen={isBookingsOpen}
            onClose={() => setIsBookingsOpen(false)}
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            styles={styles.slidePanel}
          />

          <LikedItemsModal
            isOpen={isLikesOpen}
            onClose={() => setIsLikesOpen(false)}
            items={likedItems}
            onRemoveLike={handleRemoveLike}
            onAddToCart={handleAddToCart}
            styles={styles.modal}
          />
        </>
      )}
    </>
  )
}

export default Navbar