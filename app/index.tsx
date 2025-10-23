import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-2xl font-bold text-foreground">Water Remainder App</Text>
      </View>
    </>
  );
}
