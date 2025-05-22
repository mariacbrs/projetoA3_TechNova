// src/hooks/useAuth.ts
import { createContext, useContext, useState, ReactNode, JSX } from 'react';
import { fakeLogin } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, senha: string) => {
    await fakeLogin(email, senha);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
