import { NavLink, useLocation } from "react-router-dom"
import IconComponent from "@/components/common/IconComponent"
import { ChevronDown, ChevronRight } from "lucide-react"

function MenuItem({ item, styles, onToggle }) {
  const location = useLocation()

  // check if submenu route is active
  const isSubmenuActive =
    item.submenu?.some(sub => location.pathname.startsWith(sub.href))

  return (
    <div>
      {/* MAIN MENU ITEM */}
      <div
        onClick={() => item.hasSubmenu && onToggle(item.id)}
        className={styles.menuItem(isSubmenuActive)}
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

        {item?.hasSubmenu && (
          item.expanded
            ? <ChevronDown className="w-4 h-4" />
            : <ChevronRight className="w-4 h-4" />
        )}
      </div>

      {/* SUBMENU */}
      {/* {item.expanded && item.submenu && (
        <div className={styles.submenuContainer}>
          {item.submenu.map((sub, i) => (
            <NavLink
              key={i}
              to={sub.href}
              className={({ isActive }) =>
                `${styles.submenuItem} ${isActive ? "text-blue-600 font-medium" : ""}`
              }
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      )} */}
    </div>
  )
}

export default MenuItem