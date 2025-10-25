import React, { memo, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LucideSettings, LogOut } from "lucide-react-native";
import { useGetUserData } from "../ContextAPI/UserDataContext";

const Navbar = memo((): React.ReactNode => {
  const userData = useGetUserData();
  const username = userData?.Username;

  const handleLogout = useCallback(() => {
    if (userData?.Functions?.LogoutHandle) {
      userData.Functions.LogoutHandle();
    }
  }, [userData?.Functions?.LogoutHandle]);

  return (
    <View className="h-24 w-full flex-row items-center justify-between bg-[#1e1f1f] rounded-lg px-4 pt-8">
      <TouchableOpacity
        onPress={handleLogout}
        className="rounded-lg bg-red-600 px-4 py-2 flex-row items-center"
      >
        <LogOut color={'white'} size={16} />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-white">Welcome {username}!!</Text>

      <TouchableOpacity className="rounded-lg bg-[#323233] px-4 py-2">
        <LucideSettings color={'white'} />
      </TouchableOpacity>
    </View>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
