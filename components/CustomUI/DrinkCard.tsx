import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useGetUserData } from "../ContextAPI/UserDataContext";

const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return <Text>Sweet Dreams <Text className="text-white">𝗓ᶻᶻ</Text></Text>;
};

const Drinkcard = () => {
  const greeting = getGreeting();
  const userData = useGetUserData();
  const ContextFunctions = userData?.Functions;
  const targetData = userData?.Target;
  const reminderInterval = userData?.reminderInterval;

  const currentGoal = targetData?.Glass ?? 0;
  const currentCompleted = targetData?.Completed ?? 0;
  const isGoalComplete = currentGoal > 0 && currentCompleted >= currentGoal;

  const handleDrinkNow = () => {
    if (ContextFunctions?.DrinkGlass) {
      ContextFunctions.DrinkGlass(1).catch((error) => console.error("Error drinking glass:", error));
    }
  };

  const handleResetDay = () => {
    if (ContextFunctions?.ResetDay) {
      ContextFunctions.ResetDay().catch(err => console.error("Error resetting day:", err));
    } else {
    }
  };

  const handleSetReminder = () => {
    if (!ContextFunctions?.StartReminder || !ContextFunctions?.StopReminder) {
      return;
    }

    Alert.alert(
      "Set Reminder Interval",
      "Choose how often you want reminders:",
      [
        { text: "Every 15 Min", onPress: () => ContextFunctions.StartReminder(15) },
        { text: "Every 30 Min", onPress: () => ContextFunctions.StartReminder(30) },
        {
          text: "More Options →",
          onPress: () => {
            Alert.alert(
              "More Intervals",
              "Choose longer intervals:",
              [
                { text: "Every 45 Min", onPress: () => ContextFunctions.StartReminder(45) },
                { text: "Every 1 Hour", onPress: () => ContextFunctions.StartReminder(60) },
                { text: "Every 1.5 Hours", onPress: () => ContextFunctions.StartReminder(90) },
                { text: "Every 2 Hours", onPress: () => ContextFunctions.StartReminder(120) },
                { text: "Every 2.5 Hours", onPress: () => ContextFunctions.StartReminder(150) },
                { text: "Stop Reminders", onPress: () => ContextFunctions.StopReminder(), style: "destructive" },
                { text: "Cancel", style: "cancel" },
              ]
            );
          }
        },
        { text: "Stop Reminders", onPress: () => ContextFunctions.StopReminder(), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <View className="bg-blue-600 rounded-2xl p-6 m-4 shadow-lg overflow-hidden">
      <View className="items-center mb-4">
        <Feather name="bell" size={32} color="white" />
      </View>

      <Text className="text-white text-2xl font-bold text-center mb-2">
        {greeting}
      </Text>

      <Text className="text-white text-base text-center mb-1" style={{ fontStyle: "italic" }}>
        "Stay hydrated, stay energized."
      </Text>

      {reminderInterval && reminderInterval > 0 ? (
        <Text className="text-blue-200 text-xs text-center mb-6">
          Reminding every {reminderInterval} min
        </Text>
      ) : (
        <View className="mb-6 h-[18px]" />
      )}

      <View className="flex-row w-full items-center gap-3">
        <TouchableOpacity
          className={`bg-white rounded-lg py-3 flex-row items-center justify-center flex-1 ${isGoalComplete ? "opacity-50" : ""}`}
          disabled={isGoalComplete}
          onPress={handleDrinkNow}
        >
          <Ionicons name="water-outline" size={20} color="#2563eb" />
          <Text className="text-blue-600 font-bold text-base ml-2">
            {isGoalComplete ? "Goal Completed!" : "Drink Now"}
          </Text>
        </TouchableOpacity>

        {isGoalComplete ? (
          <TouchableOpacity
            className="border border-blue-300 rounded-lg p-3"
            onPress={handleResetDay}
          >
            <Feather name="refresh-cw" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="border border-blue-300 rounded-lg p-3"
            onPress={handleSetReminder}
          >
            <Feather name="clock" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Drinkcard;

