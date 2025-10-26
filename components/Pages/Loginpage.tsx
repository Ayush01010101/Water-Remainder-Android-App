import { ReactNode } from "react";
import { Text, Alert } from "react-native";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { useGetUserData } from "../ContextAPI/UserDataContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const Loginpage = (): ReactNode => {
  const [username, setusername] = useState<string>("");
  const [goal, setGoal] = useState<string | undefined>(undefined);
  const userData = useGetUserData();
  const handleLogin = userData?.Functions.LoginHandle;

  const onConfirmPress = () => {
    if (!username.trim() || !goal) {

      Alert.alert("Missing Info", "Please enter your name and set a goal.");
      return;
    }

    if (handleLogin) {
      if (goal) {
        handleLogin(username, { Glass: parseInt(goal), Completed: 0 });
      }

    } else {
      Alert.alert("Error", "Could not log in. Please try again.");
    }
  };
  return (
    <>
      <View>
        <Card className="mx-5 max-w-sm bg-[#1E1E1E]">
          <CardHeader>
            {!false && <CardDescription className="text-xl">Enter Your Name</CardDescription>}
          </CardHeader>
          <CardContent>
            <View className="w-full justify-center gap-4">
              {!false && <View>
                <Input
                  maxLength={10}
                  value={username}
                  onChangeText={(value) => setusername(value)}
                  className="text-2xl"
                  placeholder="Ex. Aman"
                />
              </View>

              }


              <View className="w-full">
                <Select onValueChange={(value) => {

                  setGoal(value?.value)

                }}>
                  <SelectTrigger className='w-full '>
                    <SelectValue
                      className="text-2xl"
                      placeholder='Set Your Goal'
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E]">
                    <SelectGroup >
                      <SelectLabel>Daily Goal</SelectLabel>


                      <SelectItem
                        label='4 Glasses (1.0L)' // 'label' prop screen readers ke liye achha hai
                        value='4'
                      >
                        <Text className="text-2xl">4 Glasses (1.0L)</Text>
                      </SelectItem>

                      <SelectItem
                        label='6 Glasses (1.5L)'
                        value="6"
                      >
                        <Text className="text-2xl">6 Glasses (1.5L)</Text>
                      </SelectItem>

                      <SelectItem
                        label='8 Glasses (2.0L)'
                        value="8"
                      >
                        <Text className="text-2xl">8 Glasses (2.0L)</Text>
                      </SelectItem>

                      <SelectItem
                        label='10 Glasses (2.5L)'
                        value="10"
                      >
                        <Text className="text-2xl">10 Glasses (2.5L)</Text>
                      </SelectItem>

                      <SelectItem
                        label='12 Glasses (3.0L)'
                        value="12"
                      >
                        <Text className="text-2xl">12 Glasses (3.0L)</Text>
                      </SelectItem>

                    </SelectGroup>
                  </SelectContent>
                </Select>
              </View>

            </View>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onPress={onConfirmPress}>
              <Text className="font-bold">Confirm</Text>
            </Button>
          </CardFooter>
        </Card>
      </View >
    </>
  )
}

export default Loginpage;
