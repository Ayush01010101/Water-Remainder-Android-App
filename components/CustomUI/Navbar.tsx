import { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LucideSettings } from "lucide-react-native";
const Navbar = (): ReactNode => {

  return (
    <View className="h-24 w-full flex-row items-center justify-between bg-[#1e1f1f] rounded-lg px-4 pt-8">

      <Text className="text-xl font-bold text-white">Hydration Reminder 💧</Text>

      <TouchableOpacity className="rounded-lg bg-[#323233] px-4 py-2">
        <Text className="font-semibold text-white "><LucideSettings color={'white'} /></Text>
      </TouchableOpacity>

    </View >
  )
}
export default Navbar
