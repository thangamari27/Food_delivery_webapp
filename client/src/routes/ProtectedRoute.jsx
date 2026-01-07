import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, role }) {
  const currentUser = {
    login: true,
    role: "admin" 
  }

  // const { user } = useAuth()
  
  if (!currentUser.login) {
    return <Navigate to="/login" />
  }

  // role mismatch
  if (role && currentUser.role !== role) {
    return <Navigate to="/" />
  }


  return children;
}

export default ProtectedRoute