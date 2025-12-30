import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Landing Pages
import LandingRoute from '@/routes/LandingRoute'
import UserRoute from '@/routes/UserRoute'
import AdminRoute from '@/routes/AdminRoute'
import ScrollToTop from '@/components/common/ScrollToTop'
import PageNotFound from '@/pages/PageNotFound'
// Authentication pages (signup, signin, forgot password)
import AuthPage from '@/pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Authentication Page */}
          <Route path='/login' element={<AuthPage />} />
          
          {/* Role based Routes */}
          {LandingRoute}
          {UserRoute}
          {AdminRoute}
          
          {/* 404 page */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App