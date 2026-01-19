import { useState, useEffect } from "react"
import { Sidebar } from "lucide-react"
import { navigationStyle } from "@/utils/styles/AdminStyle"
import MenuItem from "./ui/MenuItem"
import IconComponent from "@/components/common/IconComponent"
import Title from "@/components/common/Title"

function AdminSidebar({ isOpen, toggleSidebar, menuItems }) {
  const styles = navigationStyle
  const [expandedItems, setExpandedItems] = useState({})

  // Initialize expanded state based on active path
  useEffect(() => {
    const initialExpanded = {}
    menuItems.forEach(item => {
      if (item.hasSubmenu && item.submenu) {
        const isActive = item.submenu.some(sub => 
          window.location.pathname.startsWith(sub.href)
        )
        initialExpanded[item.id] = isActive
      }
    })
    setExpandedItems(initialExpanded)
  }, [menuItems])

  const handleMenuToggle = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  // Enhance menuItems with expanded state
  const enhancedMenuItems = menuItems.map(item => ({
    ...item,
    expanded: expandedItems[item.id] || false
  }))

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
        {enhancedMenuItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            styles={styles}
            onToggle={handleMenuToggle}
            toggleSidebar={toggleSidebar}
          />
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar