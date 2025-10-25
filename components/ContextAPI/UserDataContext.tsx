import { FC, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { createContext, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserDataType {
  Username: string;
  Target: {
    Glass: number | undefined;
  };
  Streak: number;
  isLoading: boolean;
  Functions: {
    LoginHandle: (username: string, target: UserDataType['Target']) => Promise<void>;
    LogoutHandle: () => Promise<void>;
  }
}

const UserDataContext = createContext<null | UserDataType>(null)
const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {

  const Router = useRouter()
  const [Username, setUsername] = useState<string>("")
  const [Streak, setStreak] = useState<number>(0)
  const [Target, setTarget] = useState<UserDataType["Target"]>({ Glass: undefined })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadUserData();
  }, [])

  const loadUserData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("UserData");
      
      if (data) {
        const parsedData = JSON.parse(data);
        setUsername(parsedData.name || parsedData.Username || "");
        setTarget(parsedData.Target || { Glass: undefined });
        setStreak(parsedData.Streak || 0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const LoginHandle = useCallback(async (username: string, target: UserDataType['Target']) => {
    if (!username || !target) {
      throw new Error("Please enter username and target");
    }
    
    const data = {
      name: username,
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
      setTarget({ Glass: undefined });
      setStreak(0);
      Router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, [Router]);
  const contextValue = useMemo(() => ({
    Username, 
    Streak, 
    Target, 
    isLoading, 
    Functions: { 
      LoginHandle, 
      LogoutHandle 
    } 
  }), [Username, Streak, Target, isLoading, LoginHandle, LogoutHandle]);

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
