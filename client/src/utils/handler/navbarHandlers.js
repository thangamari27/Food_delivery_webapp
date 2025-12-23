export const createNavbarHandlers = (
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
) => {
  const handleUpdateProfile = (newData) => {
    setUserData(newData);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };

  const handleRemoveLike = (id) => {
    setLikedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      handleUpdateQuantity(item.id, 1);
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
    setIsLikesOpen(false);
    setIsCartOpen(true);
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      setIsMobileOpen(false);
    }
  };

  return {
    handleUpdateProfile,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
    handleRemoveLike,
    handleAddToCart,
    handleCancelOrder,
    handleCancelBooking,
    handleLogout,
  };
};