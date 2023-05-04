import React, { useState } from "react";
import { Dimensions, TouchableOpacity, Text, View, StyleSheet, Modal } from "react-native";
import DestinationCard from "./DestinationCard.js";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import ActivityBottomSheet from "./ActivityBottomSheet.js";
import TripContext from "./TripContext.js";

export default function DraggableCard({ id, orderedSchedule, object }) {
  const MARGIN = 0.05 * Dimensions.get("window").height;
  const CARDS_MARGIN_FROM_SCROLLVIEW =
    (0.05 * Dimensions.get("window").width - 10) / 2;
  const CARD_HEIGHT = 150 + 1.5 * MARGIN;
  const TITLE_SPACE = 50;

  const pressed = useSharedValue(0);
  const startingPosition = orderedSchedule.value[object["name"]] * CARD_HEIGHT;
  const x = useSharedValue(0);
  const y = useSharedValue(startingPosition);
  const [moving, setMoving] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  function objectMove(object, from, to) {
    "worklet";
    const newObject = {}

    for (const id in object) {
      if (object[id] === from) {
        newObject[id] = to;
      } else if (object[id] === to) {
        newObject[id] = from;
      } else {
        newObject[id] = object[id]
      }
    }
    return newObject;
  }

  function getNewPosition(center) {
    "worklet";
    return Math.min(
      Math.max(0, Math.ceil(center / CARD_HEIGHT)),
      Object.keys(orderedSchedule.value).length - 1
    );
  }

  useAnimatedReaction(
    () => orderedSchedule.value[object["name"]],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          y.value = withSpring(currentPosition * CARD_HEIGHT);
        }
      }
    },
    [moving]
  );

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      runOnJS(setMoving)(true);
    },
    onActive: (event, ctx) => {
      pressed.value = withSpring(-3);
      x.value = event.translationX;
      y.value = startingPosition + event.translationY;
      let center = y.value - CARD_HEIGHT/2;

      const newPosition = getNewPosition(center);
      if (newPosition != orderedSchedule.value[object["name"]]) {
        orderedSchedule.value = objectMove(
          orderedSchedule.value,
          orderedSchedule.value[object["name"]],
          newPosition
        );
      }
    },
    onFinish(event, ctx) {
      y.value = withSpring(orderedSchedule.value[object["name"]] * CARD_HEIGHT);
      x.value = withSpring(0);
      pressed.value = withSpring(0);
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { rotate: `${pressed.value}deg` }],
      position: "absolute",
      top: y.value + TITLE_SPACE,
      left: CARDS_MARGIN_FROM_SCROLLVIEW,
      flex: 1,
    };
  });

  function handleAddActivity() {
    setCreateModal(true);
  }

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={eventHandler} activateAfterLongPress={400} >
        <Animated.View style={{maxWidth: 35, maxHeight: 80}}>
          <DestinationCard editable={true} destination={object} />
          <TouchableOpacity onPress={handleAddActivity} ><View style={styles.addButton}><Text style={{color: "#344E41"}}>Add Activity Below</Text></View></TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
      <ActivityBottomSheet open={activityModal} setOpen={setActivityModal} activity={object} editable={true} />
      <ActivityBottomSheet open={createModal} setOpen={setCreateModal} newActivity={true} editable={true} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 0.9 * Dimensions.get("window").width,
    height: 0.03 * Dimensions.get("window").height,
    marginTop: 0.01 * Dimensions.get("window").height,
    backgroundColor: "#DAD7CD",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})
