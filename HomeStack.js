import React, { useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from "./HomePage";
import DayScheduleEditor from "./DayScheduleEditor";

const Stack = createStackNavigator();

export default function HomeStack() {
  

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Edit" component={DayScheduleEditor} />
    </Stack.Navigator>
  );
}

