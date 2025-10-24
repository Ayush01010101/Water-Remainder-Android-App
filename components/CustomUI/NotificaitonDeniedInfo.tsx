import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { Linking } from "react-native";
import { FC } from "react";

const NotificationDeniedInfo: FC = (): ReactNode => {
  return (
    <View className="bg-gray-700 p-2">
      <Text className="text-yellow-400 text-sm font-light">

        Please Allow notification for better Experience{" "}

        <Text
          className="text-green-400 underline font-bold"
          onPress={() => {
            Linking.openSettings()
          }}
        >
          Allow
        </Text>

      </Text>
    </View>
  )
}

export default NotificationDeniedInfo;
