import DrawerOverlay from './DrawerOverlay';
import DrawerContainer from './DrawerContainer';
import DrawerHeader from './DrawerHeader';
import DrawerUserBody from './DrawerUserBody';
import DrawerNavigation from './DrawerNavigation';
import DrawerUserActions from './DrawerUserActions';
import DrawerQuickLinks from './DrawerQuickLinks';
import DrawerFooter from './DrawerFooter';

function MobileDrawer({
  drawerNavLink,
  isOpen,
  onClose,
  navLinks,
  isLoggedIn,
  userData,
  onOpenProfile,
  onOpenOrders,
  onOpenBookings,
  onLogout,
  styles
}) {
  return (
    <>
    <DrawerOverlay isOpen={isOpen} onClose={onClose} styles={styles} />
    
    <DrawerContainer isOpen={isOpen} styles={styles}>
      <DrawerHeader onClose={onClose} styles={styles.header} />
      
      {isLoggedIn && (
        <DrawerUserBody userData={userData} styles={styles.userSection} />
      )}
      
      <div className={styles.content.container}>
        <DrawerNavigation 
          navLinks={navLinks} 
          onClose={onClose} 
          styles={styles.content}
        />
        
        {isLoggedIn && (
          <>
            <div className={styles.content.divider} />
            <DrawerUserActions
              onOpenProfile={onOpenProfile}
              onOpenOrders={onOpenOrders}
              onOpenBookings={onOpenBookings}
              onClose={onClose}
              styles={styles.content}
            />
            <div className={styles.content.divider} />
            <DrawerQuickLinks content={drawerNavLink.quickLinks} styles={styles.content} />
          </>
        )}
      </div>
      
      {isLoggedIn && (
        <DrawerFooter onLogout={onLogout} styles={styles.footer} />
      )}
    </DrawerContainer>
  </>
  )
}

export default MobileDrawer