import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native";
import Drinkcard from "../CustomUI/DrinkCard";
import QuickLog from "../CustomUI/QuickLog";
import ProgressCard from "../CustomUI/ProgressCard";
const Homepage = (): ReactNode => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View className="flex-1 w-screen bg-background">

        <Drinkcard />
        <ProgressCard />
        <QuickLog />

        <View className="h-screen w-screen">

          <Text className="text-4xl text-white">Hello wold</Text>
        </View>
      </View >
    </ScrollView>

  )
}

export default Homepage
