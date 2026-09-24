import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext({
  user: { id: 'user-demo-1', name: 'Anuj Yadav', email: 'anuj@lawvanta.ai', role: 'user' },
  loading: false,
  login: async () => ({ success: false }),
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'user-demo-1',
    name: 'Anuj Yadav',
    email: 'anuj@lawvanta.ai',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiService.getMe();
        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.warn('Using default demo profile:', err.message);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiService.login({ email, password });
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('justiva_token', res.data.token);
      }
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.error?.message || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('justiva_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
