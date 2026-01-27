import ProfileHeader from "./ProfileHeader"
import ProfileBody from "./ProfileBody"
import ProfileFooter from "./ProfileFooter"

function ProfileDropdown({
  content,
  isOpen,
  isClose,
  userData,
  onOpenProfile,
  onOpenOrders,
  onOpenBookings,
  onLogout,
  styles
}) {
  if (!isOpen || !userData) return null;

  const actionHandlers = {
    onOpenProfile,
    onOpenOrders,
    onOpenBookings
  };

  return (
    <div className={styles.container}>
      <ProfileHeader userData={userData} styles={styles.header} />
      
      {content?.userActions && (
        <ProfileBody
          title="User Actions"
          items={content.userActions}
          actionHandlers={actionHandlers}
          styles={styles.sections}
        />
      )}

      {content?.quickLinks && (
        <ProfileBody
          title="Quick Links"
          items={content.quickLinks}
          isLink={true}
          isClose={isClose}
          styles={styles.sections}
        />
      )}
      
      <ProfileFooter onLogout={onLogout} styles={styles.footer} />
    </div>
  )
}

export default ProfileDropdown