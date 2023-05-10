import React, { useContext, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import DaySection from "./DaySection";
import { createStackNavigator } from "@react-navigation/stack";
import TripContext from "./TripContext";

const Stack = createStackNavigator();

export default function HomePage({ navigation }) {

  return (
    <TripContext.Consumer>{({data, setData}) => (
      <SafeAreaView style={{ backgroundColor: "#A3B18A" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {data.map((date, i) => (
            <DaySection
              date={date.date}
              dateIndex={i}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </SafeAreaView>)}
    </TripContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#A3B18A",
  },
});
