import DraggableCard from "./DraggableCard";
import { StyleSheet, View, Text, ScrollView, Dimensions, SafeAreaView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function DayScheduleEditor({ route, navigation }) {
  const {scheduleArr, date} = route.params
  const MARGIN = 0.02 * Dimensions.get("window").height;
  const TITLE_SPACE = 75
  const SCROLLVIEW_HEIGHT =  scheduleArr.length * (150 + (2 * MARGIN)) + MARGIN + TITLE_SPACE;

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
    <SafeAreaView style={styles.container} >
    <Animated.ScrollView style={{marginLeft: 0.025 * Dimensions.get("window").width, marginBottom: 10}} contentContainerStyle={[styles.scrollContainer, {minHeight: SCROLLVIEW_HEIGHT}]} showsVerticalScrollIndicator={false} >
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
    </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A3B18A",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  scrollContainer: {
    position: "relative",
    width: 0.95 * Dimensions.get("window").width,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 30,
    color: "#3A5A40",
    marginVertical: 10,

  },
});
