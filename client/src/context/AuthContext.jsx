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

  const quickDemoLogin = (role = 'user') => {
    const demoUser = role === 'admin' 
      ? { id: 'admin-demo', name: 'Aditya Rajput (Admin)', email: 'admin@phoenix-tourism.in', role: 'admin' }
      : { id: 'user-demo', name: 'Pooja Sharma', email: 'pooja@traveler.in', role: 'user' };

    setUser(demoUser);
    localStorage.setItem('phoenix_user', JSON.stringify(demoUser));
    localStorage.setItem('phoenix_jwt', 'demo-token-' + role);
    return demoUser;
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
