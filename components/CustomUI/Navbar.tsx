import { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LucideSettings } from "lucide-react-native";
import { Link } from "expo-router";
import { useGetUserData } from "../ContextAPI/UserDataContext";
const Navbar = (): ReactNode => {

  const username = useGetUserData()?.Username
  return (
    <View className="h-24 w-full flex-row items-center justify-between bg-[#1e1f1f] rounded-lg px-4 pt-8">

      <Link href={'/login'}>Login Page</Link>

      <Text className="text-xl font-bold text-white">Welcome {username}!!</Text>

      <TouchableOpacity className="rounded-lg bg-[#323233] px-4 py-2">
        <Text className="font-semibold text-white "><LucideSettings color={'white'} /></Text>
      </TouchableOpacity>

    </View >
  )
}
export default Navbar
