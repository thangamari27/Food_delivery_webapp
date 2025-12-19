import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Landing Pages
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import RestaurantPage from './pages/RestaurantPage'
import OfferPage from './pages/OfferPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/common/ScrollToTop'
import PageNotFound from './pages/PageNotFound'

import AuthPage from './pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <ScrollToTop />
        <Routes>
          {/* Authentication Page */}
          <Route path='/login' element={<AuthPage />} />
          {/* Landing pages */}
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/offer' element={<OfferPage />} />
          <Route path='/service' element={<ServicePage />} />
          <Route path='/restaurant' element={<RestaurantPage />} />
          {/* 404 page */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App