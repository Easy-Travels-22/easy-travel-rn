import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, View, Text } from "react-native";

export default function ActivityTypeSelection({ type, setType }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setSelectedIdx(0)}>
        <View
          style={[styles.button, selectedIdx == 0 && styles.selectedButton, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
        >
          <Text>Accomms</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setSelectedIdx(1)}>
        <View
          style={[styles.button, selectedIdx == 1 && styles.selectedButton]}
        >
          <Text>Destination</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setSelectedIdx(2)}>
        <View
          style={[styles.button, selectedIdx == 2 && styles.selectedButton, {borderTopRightRadius: 5, borderBottomRightRadius: 5}]}
        >
          <Text>Transport</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    backgroundColor: "#DAD7CD",
  },
  selectedButton: {
    backgroundColor: "#A3B18A",
  },
});
