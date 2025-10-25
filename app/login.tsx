import { ReactNode } from "react";
import Loginpage from "@/components/Pages/Loginpage";
import { Stack } from "expo-router";
import { View } from "react-native";
const Login = (): ReactNode => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex flex-row h-screen w-screen justify-center  items-center">

        <Loginpage />
      </View>
    </>
  )
}

export default Login
