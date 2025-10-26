import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userData: any | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    userData: null,
  });

  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('UserData');

      if (!userData) {
        router.replace('/login');
        return;
      }

      const parsedData = JSON.parse(userData);

      const isValid =
        parsedData.Target?.Glass !== -1 &&
        parsedData.Target?.Glass !== undefined &&
        (parsedData.name || parsedData.Username);

      if (!isValid) {
        router.replace('/login');
        return;
      }

      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        userData: parsedData,
      });

    } catch (error) {
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return authState;
};
