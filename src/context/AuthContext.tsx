
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'admin';
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sign up a new user
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUsers = localStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      if (users.some((u: any) => u.email === email)) {
        setError('Email already exists');
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
        role: 'teacher' as const
      };
      
      // Save to "users" collection
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Automatically log in the new user
      const loggedInUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Initialize empty students array for this user
      localStorage.setItem(`students_${newUser.id}`, JSON.stringify([]));
      
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // In a real app, this would call your backend API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // First check in the saved users
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const loggedInUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role as 'teacher' | 'admin'
          };
          setUser(loggedInUser);
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          navigate('/dashboard');
          return;
        }
      }
      
      // If not found in saved users, check demo accounts
      if (email === 'admin@school.com' && password === 'password') {
        const newUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@school.com',
          role: 'admin' as const
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/dashboard');
      } else if (email === 'teacher@school.com' && password === 'password') {
        const newUser = {
          id: '2',
          name: 'Teacher User',
          email: 'teacher@school.com',
          role: 'teacher' as const
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
