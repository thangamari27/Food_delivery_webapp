import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Landing Pages
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import OfferPage from './pages/OfferPage'
import ContactPage from './pages/ContactPage'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/offer' element={<OfferPage />} />
          {/* 404 page */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App