import React, { useState } from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
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
import CreateActivityPage from "./CreateActivityPage.js";

export default function DraggableCard({ orderedSchedule, activity, activityName, date }) {
  const MARGIN = 0.03 * Dimensions.get("window").height;
  const CARDS_MARGIN_FROM_SCROLLVIEW =
    (0.05 * Dimensions.get("window").width - 10) / 2;
  const CARD_HEIGHT = 150 + MARGIN;
  const TITLE_SPACE = 50;

  const pressed = useSharedValue(0);
  const startingPosition = orderedSchedule.value[activityName]["order"] * CARD_HEIGHT;
  const x = useSharedValue(0);
  const y = useSharedValue(startingPosition);
  const [moving, setMoving] = useState(false);

  function activityMove(activity, from, to) {
    "worklet";
    const newactivity = {};
    for (const orderedActivity in orderedSchedule.value) {
      let currOrder = orderedSchedule.value[orderedActivity]["order"]
      if (currOrder === from) {
        newactivity[orderedActivity] = {
          order: to,
          description: orderedSchedule.value[orderedActivity]["description"],
        };
      } else if (currOrder === to) {
        newactivity[orderedActivity] = {
          order: from,
          description: orderedSchedule.value[orderedActivity]["description"],
        };
      } else {
        newactivity[orderedActivity] = orderedSchedule.value[orderedActivity];
      }
    }
    orderedSchedule.value = newactivity;
  }

  function getNewPosition(center) {
    "worklet";
    return Math.min(
      Math.max(0, Math.ceil(center / CARD_HEIGHT)),
      Object.keys(orderedSchedule.value).length - 1
    );
  }

  useAnimatedReaction(
    () => orderedSchedule.value[activityName]["order"],
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
      let center = y.value - CARD_HEIGHT / 2;

      const newPosition = getNewPosition(center);
      if (newPosition != orderedSchedule.value[activityName]["order"]) {
        let newOS = activityMove(
          orderedSchedule.value,
          orderedSchedule.value[activityName]["order"],
          newPosition
        );
      }
    },
    onFinish(event, ctx) {
      y.value = withSpring(
        orderedSchedule.value[activityName]["order"] * CARD_HEIGHT
      );
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

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler
        onGestureEvent={eventHandler}
        activateAfterLongPress={400}
      >
        <Animated.View style={{ maxWidth: 35, maxHeight: 80 }}>
          <DestinationCard editable={true} destination={activity}/>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
