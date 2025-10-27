import { View, Text, TouchableOpacity } from "react-native";
// SVG ke liye alag library lagti hai, main Ionicons use kar raha hoon
import { Ionicons } from "@expo/vector-icons";
import { useGetUserData } from "../ContextAPI/UserDataContext"; // Path check kar lena

const QuickLog = () => {

  // Context se naya function nikala
  const { Functions } = useGetUserData();
  const addGlassToGoal = Functions.UpdateGoal; // <-- NAYA FUNCTION YAHAN HAI

  const logOptions = [
    { text: "+ 1 Glass", amount: 1 },
    { text: "+ 2 Glass", amount: 2 },
    { text: "+ 3 Glass", amount: 3 },
  ];

  const handlePress = (amount: number) => {
    if (addGlassToGoal) {
      console.log(`Adding ${amount} to GOAL...`);
      addGlassToGoal(amount).then(newGoal => {
        console.log(`New GOAL is: ${newGoal} glasses`);
      });
    } else {
      console.log("UpdateGoal function nahi mila");
    }
  };

  return (
    <View className="m-4">
      <Text className="text-white text-xl font-bold mb-4">
        Quick Log
      </Text>
      <View className="flex-row justify-between gap-3 items-center">
        {logOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="bg-[#1E1E1E] rounded-xl p-4 items-center flex-1"
            style={{ minHeight: 120, justifyContent: 'center' }}
            onPress={() => handlePress(option.amount)} // Naya function call kiya
          >
            <Text className="text-gray-300 text-base font-semibold">
              {option.text}
            </Text>

            {/* Tumhara Image/SVG code 'src' use kar raha tha, jo web mein hota hai */}
            {/* Maine 'Ionicons' use kiya hai */}
            <View className="mt-4">
              <Ionicons name="add-circle-outline" size={30} color="#9CA3AF" />
            </View>

          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickLog;
