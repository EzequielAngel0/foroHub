import { useState } from 'react';
import api from '../services/api';
import getApiErrorMessage from '../services/getApiErrorMessage';
import { AuthContext } from './auth-context';

const getInitialUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return {
    token,
    nombre: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [loading] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await api.post('/login', { login: username, clave: password });
      const { token, nombre, email } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', nombre || '');
      localStorage.setItem('userEmail', email || '');
      setUser({ token, nombre, email });
      return { success: true };
    } catch (error) {
      const message = getApiErrorMessage(error, 'Error al iniciar sesion');
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};
