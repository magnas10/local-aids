import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Demo users for testing (in production, this comes from backend)
const DEMO_USERS = {
  'admin@localaid.com': {
    name: 'Admin User',
    email: 'admin@localaid.com',
    role: 'admin',
    permissions: ['all']
  },
  'user@localaid.com': {
    name: 'Regular User',
    email: 'user@localaid.com',
    role: 'user',
    permissions: ['read', 'create_request']
  },
  'volunteer@localaid.com': {
    name: 'Volunteer User',
    email: 'volunteer@localaid.com',
    role: 'volunteer',
    permissions: ['read', 'accept_request', 'create_request']
  }
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('localaid_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('localaid_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('AuthContext login called with:', userData);
    
    // Check if this is a known demo user or assign default role
    const email = userData.email?.toLowerCase();
    let finalUserData;
    
    if (DEMO_USERS[email]) {
      finalUserData = { ...DEMO_USERS[email], ...userData };
    } else {
      // Default user role for new users
      finalUserData = {
        name: userData.name || 'User',
        email: userData.email,
        role: userData.role || 'user',
        permissions: userData.permissions || ['read', 'create_request']
      };
    }
    
    setIsLoggedIn(true);
    setUser(finalUserData);
    localStorage.setItem('localaid_user', JSON.stringify(finalUserData));
    
    console.log('Login state updated with role:', finalUserData.role);
    return finalUserData;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('localaid_user');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin has all permissions
    return user.permissions?.includes(permission) || user.permissions?.includes('all');
  };

  // Check if user has any of the specified roles
  const hasRole = (roles) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin bypasses all role checks
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || null;
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      loading,
      login, 
      logout,
      isAdmin,
      hasPermission,
      hasRole,
      getUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
