import { FC, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { createContext, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserDataType {
  Username: string;
  Target: {
    Glass: number | undefined;
    Completed: number
  };
  Streak: number;
  isLoading: boolean;
  Functions: {
    LoginHandle: (username: string, target: UserDataType['Target']) => Promise<void>;
    LogoutHandle: () => Promise<void>;
    DrinkGlass: () => Promise<undefined | number>
  }

}

const UserDataContext = createContext<null | UserDataType>(null)
const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {

  const Router = useRouter()
  const [Username, setUsername] = useState<string>("")
  const [Streak, setStreak] = useState<number>(0)
  const [Target, setTarget] = useState<UserDataType["Target"]>({ Glass: undefined, Completed: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadUserData();
  }, [])

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
    } finally {
      setIsLoading(false);
    }
  }, []);

  const LoginHandle = useCallback(async (username: string, target: UserDataType['Target']) => {
    if (!username || !target) {
      throw new Error("Please enter username and target");
    }

    const data = {
      Username: username,
      Target: target,
      Streak: 0
    };

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
  }, [Router]);

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
  }, [Router]);



  const DrinkGlass = async (): Promise<number | undefined> => {
    const userdata = await AsyncStorage.getItem('UserData')
    if (userdata) {
      const previousData: any = JSON.parse(userdata);
      await AsyncStorage.setItem('UserData', JSON.stringify({ ...previousData, Target: { Glass: previousData.Target.Glass, Completed: previousData.Target.Completed + 1 } }))
      return previousData.Target.Completed as number + 1
    }
  }

  const contextValue = useMemo(() => ({
    Username,
    Streak,
    Target,
    isLoading,
    Functions: {
      LoginHandle,
      LogoutHandle,
      DrinkGlass

    }
  }), [Username, Streak, Target, isLoading, LoginHandle, DrinkGlass, LogoutHandle]);

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  )

}
//custom hook for getting the value 
const useGetUserData = () => {
  const userdata = useContext<null | UserDataType>(UserDataContext)
  if (userdata == undefined) {
    //handle the error 
    //show pop up to user to enter the name
    return;
  }
  return userdata;

}


export { UserDataProvider, useGetUserData }
