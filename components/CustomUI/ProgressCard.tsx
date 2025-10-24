import { View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons"; // Icons ke liye

const ProgressCard = () => {
  const totalGlasses = 8;
  const drankGlasses = 6;
  const progressPercentage = (drankGlasses / totalGlasses) * 100;

  const timeSlots = [
    { time: "8 AM", drank: true },
    { time: "10 AM", drank: true },
    { time: "12 PM", drank: true },
    { time: "2 PM", drank: false }, // Yeh abhi tak nahi piya
  ];

  return (
    <View className="bg-gray-800 rounded-xl p-4 m-4 shadow-md">

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white text-xl font-bold">
          Today's Progress
        </Text>
        <Text className="text-gray-300 text-lg font-semibold">
          {drankGlasses} / {totalGlasses} glasses
        </Text>
      </View>

      <View className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <View
          className="bg-blue-600 rounded-full h-2"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      <Text className="text-blue-400 text-sm mb-6">
        {progressPercentage}% Complete
      </Text>

      <View className="flex-row justify-around items-center">
        {timeSlots.map((slot, index) => (
          <View key={index} className="items-center mx-2">
            {slot.drank ? (
              <Ionicons name="water" size={30} color="#2563EB" />
            ) : (
              <Feather name="info" size={30} color="#6B7280" />
            )}

            <Text
              className={`mt-2 font-medium ${slot.drank ? "text-white" : "text-gray-400"}`}
            >
              {slot.time}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
};

export default ProgressCard;
