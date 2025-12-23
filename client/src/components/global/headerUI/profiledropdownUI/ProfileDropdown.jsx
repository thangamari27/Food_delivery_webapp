import ProfileHeader from "./ProfileHeader"
import ProfileBody from "./ProfileBody"
import ProfileFooter from "./ProfileFooter"

function ProfileDropdown({
  content,
  isOpen,
  userData,
  onOpenProfile,
  onOpenOrders,
  onOpenBookings,
  onLogout,
  styles
}) {
  if (!isOpen) return null;

  const actionHandlers = {
    onOpenProfile,
    onOpenOrders,
    onOpenBookings
  };

  return (
    <div className={styles.container}>
      <ProfileHeader userData={userData} styles={styles.header} />
      
      <ProfileBody
        title="User Actions"
        items={content.userActions}
        actionHandlers={actionHandlers}
        styles={styles.sections}
      />

      <ProfileBody
        title="Quick Links"
        items={content.quickLinks}
        isLink={true}
        styles={styles.sections}
      />
      
      <ProfileFooter content={content} onLogout={onLogout} styles={styles.footer} />
    </div>
  )
}

export default ProfileDropdown