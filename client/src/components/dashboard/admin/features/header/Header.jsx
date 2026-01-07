import { Sidebar, Search, UserCircle } from "lucide-react";
import { headerContent } from "@/utils/constant/admin/AdminDashboard";
import { navigationStyle } from "@/utils/styles/AdminStyle";
import IconComponent from '@/components/common/IconComponent'
import Button from '@/components/common/Button'

function Header({ toggleSidebar }) {
  const content = headerContent;
  const styles = navigationStyle;
  return (
    <header className={styles.header}>
    <div className={styles.headerContent}>
      <button onClick={toggleSidebar} className={styles.headerSidebar}>
        <IconComponent Icon={Sidebar} className={styles.headerSidebarIcon} />
      </button>
      
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder={content.searchPlaceholder} className={styles.searchInput} />
          <IconComponent Icon={Search} className={styles.searchIcon} />
        </div>
      </div>

      <nav className={styles.navLinks}>
        {content.navLinks.map((link, index) => (
          <Button 
            key={index} 
            buttonText={link.label}
            buttonStyle={styles.navLink()}
            buttonLink={link.href}
          />
        ))}
      </nav>

      <div className={styles.notificationBar}>
        {content.notifications.map((notification, index) => (
          <div key={index} className={styles.notificationBox(notification.color, notification.isAlert)}>
            <IconComponent Icon={notification.icon} className={styles.notificationIcon(notification.color)} />
            <span className={styles.notificationBadge(notification.color, notification.isAlert)}>{notification.badge}</span>
          </div>
        ))}
      </div>

      <button className={styles.userButton}>
        <span className={styles.userName}>{content.userGreeting}</span>
        <IconComponent Icon={UserCircle} className={styles.userAvatar} />
      </button>
    </div>
  </header>
  )
}

export default Header