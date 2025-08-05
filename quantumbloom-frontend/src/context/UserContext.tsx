'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: number;
  email: string;
  role: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type TokenPayload = {
  id: number;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));

        // Opcional: verificar expiración si tu JWT la incluye
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          localStorage.removeItem('token');
          return;
        }

        setUser({
          id: payload.id,
          email: payload.email,
          role: payload.role
        });
      } catch (err) {
        console.error('Token inválido:', err);
        localStorage.removeItem('token');
      }
    };

    loadUserFromToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe usarse dentro de un <UserProvider>');
  }
  return context;
};
