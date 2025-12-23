import {
  X,
  User,
  Package,
  Calendar,
  Info,
  Briefcase,
  Phone,
  LogOut,
  MenuSquare,
  Building2Icon,
  TicketPercent 
} from "lucide-react";
import IconComponent from '@/components/common/IconComponent'

const MobileDrawer = ({
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
}) => (
  <>
    {isOpen && (
      <div
        className={styles.overlay}
        onClick={onClose}
      />
    )}

    <div
      className={`${styles.drawer} ${
        isOpen ? styles.drawerOpen : styles.drawerClosed
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className={styles.header.container}>
          <span className={styles.header.title}>Menu</span>
          <button
            onClick={onClose}
            className={styles.header.closeBtn}
          >
            <X className={styles.header.closeIcon} />
          </button>
        </div>

        {/* User Section */}
        {isLoggedIn && (
          <div className={styles.userSection.container}>
            <div className={styles.userSection.innerContainer}>
              <div className={styles.userSection.avatar}>
                {userData.avatar ||
                  userData.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userSection.userInfo}>
                <p className={styles.userSection.name}>
                  {userData.name}
                </p>
                <p className={styles.userSection.email}>
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={styles.content.container}>
          {/* Navigation */}
          <div className={styles.content.section}>
            <h3 className={styles.content.title}>
              Navigation
            </h3>

            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.path}
                onClick={onClose}
                className={styles.content.navLink}
              >
                <IconComponent Icon={link.icon} className={'w-4 h-4 inline-block mr-2'} />
                <span>
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {isLoggedIn && (
            <>
              <div className={styles.content.divider} />

              {/* User Actions */}
              <div className={styles.content.section}>
                <h3 className={styles.content.title}>
                  User Actions
                </h3>

                <button
                  onClick={() => {
                    onOpenProfile();
                    onClose();
                  }}
                  className={styles.content.actionButton}
                >
                  <User
                    className={styles.content.actionIcon}
                  />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    onOpenOrders();
                    onClose();
                  }}
                  className={styles.content.actionButton}
                >
                  <Package
                    className={styles.content.actionIcon}
                  />
                  My Orders
                </button>

                <button
                  onClick={() => {
                    onOpenBookings();
                    onClose();
                  }}
                  className={styles.content.actionButton}
                >
                  <Calendar
                    className={styles.content.actionIcon}
                  />
                  Restaurant Bookings
                </button>
              </div>

              <div className={styles.content.divider} />

              {/* Quick Links */}
              <div className={styles.content.section}>
                <h3 className={styles.content.title}>
                  Quick Links
                </h3>

                <a
                  href="/about"
                  className={styles.content.actionButton}
                >
                  <Info
                    className={styles.content.actionIcon}
                  />
                  About Us
                </a>

                <a
                  href="/services"
                  className={styles.content.actionButton}
                >
                  <Briefcase
                    className={styles.content.actionIcon}
                  />
                  Services
                </a>

                <a
                  href="/contact"
                  className={styles.content.actionButton}
                >
                  <Phone
                    className={styles.content.actionIcon}
                  />
                  Contact Us
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {isLoggedIn && (
          <div className={styles.footer.container}>
            <button
              onClick={onLogout}
              className={styles.footer.logoutBtn}
            >
              <LogOut className={styles.footer.logoutIcon} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </>
);

export default MobileDrawer;
