import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from '@/components/dashboard/admin/features/header/Header'
import AdminSidebar from '@/components/dashboard/admin/features/sidebar/AdminSidebar'

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />

        {/* overlay for mobile */}
        {isSidebarOpen && (
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