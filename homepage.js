import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DaySection from "./DaySection";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomePage({navigation}) {
    const DATA = [
        {
          date: "28-05-2023",
          schedule: [
            { type: "destination", name: "Shinjuku" },
            { type: "transport", name: "busbus" },
            { type: "destination", name: "Hotel" },
            { type: "destination", name: "Spa" },
            { type: "destination", name: "Kyoto" },
    
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
      ];

      return (
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
            {DATA.map((date) => (
              <DaySection date={date.date} scheduleArr={date.schedule} navigation={navigation} />
            ))}
        </ScrollView>
      )
    }


const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "#A3B18A"
    },
  });