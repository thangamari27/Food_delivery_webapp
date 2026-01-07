import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "@/layouts/Admin"
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage"

const AdminRoute = (
    <Route
        path="/admin"
        element={
            <ProtectedRoute role="admin">
                <Admin />
            </ProtectedRoute>
        }
    >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
    </Route>
  )

export default AdminRoute