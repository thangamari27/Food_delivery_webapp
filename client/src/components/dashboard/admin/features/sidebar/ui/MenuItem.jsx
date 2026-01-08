import { NavLink, useLocation } from "react-router-dom"
import IconComponent from "@/components/common/IconComponent"
import { ChevronDown, ChevronRight } from "lucide-react"

function MenuItem({ item, styles, onToggle, toggleSidebar }) {
  const location = useLocation()

  const isSubmenuActive =
    item.submenu?.some(sub => location.pathname.startsWith(sub.href))

  return (
    <div>
      <div
        className={styles.menuItem(isSubmenuActive)}
        onClick={toggleSidebar}
      >
        <div className={styles.menuItemLeft}>
          {item.href ? (
            <NavLink to={item.href} className={styles.menuLabel}>
              <IconComponent Icon={item.icon} className={styles.menuIcon} />
              {item.label}
            </NavLink>
          ) : (
            <span className={styles.menuLabel}>{item.label}</span>
          )}
        </div>

        {/* {item.hasSubmenu &&
          (item.expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          ))} */}
      </div>
    </div>
  )
}

export default MenuItem