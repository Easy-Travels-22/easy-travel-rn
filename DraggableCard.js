import React, { useState } from "react";
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

export default function DraggableCard({ id, orderedSchedule, object }) {
  const CARD_HEIGHT = 150;

  const pressed = useSharedValue(0);
  const startingPosition = orderedSchedule.value[object["name"]] * CARD_HEIGHT;
  const x = useSharedValue(0);
  const y = useSharedValue(startingPosition);
  const [moving, setMoving] = useState(false);

  function objectMove(object, from, to) {
    "worklet";
    const newObject = Object.assign({}, object);

    for (const id in object) {
      if (object[id] === from) {
        newObject[id] = to;
      }

      if (object[id] === to) {
        newObject[id] = from;
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
      if (event.absoluteX < x.value + 100 && event.absoluteY > y.value - 100) {
        pressed.value = withSpring(-5);
        runOnJS(setMoving)(true);
      }
    },
    onActive: (event, ctx) => {
      if (event.absoluteX < x.value + 100 && event.absoluteY > y.value - 100) {
        x.value = event.translationX;
        y.value = startingPosition + event.translationY;
        let center = y.value - 75;

        const newPosition = getNewPosition(center);
        console.log("newPosition: ", newPosition);
        if (newPosition != orderedSchedule.value[object["name"]]) {
          console.log(orderedSchedule.value);
          orderedSchedule.value = objectMove(
            orderedSchedule.value,
            orderedSchedule.value[object["name"]],
            newPosition
          );
        }
      }
    },
    onFinish(event, ctx) {
      if (event.absoluteX < x.value + 100 && event.absoluteY > y.value - 100) {
        y.value = withSpring(orderedSchedule.value[object["name"]] * CARD_HEIGHT);
        x.value = withSpring(0);
        pressed.value = withSpring(0);
        runOnJS(setMoving)(false);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { rotate: `${pressed.value}deg` }],
      position: "absolute",
      top: y.value,
      minHeight: CARD_HEIGHT,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={animatedStyle}>
        <DestinationCard title={object.name} />
      </Animated.View>
    </PanGestureHandler>
  );
}
