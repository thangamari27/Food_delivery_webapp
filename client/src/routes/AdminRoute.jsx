import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "@/layouts/Admin"
import AdminDashboard from '@/pages/admin/AdminDashboard'

const AdminRoute = (
    <Route
        path="/admin"
        element={
            <ProtectedRoute role="admin">
                <Admin />
            </ProtectedRoute>
        }
    >
        <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
  )

export default AdminRoute