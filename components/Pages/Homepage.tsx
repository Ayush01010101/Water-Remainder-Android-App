import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import Drinkcard from "../CustomUI/DrinkCard";
import QuickLog from "../CustomUI/QuickLog";
import ProgressCard from "../CustomUI/ProgressCard";
const Homepage = (): ReactNode => {
  return (
    <View className="flex-1 w-screen bg-background">

      <Drinkcard />
      <ProgressCard />
      <QuickLog />

    </View >
  )
}

export default Homepage
