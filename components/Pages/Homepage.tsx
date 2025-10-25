import { ReactNode, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native";
import Drinkcard from "../CustomUI/DrinkCard";
import QuickLog from "../CustomUI/QuickLog";
import ProgressCard from "../CustomUI/ProgressCard";
import NotificationDeniedInfo from "../CustomUI/NotificaitonDeniedInfo";
import { useEffect } from "react";
import requestNotificationPermission from "../Permissions/NotificationPermission";
const Homepage = (): ReactNode => {
  const [NotificationAllow, setNotificationAllow] = useState<boolean>(true)
  const [Loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    requestNotificationPermission().then(async (data) => {
      if (!data) {
        setNotificationAllow(false)
      } else {
        setNotificationAllow(true)
      }
    })


  }, [])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View className="flex-1 w-screen bg-background">
        {!NotificationAllow && <NotificationDeniedInfo />}
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
