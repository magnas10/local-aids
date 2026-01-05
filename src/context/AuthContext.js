import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getMe();
          setUser(response.user);
          setIsLoggedIn(true);
        } catch (err) {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      console.log('Attempting to register user:', userData);
      setError(null);
      const response = await authAPI.register(userData);
      console.log('Registration successful:', response);
      
      // Save token and user to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsLoggedIn(true);
      
      return { success: true, user: response.user };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      console.log('Attempting to login user:', credentials.email);
      setError(null);
      const response = await authAPI.login(credentials);
      console.log('Login successful:', response);
      
      // Save token and user to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsLoggedIn(true);
      
      return { success: true, user: response.user };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // Even if API call fails, clear local state
      console.error('Logout API error:', err);
    }
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  // Update user profile in context
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
