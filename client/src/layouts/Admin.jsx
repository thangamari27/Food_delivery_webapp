import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from '@/components/dashboard/admin/features/header/Header'
import AdminSidebar from "@/components/dashboard/admin/features/sidebar/AdminSidebar"
import { sidebarContent } from "../utils/constant/admin/AdminDashboard"
import { useAdminSidebar } from "../hooks/admin/useAdminSidebar"

function Admin() {
  const {
    isOpen,
    menuItems,
    toggleSidebar,
    closeSidebar,
    toggleMenuItem,
  } = useAdminSidebar(sidebarContent.menuItems)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        isOpen={isOpen}
        menuItems={menuItems}
        toggleSidebar={toggleSidebar}
        onMenuToggle={toggleMenuItem}
      />

      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />

        {/* overlay for mobile */}
        {isOpen  && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        <div className="p-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin