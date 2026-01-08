import { Sidebar } from "lucide-react"
import { navigationStyle } from "@/utils/styles/AdminStyle"
import MenuItem from "./ui/MenuItem"
import IconComponent from "@/components/common/IconComponent"
import Title from "@/components/common/Title"

function AdminSidebar({ isOpen, toggleSidebar, menuItems, onMenuToggle }) {
  const styles = navigationStyle

  return (
    <aside className={styles.sidebar(isOpen)}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>G</div>
          <Title title="Let's GoYum" titleStyle={styles.logoText} />
        </div>

        <button onClick={toggleSidebar} className={styles.menuButton}>
          <IconComponent Icon={Sidebar} className="w-5 h-5" />
        </button>
      </div>

      <nav className={styles.sidebarContent}>
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            styles={styles}
            onToggle={onMenuToggle}
            toggleSidebar={toggleSidebar}
          />
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar