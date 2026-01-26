import { Route } from "react-router-dom"
import Landing from "@/layouts/Landing"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import MenuPage from "@/pages/MenuPage"
import RestaurantPage from "@/pages/RestaurantPage"
import OfferPage from "@/pages/OfferPage"
import ServicePage from "@/pages/ServicePage"
import ContactPage from "@/pages/ContactPage"

const LandingRoute = (
  <Route element={<Landing />}>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/menu' element={<MenuPage />} />
      <Route path='/restaurant' element={<RestaurantPage />} />
      <Route path='/offer' element={<OfferPage />} />
      <Route path='/service' element={<ServicePage />} />
      <Route path='/contact' element={<ContactPage />} />
  </Route>
)

export default LandingRoute