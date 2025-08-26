"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthContextType {
  user: { id: string; name: string; email: string; role: string } | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // simulate init
    const timeout = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const login = async (email: string, password: string) => {
    // fake login
    setUser({ id: "1", name: "Admin User", email, role: "admin" });
  };

  const logout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      setIsLoggingOut(false);
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInitialized,
        isLoggingOut,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
