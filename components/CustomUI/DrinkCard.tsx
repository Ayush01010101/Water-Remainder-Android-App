import { View, Text, TouchableOpacity } from "react-native";
import VibrateTouchEffect from "../HardwareAccessibility/VibrateTouchEffect";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening";
  } else {
    return <>Sweet Dreams <Text className=" text-white">𝗓ᶻᶻ</Text> </>;
  }
};

const Drinkcard = () => {
  const greeting = getGreeting()

  return (
    <View className="bg-blue-600 rounded-2xl p-8 m-4 shadow-lg">

      <View className="items-center mb-4">
        <Feather name="bell" size={32} color="white" />
      </View>

      <Text className="text-white   text-2xl font-bold text-center mb-2">
        {greeting}
      </Text>

      <Text className="text-white text-base text-center mb-8">
        It's been 2 hours since your last glass of water
      </Text>

      <View className="flex-row  w-full gap-3  space-x-4">

        <TouchableOpacity className="bg-white rounded-lg py-3 flex-row items-center justify-center flex-1">
          <Ionicons name="water-outline" size={20} color="#2563eb" />
          <Text className="text-blue-600 font-bold text-base ml-2" onPress={() => {
            VibrateTouchEffect()
            console.log('something happne')
          }}>
            Drink Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-blue-400 rounded-lg p-3">
          <Feather name="clock" size={24} color="white" />
        </TouchableOpacity>

      </View>
    </View >
  );
};

export default Drinkcard;
