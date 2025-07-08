import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock user type for frontend-only implementation
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: 'customer' | 'admin';
  emailVerified: boolean;
  createdAt: string;
  preferences: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database for frontend-only implementation
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'demo@veshop.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: '',
    phone: '+1234567890',
    role: 'customer',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true,
    },
  },
  {
    id: '2',
    email: 'admin@veshop.com',
    firstName: 'Admin',
    lastName: 'User',
    avatar: '',
    phone: '+1234567891',
    role: 'admin',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true,
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ve-shop-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('ve-shop-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('ve-shop-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ve-shop-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User not found' };
    }
    
    if (password !== 'password123') {
      setIsLoading(false);
      return { success: false, error: 'Invalid password' };
    }
    
    setUser(foundUser);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock registration logic
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'User already exists' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: 'customer',
      emailVerified: false,
      createdAt: new Date().toISOString(),
      preferences: {
        language: 'en',
        theme: 'light',
        notifications: true,
      },
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { success: false, error: 'User not found' };
    }
    
    return { success: true };
  };

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Update in mock database
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = updatedUser;
    }
    
    return { success: true };
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock password validation
    if (currentPassword !== 'password123') {
      return { success: false, error: 'Current password is incorrect' };
    }
    
    if (newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters' };
    }
    
    return { success: true };
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};