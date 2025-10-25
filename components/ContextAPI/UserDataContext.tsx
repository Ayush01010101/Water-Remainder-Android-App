import { FC, useContext, useState } from "react";
import { createContext, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
interface UserDataType {

  Username: string;
  Target: {
    Glass: number | undefined;
    Liter: number | undefined;
  };
  Streak: number
  Functions: {
    LoginHandle: (username: string, target: UserDataType['Target']) => void
  }
}


const UserDataContext = createContext<null | UserDataType>(null)

//provider of createContext
const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {

  const [Username, setUsername] = useState<string>("")
  const [Streak, setStreak] = useState<number>(0)
  const [Target, seTarget] = useState<UserDataType["Target"]>({ Glass: undefined, Liter: undefined })

  const LoginHandle = async (username: string, target: UserDataType['Target']) => {
    if (!username || !target) {
      throw new Error("Please enter usernamd and target")
    }
    const data = {
      name: username,
      Target: target

    }


    setUsername(username)


  }
  return (

    <>
      <UserDataContext.Provider value={{ Username, Streak, Target: Target, Functions: { LoginHandle: LoginHandle } }}>
        {children}
      </UserDataContext.Provider>

    </>
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
