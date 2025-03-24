import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: true,
  isAuthenticated: false
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Compute isAuthenticated based on user state
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored authentication token on mount
    loadStoredUser();
  }, []);

  useEffect(() => {
    // Handle navigation based on auth state after loading
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [isLoading, isAuthenticated]);

  async function loadStoredUser() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // TODO: Validate token and fetch user data
        setUser(JSON.parse(userToken));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement your sign-in logic here
      // Make API call to authenticate user
      const mockUser = { id: 1, email }; // Replace with actual user data
      await AsyncStorage.setItem('userToken', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // TODO: Implement your sign-up logic here
      // Make API call to create user
      const mockUser = { id: 1, email }; // Replace with actual user data
      await AsyncStorage.setItem('userToken', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 