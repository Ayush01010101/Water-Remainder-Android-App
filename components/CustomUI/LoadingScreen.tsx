import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

const LoadingScreen = memo(() => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <View className="items-center">
        <View className="bg-blue-600 rounded-full p-6 mb-6">
          <Feather name="droplet" size={48} color="white" />
        </View>
        
        <ActivityIndicator size="large" color="#2563eb" className="mb-4" />
        
        <Text className="text-foreground text-lg font-semibold mb-2">
          Loading...
        </Text>
        
        <Text className="text-muted-foreground text-center px-8">
          Setting up your water tracking experience
        </Text>
      </View>
    </View>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
