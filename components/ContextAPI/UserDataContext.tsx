import { FC, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { createContext, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { setupNotifications, startReminderLoop, stopReminderLoop } from "../HardwareAccessibility/PushNotification";

export interface UserDataType {
  Username: string;
  Target: {
    Glass: number | undefined;
    Completed: number;
  };
  Streak: number;
  isLoading: boolean;
  reminderInterval: number | null;
  Functions: {
    LoginHandle: (username: string, target: UserDataType['Target']) => Promise<void>;
    LogoutHandle: () => Promise<void>;
    DrinkGlass: (amount: number) => Promise<number | undefined>;
    UpdateGoal: (amountToAdd: number) => Promise<number | undefined>;
    ResetDay: () => Promise<void>;
    StartReminder: (minutes: number) => Promise<void>;
    StopReminder: () => Promise<void>;
  };
}

const UserDataContext = createContext<null | UserDataType>(null);

const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const Router = useRouter();
  const [Username, setUsername] = useState<string>("");
  const [Streak, setStreak] = useState<number>(0);
  const [Target, setTarget] = useState<UserDataType["Target"]>({ Glass: undefined, Completed: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reminderInterval, setReminderInterval] = useState<number | null>(null);

  useEffect(() => { loadUserData(); }, []);

  const loadUserData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("UserData");
      if (data) {
        const parsedData = JSON.parse(data);
        setUsername(parsedData.Username || "");
        setTarget(parsedData.Target || { Glass: undefined, Completed: 0 });
        setStreak(parsedData.Streak || 0);
        setReminderInterval(parsedData.reminderInterval || null);
      }
    } catch (error) {
      console.error("Failed to load user data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveDataToStorage = useCallback(async (dataToSave: Partial<UserDataType>) => {
    try {
      const existingDataRaw = await AsyncStorage.getItem("UserData");
      const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};
      const newData = { ...existingData, ...dataToSave };
      await AsyncStorage.setItem("UserData", JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save data to storage:', error);
    }
  }, []);

  const LoginHandle = useCallback(async (username: string, target: UserDataType['Target']) => {
    if (!username || !target) throw new Error("Please enter username and target");
    const data = { Username: username, Target: target, Streak: 0, reminderInterval: null };
    try {
      await AsyncStorage.setItem("UserData", JSON.stringify(data));
      setUsername(username);
      setTarget(target);
      setStreak(0);
      setReminderInterval(null);
      Router.replace('/');
    } catch (error) { console.error('Error saving user data:', error); throw error; }
  }, [Router, setUsername, setTarget, setStreak, setReminderInterval, saveDataToStorage]);

  const LogoutHandle = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("UserData");
      setUsername("");
      setTarget({ Glass: undefined, Completed: 0 });
      setStreak(0);
      setReminderInterval(null);
      await stopReminderLoop();
      Router.replace('/login');
    } catch (error) { console.error('Error logging out:', error); }
  }, [Router, setUsername, setTarget, setStreak, setReminderInterval]);

  const DrinkGlass = useCallback(async (amount: number): Promise<number | undefined> => {
    const userdata = await AsyncStorage.getItem('UserData');
    if (userdata) {
      const previousData: UserDataType = JSON.parse(userdata);
      const currentCompleted = previousData.Target?.Completed || 0;
      const currentGoal = previousData.Target?.Glass || 0;

      if (!currentGoal || currentGoal === 0) {
        Alert.alert("Goal Not Set", "Please set your daily goal first.");
        return currentCompleted;
      }

      if (currentCompleted >= currentGoal) {
        Alert.alert("Goal Already Reached", "You have already completed your daily goal!");
        return currentCompleted;
      }

      const newCompleted = currentCompleted + amount;
      let finalCompleted = newCompleted;

      if (newCompleted >= currentGoal) {
        finalCompleted = currentGoal;
        if (currentCompleted < currentGoal) {
          Alert.alert("Goal Complete!", "Congratulations, you've reached your daily goal! Reminders stopped.");
          await stopReminderLoop();
          setReminderInterval(null);
          await saveDataToStorage({ reminderInterval: null });
        }
      }

      const newData = { ...previousData, Target: { ...previousData.Target, Completed: finalCompleted } };
      await saveDataToStorage({ Target: newData.Target });
      setTarget(newData.Target);
      return finalCompleted;
    } return undefined;
  }, [setTarget, saveDataToStorage, setReminderInterval]);

  const UpdateGoal = useCallback(async (amountToAdd: number): Promise<number | undefined> => {
    const userdata = await AsyncStorage.getItem('UserData');
    if (userdata) {
      const previousData: UserDataType = JSON.parse(userdata);
      const currentGoal = previousData.Target?.Glass || 0;
      if (currentGoal === 15 && amountToAdd > 0) { Alert.alert("Limit Reached", "15 glasses is limit"); return 15; }
      const potentialNewGoal = currentGoal + amountToAdd;
      let finalNewGoal = potentialNewGoal > 15 ? 15 : potentialNewGoal;
      if (finalNewGoal === 15 && potentialNewGoal > 15) Alert.alert("Limit Reached", "You can only select 15 glasses ");
      const newData = { ...previousData, Target: { ...previousData.Target, Glass: finalNewGoal } };
      await saveDataToStorage({ Target: newData.Target });
      setTarget(newData.Target);
      return finalNewGoal;
    } return undefined;
  }, [setTarget, saveDataToStorage]);

  const ResetDay = useCallback(async (): Promise<void> => {
    const userdata = await AsyncStorage.getItem('UserData');
    if (userdata) {
      const previousData: UserDataType = JSON.parse(userdata);
      const newTarget = { Glass: 4, Completed: 0 };
      const newData = { ...previousData, Target: newTarget };
      await saveDataToStorage({ Target: newTarget });
      setTarget(newTarget);
      console.log('Day reset complete.');
    } else { console.error("User data not found, cannot reset day."); }
  }, [setTarget, saveDataToStorage]);

  const StartReminder = useCallback(async (minutes: number): Promise<void> => {
    const granted = await setupNotifications();
    if (granted) {
      await startReminderLoop(minutes);
      setReminderInterval(minutes);
      await saveDataToStorage({ reminderInterval: minutes });
    }
  }, [setReminderInterval, saveDataToStorage]);

  const StopReminder = useCallback(async (): Promise<void> => {
    await stopReminderLoop();
    setReminderInterval(null);
    await saveDataToStorage({ reminderInterval: null });
  }, [setReminderInterval, saveDataToStorage]);

  const contextValue = useMemo(() => ({
    Username,
    Streak,
    Target,
    isLoading,
    reminderInterval,
    Functions: {
      LoginHandle,
      LogoutHandle,
      DrinkGlass,
      UpdateGoal,
      ResetDay,
      StartReminder,
      StopReminder,
    }
  }), [Username, Streak, Target, isLoading, reminderInterval, LoginHandle, LogoutHandle, DrinkGlass, UpdateGoal, ResetDay, StartReminder, StopReminder]);

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

const useGetUserData = () => {
  const userdata = useContext<null | UserDataType>(UserDataContext);
  if (userdata === undefined) {
    throw new Error("useGetUserData ko UserDataProvider ke andar use karo");
  }
  return userdata;
};

export { UserDataProvider, useGetUserData };

