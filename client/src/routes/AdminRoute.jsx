import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "@/layouts/Admin"
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage"
import AdminRestaurantPage from "@/pages/admin/AdminRestaurantPage"
import AdminAddFoodPage from "@/pages/admin/AdminAddFoodPage"
import AdminCustomerPage from "@/pages/admin/AdminCustomerPage"
import AdminSubscriptionPage from "@/pages/admin/AdminSubscriptionPage"
import AdminEnquiryPage from "@/pages/admin/AdminEnquiryPage"
import AdminOfferPage from "@/pages/admin/AdminOfferPage"
import AdminBookingPage from "@/pages/admin/AdminBookingPage"

const AdminRoute = (
    <Route
        path="/admin"
        element={
            <ProtectedRoute role="admin">
                <Admin />
            </ProtectedRoute>
        }
    >
        <Route path="" element={<AdminDashboardPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="offers" element={<AdminOfferPage />} />
        <Route path="restaurant/add_restaurant" element={<AdminRestaurantPage />} />
        <Route path="restaurant/bookings" element={<AdminBookingPage />} />
        <Route path="foods" element={<AdminAddFoodPage />} />
        <Route path="users" element={<AdminCustomerPage />} />
        <Route path="subscription" element={<AdminSubscriptionPage />} />
        <Route path="enquiry" element={<AdminEnquiryPage />} />
    </Route>
  )

export default AdminRoute