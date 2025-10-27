import { FC, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { createContext, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export interface UserDataType {
  Username: string;
  Target: {
    Glass: number | undefined;
    Completed: number;
  };
  Streak: number;
  isLoading: boolean;
  Functions: {
    LoginHandle: (username: string, target: UserDataType['Target']) => Promise<void>;
    LogoutHandle: () => Promise<void>;
    DrinkGlass: (amount: number) => Promise<number | undefined>;
    UpdateGoal: (amountToAdd: number) => Promise<number | undefined>;
  };
}

const UserDataContext = createContext<null | UserDataType>(null);

const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const Router = useRouter();
  const [Username, setUsername] = useState<string>("");
  const [Streak, setStreak] = useState<number>(0);
  const [Target, setTarget] = useState<UserDataType["Target"]>({ Glass: undefined, Completed: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("UserData");
      if (data) {
        const parsedData = JSON.parse(data);
        setUsername(parsedData.Username || "");
        setTarget(parsedData.Target || { Glass: undefined, Completed: 0 });
        setStreak(parsedData.Streak || 0);
      }
    } catch (error) {
      console.error("Failed to load user data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const LoginHandle = useCallback(async (username: string, target: UserDataType['Target']) => {
    if (!username || !target) {
      throw new Error("Please enter username and target");
    }
    const data = { Username: username, Target: target, Streak: 0 };
    try {
      await AsyncStorage.setItem("UserData", JSON.stringify(data));
      setUsername(username);
      setTarget(target);
      setStreak(0);
      Router.replace('/');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }, [Router, setUsername, setTarget, setStreak]);

  const LogoutHandle = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("UserData");
      setUsername("");
      setTarget({ Glass: undefined, Completed: 0 });
      setStreak(0);
      Router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, [Router, setUsername, setTarget, setStreak]);

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
      if (newCompleted > currentGoal) {
        finalCompleted = currentGoal;
        Alert.alert("Goal Complete!", "Congratulations, you've reached your daily goal!");
      }

      const newData = {
        ...previousData,
        Target: { ...previousData.Target, Completed: finalCompleted }
      };

      await AsyncStorage.setItem('UserData', JSON.stringify(newData));
      setTarget(newData.Target);
      return finalCompleted;
    }
    return undefined;
  }, [setTarget]);

  const UpdateGoal = useCallback(async (amountToAdd: number): Promise<number | undefined> => {
    const userdata = await AsyncStorage.getItem('UserData');
    if (userdata) {
      const previousData: UserDataType = JSON.parse(userdata);
      const currentGoal = previousData.Target?.Glass || 0;

      if (currentGoal === 15 && amountToAdd > 0) {
        Alert.alert("Limit Reached", "You Can Only Drink 15 Glasses In A Day");
        return 15;
      }

      const potentialNewGoal = currentGoal + amountToAdd;
      let finalNewGoal: number;

      if (potentialNewGoal > 15) {
        finalNewGoal = 15;
        Alert.alert("Limit Reached", "Aap maximum 15 glasses ka goal set kar sakte hain.");
      } else {
        finalNewGoal = potentialNewGoal;
      }

      const newData = {
        ...previousData,
        Target: { ...previousData.Target, Glass: finalNewGoal }
      };

      await AsyncStorage.setItem('UserData', JSON.stringify(newData));
      setTarget(newData.Target);
      return finalNewGoal;
    }
    return undefined;
  }, [setTarget]);

  const contextValue = useMemo(() => ({
    Username,
    Streak,
    Target,
    isLoading,
    Functions: {
      LoginHandle,
      LogoutHandle,
      DrinkGlass,
      UpdateGoal
    }
  }), [Username, Streak, Target, isLoading, LoginHandle, LogoutHandle, DrinkGlass, UpdateGoal]);

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

