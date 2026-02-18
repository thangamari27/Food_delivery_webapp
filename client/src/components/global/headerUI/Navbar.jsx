import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { useCart } from '@/context/Cartcontext'
import { useLikes } from '@/context/Likescontext'
import { useBooking } from '@/context/admin/Bookingcontext'
import { toast } from 'react-hot-toast'
import NavbarHeader from './navHeader/NavbarHeader'
import MobileDrawer from './mobiledrawerUI/MobileDrawer'
import ProfileModal from './modals/ProfileModal'
import CartPanel from './panel/CartPanel'
import LikedItemsModal from './modals/LikedItemsModal'
import OrdersPanel from './panel/OrderPanel'
import BookingsPanel from './panel/BookingsPanel'

function Navbar({ content, styles, navbarState }) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout: authLogout } = useAuthContext()
  
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

  // Booking Context
  const {
    bookings: userBookings,
    loading: bookingsLoading,
    fetchMyBookings,
    cancelBooking,
    clearBookings
  } = useBooking()

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

  // Local state
  const [localUserData, setLocalUserData] = useState(null)
  const [orders, setOrders] = useState(content.initialOrders)

  /**
   * Load user bookings - Following OrderPanel pattern
   */
  const loadUserBookings = useCallback(async () => {
    if (!user || !user._id) {
      return;
    }
    
    try {
      
      await fetchMyBookings({
        limit: 50,
        status: 'all',
        upcoming: false
      });
    } catch (error) {
      console.error('Failed to load bookings:', error);
      toast.error('Could not load your bookings');
    }
  }, [user, fetchMyBookings]);

  // Fixed: Single useEffect for panel open with proper dependency
  useEffect(() => {
    if (isBookingsOpen) {
      // Small delay to ensure user is available
      const timer = setTimeout(() => {
        if (user && user._id) {
          loadUserBookings();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isBookingsOpen, user, loadUserBookings]);

  /**
   * Single useEffect for panel open - like OrderPanel
   */
  useEffect(() => {
    if (isBookingsOpen && user) {
      loadUserBookings();
    }
  }, [isBookingsOpen, user, loadUserBookings]);

  /**
   * Sync localUserData with auth context
   */
  useEffect(() => {
    if (user) {
      const transformedUserData = {
        name: user.fullname || user.username || 'User',
        email: user.email || '',
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

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      // Clear bookings before logout
      if (clearBookings) {
        clearBookings();
      }
      
      await authLogout();
      toast.success('Logged out successfully');
      
      // Close all modals/panels
      setIsProfileOpen(false);
      setIsMobileOpen(false);
      setIsProfileModalOpen(false);
      setCartOpen(false);
      setIsLikesOpen(false);
      setIsOrdersOpen(false);
      setIsBookingsOpen(false);
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  /**
   * Handle booking refresh
   */
  const handleRefreshBookings = useCallback(async () => {
    if (!user) {
      toast.error('Please log in to view bookings');
      return;
    }
    await loadUserBookings();
  }, [user, loadUserBookings]);

  
  // Other handler functions
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

  // Determine nav links
  const navLinks = isLoggedIn
    ? content.headerNavLinks.loggedIn
    : content.headerNavLinks.loggedOut;

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

      {/* Mobile Drawer */}
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

      {/* Modals & Panels */}
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

          {/* BOOKINGS PANEL */}
          <BookingsPanel
            isOpen={isBookingsOpen}
            onClose={() => setIsBookingsOpen(false)}
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
  );
}

export default Navbar;