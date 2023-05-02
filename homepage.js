import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import DaySection from "./DaySection";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomePage({navigation}) {
    const DATA = [
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
      ];

      return (
        <SafeAreaView style={{backgroundColor: "#A3B18A"}} >
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
            {DATA.map((date) => (
              <DaySection date={date.date} scheduleArr={date.schedule} navigation={navigation} />
            ))}
        </ScrollView>
        </SafeAreaView>
      )
    }


const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "#A3B18A"
    },
  });