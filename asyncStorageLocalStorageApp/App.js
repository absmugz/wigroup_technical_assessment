import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";
import ScreenThree from "./screens/ScreenThree";

const Stack = createStackNavigator();

export default function App() {
  const [userName, setUserName] = useState("");
  const getUser = () => {
    AsyncStorage.getItem("userName").then((value) => setUserName(value));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userName == null ? (
          <>
            <Stack.Screen
              name="One"
              component={ScreenOne}
              options={{ title: "Screen One" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Two"
              component={ScreenTwo}
              options={{ title: "Screen Two" }}
            />
            <Stack.Screen
              name="Three"
              component={ScreenThree}
              options={{ title: "Screen Three" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
