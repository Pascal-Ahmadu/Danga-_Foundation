import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// Create context with undefined initially
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Props for provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Simulate loading user from storage
    const savedUser = null; // Example: JSON.parse(localStorage.getItem("adminUser") || "null")
    if (savedUser) {
      setUser(savedUser);
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === "admin@ngo.org" && password === "admin123") {
      const userData: User = {
        id: "1",
        name: "John Admin",
        email: "admin@ngo.org",
        role: "admin",
        avatar: null,
      };
      setUser(userData);
      // Example: localStorage.setItem("adminUser", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      // Example: localStorage.removeItem("adminUser");
      setIsLoggingOut(false);
    }, 800); // simulate delay
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
