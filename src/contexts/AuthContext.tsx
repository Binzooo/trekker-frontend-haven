
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'user@test.com', role: 'user' },
  { id: '2', name: 'Admin User', email: 'admin@test.com', role: 'admin' }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would be an API call
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      setAuthState({ user, isLoggedIn: true });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user'
    };
    setAuthState({ user: newUser, isLoggedIn: true });
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
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
