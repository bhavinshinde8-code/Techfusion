import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('phoenix_user');
    const savedFavs = localStorage.getItem('phoenix_favs');

    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { setUser(null); }
    }
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) { setFavorites([]); }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const data = await api.login(email, password, role);
    if (data.token) localStorage.setItem('phoenix_jwt', data.token);
    setUser(data.user);
    localStorage.setItem('phoenix_user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (name, email, password, role) => {
    const data = await api.register(name, email, password, role);
    if (data.token) localStorage.setItem('phoenix_jwt', data.token);
    setUser(data.user);
    localStorage.setItem('phoenix_user', JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('phoenix_user');
    localStorage.removeItem('phoenix_jwt');
  };

  const quickDemoLogin = async (role = 'user') => {
    const email = role === 'admin' ? 'admin@phoenix-tourism.in' : 'traveler@example.com';
    const pass = 'password123';
    return await login(email, pass, role);
  };

  const toggleFavorite = (placeId) => {
    let updated;
    if (favorites.includes(placeId)) {
      updated = favorites.filter(id => id !== placeId);
    } else {
      updated = [...favorites, placeId];
    }
    setFavorites(updated);
    localStorage.setItem('phoenix_favs', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      favorites,
      loading,
      login,
      register,
      logout,
      quickDemoLogin,
      toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
