import { View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useGetUserData } from "../ContextAPI/UserDataContext";
import { useRef } from "react";



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
    return (
      <Text>
        Sweet Dreams <Text className="text-white">𝗓ᶻᶻ</Text>
      </Text>
    );
  }
};

const Drinkcard = () => {
  const greeting = getGreeting();
  const ContextFunctions = useGetUserData()?.Functions;
  const isGoalComplete = useGetUserData()?.Target.Completed == useGetUserData()?.Target.Glass

  const handleDrinkNow = () => {
    if (ContextFunctions?.DrinkGlass) {
      ContextFunctions.DrinkGlass(1)
        .catch((error) => {
          console.error("Error drinking glass:", error);
        });
    } else {
      console.error("DrinkGlass function context se nahi mila.");
    }
  };

  return (
    <View className="bg-blue-600 rounded-2xl p-6 m-4 shadow-lg overflow-hidden">

      <View className="items-center mb-4">
        <Feather name="bell" size={32} color="white" />
      </View>

      <Text className="text-white text-2xl font-bold text-center mb-2">
        {greeting}
      </Text>

      <Text
        className="text-white text-base text-center mb-8"
        style={{ fontStyle: "italic" }}
      >
        "Stay hydrated, stay energized."
      </Text>

      <View className="flex-row w-full gap-3 space-x-4">

        {/* YAHAN SE KHAALI LINES HATA DI HAIN */}

        <TouchableOpacity
          className={`bg-white rounded-lg py-3 flex-row items-center justify-center flex-1 ${isGoalComplete && "opacity-50"}`}
          disabled={isGoalComplete}
          onPress={handleDrinkNow}
        >
          <Ionicons name="water-outline" size={20} color="#2563eb" />
          <Text className="text-blue-600 font-bold text-base ml-2">
            {isGoalComplete ? "Completed " : "Drink Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default Drinkcard;
