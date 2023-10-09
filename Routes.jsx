import { enableScreens } from "react-native-screens";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Todos from "./screens/Todos";
import CreateTodo from "./screens/CreateTodo";
import { SafeAreaView, Text, View } from "react-native";

enableScreens();
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Todos"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#161616",
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTintColor: "#fff7e9",
      }}
    >
      <Stack.Screen
        name="Todos"
        component={Todos}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="Create" component={CreateTodo} />
    </Stack.Navigator>
  );
};

export default Routes;
