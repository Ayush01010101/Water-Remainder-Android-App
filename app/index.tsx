import { Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '@/components/CustomUI/LoadingScreen';
import Homepage from '@/components/Pages/Homepage';
import Navbar from '@/components/CustomUI/Navbar';

export default function Screen() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading || !isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      <Homepage />
    </>
  );
}
