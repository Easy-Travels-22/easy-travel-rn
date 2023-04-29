import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

export default function AnimatedButtons({ children }) {
  const width = useSharedValue(30);
  const pressed = useSharedValue(false);
  const childrenLength = children.length;
  const BUTTON_WIDTH = 45;
  const BAR_WIDTH = BUTTON_WIDTH * (childrenLength - 1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: pressed.value ? withTiming(BAR_WIDTH, { duration: 500 }) : withTiming(BUTTON_WIDTH, { duration: 500 }),
      borderRadius: 5,
      backgroundColor: "#DAD7CD",
      overflow: "hidden",
    };
  });

  const innerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: BUTTON_WIDTH * childrenLength,
      padding: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      transform: [{translateX: pressed.value ? withTiming(-BUTTON_WIDTH,  { duration: 500 }) : withTiming(0,  { duration: 500 })}]
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
        pressed.value = !pressed.value;
    }
  });

  return (
    <TapGestureHandler onGestureEvent={eventHandler} cancelsTouchesInView={false} >
        <Animated.View style={animatedStyle} >
        <Animated.View style={innerAnimatedStyle} >{children}</Animated.View>
        </Animated.View>
    </TapGestureHandler>
  );
}
