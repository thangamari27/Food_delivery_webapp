import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await authService.getProfile();
      if (response.data.success) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid/stale auth data
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();
  }, []);

  const login = async (userData, token, rememberMe = false) => {
    try {
      // Store token based on rememberMe choice
      if (rememberMe) {
        localStorage.setItem('accessToken', token);
      } else {
        sessionStorage.setItem('accessToken', token);
      }
      
      // Set axios default header
      authService.setAuthHeader(token);
      
      // Get fresh user data from backend
      const response = await authService.getProfile();
      const freshUser = response.data.data;
      
      setUser(freshUser);
      setIsAuthenticated(true);
      
      // Store user data (without sensitive info)
      const userToStore = {
        id: freshUser.id,
        email: freshUser.email,
        username: freshUser.username,
        role: freshUser.role,
        email_verified: freshUser.email_verified,
        fullname: freshUser.fullname
      };
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userToStore));
      } else {
        sessionStorage.setItem('user', JSON.stringify(userToStore));
      }
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all storage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      
      // Clear axios header
      authService.clearAuthHeader();
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Logged out successfully');
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await authService.getProfile();
      const freshUser = response.data.data;
      
      setUser(freshUser);
      
      // Update storage
      const storage = localStorage.getItem('rememberMe') ? localStorage : sessionStorage;
      const userToStore = {
        id: freshUser.id,
        email: freshUser.email,
        username: freshUser.username,
        role: freshUser.role,
        email_verified: freshUser.email_verified,
        fullname: freshUser.fullname
      };
      storage.setItem('user', JSON.stringify(userToStore));
      
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      updateUser,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);