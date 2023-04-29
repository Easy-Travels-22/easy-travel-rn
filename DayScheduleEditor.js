import DraggableCard from "./DraggableCard";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function DayScheduleEditor({ route, navigation }) {
  const {scheduleArr, date} = route.params
  const SCROLLVIEW_HEIGHT =  2000;

  const listToObject = (array) => {
    returnObj = {};

    for (let i = 0; i < array.length; i++) {
      returnObj[array[i]["name"]] = i;
    }
    return returnObj;
  };

  const orderedSchedule = useSharedValue(listToObject(scheduleArr));

  console.log(scheduleArr)

  return (
    <ScrollView contentContainerStyle={[styles.container, {minHeight: SCROLLVIEW_HEIGHT}]} style={{backgroundColor: "#A3B18A"}} >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A3B18A",
    marginVertical: 15,
    position: "relative",
    width: 0.95 * Dimensions.get("window").width,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    flexDirection: "column",
    alignItems: "center"
  },
  titleText: {
    fontSize: 30,
    color: "#DAD7CD",
  },
});
