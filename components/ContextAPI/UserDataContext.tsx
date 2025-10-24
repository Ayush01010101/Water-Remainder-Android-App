import { FC, useContext, useState } from "react";
import { createContext, ReactNode } from "react";
interface UserDataType {
  Username: string;
  Streak: number
}


const UserDataContext = createContext<null | UserDataType>(null)

//provider of createContext
const UserDataProvider: FC<{ children: ReactNode }> = ({ children }): ReactNode => {

  const [Username, setUsername] = useState<string>("")
  const [Streak, setStreak] = useState<number>(0)
  return (
    <>
      <UserDataContext.Provider value={{ Username, Streak }}>
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
