import { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import TripContext from "./TripContext";

const Tab = createBottomTabNavigator();

export default function App() {

  const [data, setData] = useState([
    {
      date: "28-05-2023",
      schedule: [
        { type: "destination", name: "Shinjuku", description: "Neon-lit Tokyo playground. Shop, dine, party. Busiest train station in the world. Shinjuku is a must-visit." },
        { type: "transport", name: "Train to Shibuya", description: "Take the train from Shinjuku station for 8 stops and align at Watashiwa Station" },
        { type: "destination", name: "Shibuya", description: "Tokyo's iconic intersection. The world's busiest pedestrian crossing, with neon lights and bustling crowds." },
        { type: "destination", name: "Tokyo Spa Inn", description: "Relax and rejuvenate in the heart of Tokyo. Traditional Japanese baths and massage, with modern amenities. Pure bliss." },
        { type: "accommodation", name: "Hotel Shibuya", description: "Accommodations for 28th to 30th" },

      ],
    },
    {
      date: "29-05-2023",
      schedule: [
        { type: "destination", name: "Shinjuku" },
        { type: "transport", name: "busbus" },
        { type: "destination", name: "Hotel" },
      ],
    },
    {
      date: "30-05-2023",
      schedule: [
        { type: "destination", name: "Shinjuku" },
        { type: "transport", name: "busbus" },
        { type: "destination", name: "Hotel" },
      ],
    },
  ]);

  return (
    <TripContext.Provider value={{data, setData}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TripContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
