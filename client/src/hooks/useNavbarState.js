import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

export const useNavbarState = () => {
  const { user, isAuthenticated } = useAuthContext();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  return {
    // Auth state from context
    user,
    isLoggedIn: isAuthenticated,
    
    // UI states
    isScrolled,
    setIsScrolled,
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