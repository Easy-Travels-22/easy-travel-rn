import DraggableCard from "./DraggableCard";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import TripContext from "./TripContext";
import { useContext, useEffect, useState } from "react";

export default function DayScheduleEditor({ route, navigation }) {
  const { date, dateIndex } = route.params;
  const {data, setData} = useContext(TripContext)
  const MARGIN = 0.03 * Dimensions.get("window").height;
  const TITLE_SPACE = 50;
  const BUTTON_HEIGHT = 75;

  const listToObject = (array) => {
    returnObj = {};

    for (let i = 0; i < array.length; i++) {
      returnObj[array[i]["name"]] = {
        order: i,
        description: array[i]["description"],
      };
    }
    return returnObj;
  };

  const array = useContext(TripContext).data.filter(
    (day) => day.date == date
  )[0].schedule;
  function handleAddActivity() {
    navigation.push("Create", { date: date, dateIndex: dateIndex });
  }

  function handleSave() {
    const newData = data
    const newActivityArr = Array(newData[dateIndex]["schedule"].length)
    for (let activity in orderedSchedule.value) {
      let currActivity = orderedSchedule.value[activity]
      newActivityArr[currActivity["order"]] = {name: activity, description: currActivity["description"], image: data[dateIndex]["schedule"].filter(act => act["name"] == activity)[0]["image"]}
    }
    newData[dateIndex]["schedule"] = newActivityArr
    setData(newData);
    navigation.push("Home")
  }

  const orderedSchedule = useSharedValue(listToObject(array));
  const viewHeight =
    Object.keys(orderedSchedule.value).length * (150 + 1.5 * MARGIN) +
    TITLE_SPACE +
    BUTTON_HEIGHT;

  return (
    <TripContext.Consumer>
      {({ data, setData }) => (
        <SafeAreaView style={styles.container}>
          <Animated.ScrollView
            style={{
              marginLeft: 0.025 * Dimensions.get("window").width,
              marginBottom: 10,
            }}
            contentContainerStyle={[
              styles.scrollContainer,
              { minHeight: viewHeight },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: TITLE_SPACE }}
            >
              <Text style={styles.titleText}>{date}</Text>
              <TouchableOpacity onPress={handleSave} >
                <View style={styles.saveButton}>
                  <Text>Save Changes</Text>
                </View>
              </TouchableOpacity>
            </View>
            {data
              .filter((day) => day["date"] == date)[0]
              .schedule.map((activity) => {
                return (
                  <DraggableCard
                    activity={activity}
                    activityName={activity["name"]}
                    orderedSchedule={orderedSchedule}
                    date={date}
                  />
                );
              })}
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={handleAddActivity}
            >
              <View style={[styles.addButton, { height: BUTTON_HEIGHT }]}>
                <Text style={{ color: "#344E41" }}>Add Activity Below</Text>
              </View>
            </TouchableOpacity>
          </Animated.ScrollView>
        </SafeAreaView>
      )}
    </TripContext.Consumer>
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
  },
  touchableContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 0.95 * Dimensions.get("window").width - 10,
  },
  addButton: {
    height: 0.03 * Dimensions.get("window").height,
    backgroundColor: "#DAD7CD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
  },
  saveButton: {
    height: 0.05 * Dimensions.get("window").height,
    backgroundColor: "#DAD7CD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5
  }
});
