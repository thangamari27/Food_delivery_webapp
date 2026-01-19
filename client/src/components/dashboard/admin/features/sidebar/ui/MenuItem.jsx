import { NavLink, useLocation } from "react-router-dom"
import IconComponent from "@/components/common/IconComponent"
import { ChevronDown, ChevronRight } from "lucide-react"

function MenuItem({ item, styles, onToggle, toggleSidebar }) {
  const location = useLocation()

  const isSubmenuActive =
    item.submenu?.some(sub => location.pathname.startsWith(sub.href))

  const handleClick = () => {
    // If item has submenu, toggle it
    if (item.hasSubmenu) {
      onToggle(item.id)
    } else if (item.href) {
      // If it's a regular menu item with href, close sidebar (for mobile)
      toggleSidebar()
    }
  }

  return (
    <div>
      <div
        className={styles.menuItem(isSubmenuActive || location.pathname === item.href)}
        onClick={handleClick}
      >
        <div className={styles.menuItemLeft}>
          {item.href && !item.hasSubmenu ? (
            <NavLink 
              to={item.href} 
              className={styles.menuLabel}
              end
            >
              <IconComponent Icon={item.icon} className={styles.menuIcon} />
              {item.label}
              {item.badge && (
                <span className={styles.badge}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ) : (
            <div className={styles.menuLabel}>
              <IconComponent Icon={item.icon} className={styles.menuIcon} />
              {item.label}
              {item.badge && (
                <span className={styles.badge}>
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </div>

        {item.hasSubmenu &&
          (item.expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          ))}
      </div>

      {/* Render submenu if expanded */}
      {item.hasSubmenu && item.expanded && item.submenu && (
        <div className={styles.submenu}>
          {item.submenu.map((subItem) => (
            <NavLink
              key={subItem.href}
              to={subItem.href}
              className={styles.submenuItem(location.pathname === subItem.href)}
              onClick={toggleSidebar}
              end
            >
              {subItem.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuItem