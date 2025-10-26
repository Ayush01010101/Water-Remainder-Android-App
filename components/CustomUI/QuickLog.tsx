import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";

const QuickLog = () => {

  // Quick log data
  const logOptions = [
    { size: 28, text: "+ 1 Glass", },
    { size: 28, text: "+ 2 Glass", },
    { size: 28, text: "+ 3 Glass", },
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

            <View className="mt-4">

              <Image src="/assets/images/water-glass.svg" className="w-10 h-10" />
            </View>

            <View className="pt-5">

            </View>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
};

export default QuickLog;
