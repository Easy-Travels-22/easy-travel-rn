import { View, StyleSheet, Dimensions, Text } from "react-native";

export default function DestinationCard(props) {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A5A40",
    minHeight: 150,
    width: 0.9 * Dimensions.get("window").width,
    borderRadius: 10,
    marginVertical: 0.025 * Dimensions.get("window").height,
  },
});
