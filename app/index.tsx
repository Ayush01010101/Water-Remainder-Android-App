import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import AlertPopup from '@/components/CustomUI/AlertPopup';
import requestNotificationPermission from './Permissions/NotificationPermission';
export default function Screen() {
  useEffect(() => {
    requestNotificationPermission()
  })
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 items-center justify-center bg-background">

        <Text className="text-2xl font-bold text-foreground">Water Remainder App</Text>
      </View >
    </>
  );
}
