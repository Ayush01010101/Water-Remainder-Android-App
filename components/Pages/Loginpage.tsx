import { ReactNode } from "react";
import { Text } from "react-native";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const Loginpage = (): ReactNode => {
  return (
    <>
      <View>
        <Card className="mx-5 max-w-sm bg-[#1E1E1E]">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5">
              <CardDescription className="text-xl">Enter Your Name</CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <View className="w-full justify-center gap-4">
              <View>
                <Input className="text-2xl" placeholder="Ex. Aman" />
              </View>

              <View className="w-full">
                <Select >

                  <SelectTrigger className='w-full '>
                    <SelectValue className="text-2xl" placeholder='Set Your Goal' />
                  </SelectTrigger>

                  <SelectContent className="bg-[#1E1E1E]">
                    <SelectGroup >
                      <SelectLabel>Fruits</SelectLabel>

                      <SelectItem label='4 Glasses (1.0L)' value='4'>
                        <Text className="text-2xl">4 Glasses (1.0L)</Text>
                      </SelectItem>

                      <SelectItem label='6 Glasses (1.5L)' value='6'>
                        <Text className="text-2xl">6 Glasses (1.5L)</Text>
                      </SelectItem>

                      <SelectItem label='8 Glasses (2.0L)' value='8'>
                        <Text className="text-2xl">8 Glasses (2.0L)</Text>
                      </SelectItem>

                      <SelectItem label='10 Glasses (2.5L)' value='10'>
                        <Text className="text-2xl">10 Glasses (2.5L)</Text>
                      </SelectItem>

                      <SelectItem label='12 Glasses (3.0L)' value='12'>
                        <Text className="text-2xl">12 Glasses (3.0L)</Text>
                      </SelectItem>

                    </SelectGroup>
                  </SelectContent>
                </Select>
              </View>

            </View>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full">
              <Text className="font-bold">Confirm</Text>
            </Button>
          </CardFooter>
        </Card>
      </View >
    </>
  )
}

export default Loginpage;
