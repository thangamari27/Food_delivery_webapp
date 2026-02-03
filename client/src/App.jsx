import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RestaurantProvider } from './context/admin/Restaurantcontext'
import { FoodProvider } from './context/admin/Foodcontext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <FoodProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </FoodProvider>
      </RestaurantProvider>
    </AuthProvider>
  )
}

export default App