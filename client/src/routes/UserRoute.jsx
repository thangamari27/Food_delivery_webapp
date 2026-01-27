import { Route } from "react-router-dom"
import User from "@/layouts/User"
import ProtectedRoute from "./ProtectedRoute"
import AboutPage from "@/pages/AboutPage"
import MenuPage from "@/pages/MenuPage"
import RestaurantPage from "@/pages/RestaurantPage"
import OfferPage from "@/pages/OfferPage"
import ServicePage from "@/pages/ServicePage"
import ContactPage from "@/pages/ContactPage"
import ChangePasswordPage from "@/pages/ChangePasswordPage" // Add this import

const UserRoute = (
  <Route
    path="/user"
    element={
      <ProtectedRoute role='user'>
        <User />
      </ProtectedRoute>
    } 
  >
    <Route path='' element={<MenuPage />} />
    <Route path='about' element={<AboutPage />} />
    <Route path='restaurant' element={<RestaurantPage />} />
    <Route path='offer' element={<OfferPage />} />
    <Route path='service' element={<ServicePage />} />
    <Route path='contact' element={<ContactPage />} />
    {/* Add Change Password route */}
    <Route path='change-password' element={<ChangePasswordPage />} />
  </Route>
)

export default UserRoute