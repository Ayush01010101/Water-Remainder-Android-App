import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const QuickLog = () => {

  // Quick log data
  const logOptions = [
    { icon: "glass-whiskey", size: 28, text: "250ml", iconPack: "FontAwesome5" },
    { icon: "coffee", size: 28, text: "500ml", iconPack: "Feather" },
    { icon: "bottle-water", size: 28, text: "750ml", iconPack: "FontAwesome5" },
  ];


  return (
    <View className="m-4">

      <Text className="text-white text-xl font-bold mb-4">
        Quick Log
      </Text>

      <View className="flex-row justify-between gap-3 items-center space-x-3">

        {logOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="bg-[#1E1E1E] rounded-xl p-4 items-center flex-1"
            style={{ minHeight: 120 }}
          >


            <Text className="text-gray-300 text-base font-semibold">
              {option.text}
            </Text>


            <View className="pt-5">

            </View>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
};

export default QuickLog;
