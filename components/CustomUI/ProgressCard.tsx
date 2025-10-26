import { View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons"; // Icons ke liye
import { useGetUserData } from "../ContextAPI/UserDataContext";
const ProgressCard = () => {
  const userData = useGetUserData();
  const totalGlasses = userData?.Target.Glass ?? 8;
  const drankGlasses = userData?.Target.Completed ?? 0;
  const progressPercentage = totalGlasses > 0 ? (drankGlasses / totalGlasses) * 100 : 0;

  return (
    <View className="bg-[#1B1B1B] rounded-xl p-4 m-4 shadow-md">

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white text-xl font-bold">
          Today's Progress
        </Text>
        <Text className="text-gray-300 text-lg font-semibold">
          {drankGlasses} / {totalGlasses} Glasses
        </Text>
      </View>

      <View className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <View
          className="bg-blue-600 rounded-full h-2"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      <Text className="text-blue-400 text-sm mb-6">
        {Math.floor(progressPercentage)}% Complete
      </Text>

      <View className="flex-row  flex-wrap gap-y-4">

        {Array.from({ length: totalGlasses }, (_, index) => {

          const isDrank = index < drankGlasses;

          return (
            <View key={index} className="items-center mx-2">
              {isDrank ? (
                <Ionicons name="water" size={30} color="#2563EB" />
              ) : (
                <Ionicons name="water-outline" size={30} color="#6B7280" />
              )}

              <Text
                className={`mt-2 font-medium ${isDrank ? "text-white" : "text-gray-400"}`}
              >
                Glass {index + 1}
              </Text>
            </View>
          );
        })}
      </View>

    </View>
  );
};

export default ProgressCard;
