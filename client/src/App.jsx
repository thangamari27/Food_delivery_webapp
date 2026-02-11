import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RestaurantProvider } from './context/admin/Restaurantcontext'
import { FoodProvider } from './context/admin/Foodcontext'
import { OrderProvider } from './context/admin/Ordercontext'
import { BookingProvider } from './context/admin/Bookingcontext'
import { CartProvider } from './context/Cartcontext'
import { LikesProvider } from './context/Likescontext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RestaurantProvider>
          <FoodProvider>
            <CartProvider>
              <LikesProvider>
                <OrderProvider>
                  <BookingProvider>
                    <AppRoutes />
                  </BookingProvider>
                </OrderProvider>
              </LikesProvider>
            </CartProvider>
          </FoodProvider>
        </RestaurantProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App