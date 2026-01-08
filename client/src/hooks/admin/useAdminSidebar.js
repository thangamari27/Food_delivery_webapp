import { useState } from "react"

export function useAdminSidebar(menuItemsData) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuItems, setMenuItems] = useState(menuItemsData)

  const toggleSidebar = () => setIsOpen(prev => !prev)
  const closeSidebar = () => setIsOpen(false)

  const toggleMenuItem = (id) => {
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

  return {
    isOpen,
    menuItems,
    toggleSidebar,
    closeSidebar,
    toggleMenuItem,
  }
}
