import { useState, useEffect } from 'react';

export const useNavbarState = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  return {
    isScrolled,
    setIsScrolled,
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
  };
};

export const useNavbarEffects = (isProfileOpen, setIsScrolled, setIsProfileOpen) => {
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && !e.target.closest('.profile-dropdown-container')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, setIsProfileOpen]);
};