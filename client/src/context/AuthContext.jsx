import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      authService.setAuthHeader(token);
      const response = await authService.getProfile();
      setUser(response.data.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      authService.clearAuthHeader();
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    try {
      const response = await authService.login(loginData);
      
      // Backend returns: { success, data: { user, accessToken }, message }
      const { accessToken, user: userData } = response.data.data;
      
      // Store token based on rememberMe choice
      if (loginData.rememberMe) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        sessionStorage.setItem('accessToken', accessToken);
      }
      
      authService.setAuthHeader(accessToken);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      authService.clearAuthHeader();
      setUser(null);
    }
  };

  const updateUser = async () => {
    try {
      const response = await authService.getProfile();
      const userData = response.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      // After successful registration, set user and token
      const { accessToken, user: newUser } = response.data.data;
      
      // Set user in context immediately
      authService.setAuthHeader(accessToken);
      setUser(newUser);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const socialLogin = async (provider) => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Social login failed' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    socialLogin,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};