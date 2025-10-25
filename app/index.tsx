import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';
import requestNotificationPermission from '@/components/Permissions/NotificationPermission';
import { UserDataProvider } from '@/components/ContextAPI/UserDataContext';
import Homepage from '@/components/Pages/Homepage';
import Navbar from '@/components/CustomUI/Navbar';
export default function Screen() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />


      <Navbar />
      <Homepage />

    </>
  );
}
