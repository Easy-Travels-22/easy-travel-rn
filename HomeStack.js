import React, { useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from "./HomePage";
import DayScheduleEditor from "./DayScheduleEditor";
import CreateActivityPage from "./CreateActivityPage";

const Stack = createStackNavigator();

export default function HomeStack() {
  

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Edit" component={DayScheduleEditor} />
      <Stack.Screen name="Create" component={CreateActivityPage}/>
    </Stack.Navigator>
  );
}

