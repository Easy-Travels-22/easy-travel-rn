import DraggableCard from "./DraggableCard";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function DayScheduleEditor({ date, scheduleArr }) {
  const listToObject = (array) => {
    returnObj = {};

    for (let i = 0; i < array.length; i++) {
      returnObj[array[i]["name"]] = i;
    }
    return returnObj;
  };

  const orderedSchedule = useSharedValue(listToObject(scheduleArr));

  return (
    <Animated.View style={styles.container}>
      <Text style={styles.titleText}>{date}</Text>
      {scheduleArr.map((activity) => {
        return (
          <DraggableCard
            object={activity}
            id={orderedSchedule.value[activity["name"]]}
            orderedSchedule={orderedSchedule}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    marginVertical: 15,
    position: "relative",
    width: "95%",
    minHeight: 500,
  },
  titleText: {
    fontSize: 30,
    color: "#DAD7CD",
  },
});
