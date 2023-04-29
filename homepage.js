import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DaySection from "./DaySection";

export default function HomePage() {
  const DATA = [
    {
      date: "28-05-2023",
      schedule: [
        { type: "destination", name: "Shinjuku" },
        { type: "transport", name: "busbus" },
        { type: "destination", name: "Hotel" },
        { type: "destination", name: "Hotel" },
        { type: "destination", name: "Hotel" },

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
          <DaySection date={date.date} scheduleArr={date.schedule} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#A3B18A"
  },
});
