import { useState } from "react";
import { sidebarContent } from "@/utils/constant/admin/AdminDashboard"
import { navigationStyle } from "@/utils/styles/AdminStyle"
import MenuItem from "./ui/MenuItem";
import { Sidebar } from "lucide-react";
import IconComponent from "@/components/common/IconComponent";
import Title from '@/components/common/Title'

function AdminSidebar({ isOpen, toggleSidebar }) { 
  const content = sidebarContent;
  const styles = navigationStyle; 
  const [menuItems, setMenuItems] = useState(content.menuItems);

  const handleMenuClick = (id) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === id
          ? {
              ...item,
              expanded: item.hasSubmenu ? !item.expanded : item.expanded,
              active: true
            }
          : { ...item, active: false }
      )
    )
  }
  return (
    <aside className={styles.sidebar(isOpen)}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            {content.logo}
          </div>
          {/* <h1 className={styles.logoText}>{content.logoText}</h1> */}
          <Title title={content.logoText} titleStyle={styles.logoText} />
        </div>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          <IconComponent Icon={Sidebar} className={'w-5 h-5'} />
        </button>
      </div>
      <nav className={styles.sidebarContent}>
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} onClick={handleMenuClick} styles={styles} />
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar