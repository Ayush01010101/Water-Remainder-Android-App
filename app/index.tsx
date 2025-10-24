import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import AlertPopup from '@/components/CustomUI/AlertPopup';
import requestNotificationPermission from '@/components/Permissions/NotificationPermission';
import Homepage from '@/components/Pages/Homepage';
export default function Screen() {
  useEffect(() => {
    requestNotificationPermission()
  })
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Homepage />

    </>
  );
}
