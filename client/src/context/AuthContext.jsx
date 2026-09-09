import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync and verify user profile on initial load
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.user) {
            setUser(res.user);
          }
        } catch (err) {
          console.warn('Session expired or invalid, logging out.');
          authService.logout();
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    setUser(res.user);
    return res;
  };

  const toggleBookmark = async (questionData) => {
    const res = await authService.toggleBookmark(questionData);
    if (res.bookmarkedQuestions) {
      setUser((prev) => ({
        ...prev,
        bookmarkedQuestions: res.bookmarkedQuestions,
      }));
    }
    return res;
  };

  const isBookmarked = (questionText) => {
    if (!user || !user.bookmarkedQuestions) return false;
    return user.bookmarkedQuestions.some(
      (b) => b.question.trim().toLowerCase() === questionText?.trim().toLowerCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
