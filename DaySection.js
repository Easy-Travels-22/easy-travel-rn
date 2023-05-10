import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DestinationCard from "./DestinationCard";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AnimatedButtons from "./AnimatedButtons";
import TripContext from "./TripContext";
import { useContext } from "react";

export default function DaySection({ date, navigation, dateIndex }) {
  const scheduleArr = useContext(TripContext).data.filter(day => day["date"] == date)[0]["schedule"];

  const onPress = () => {
    console.log("press");
  };

  const handleEditPress = () => {
    navigation.push("Edit", { date: date, dateIndex: dateIndex });
  };

  const handleMovePress = () => {
    console.log("move");
  };

  return (
    <TripContext.Consumer>
      {({data, setData}) => (
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{date}</Text>
            <AnimatedButtons>
              <Entypo name="dots-three-horizontal" size={35} color="black" />
              <TouchableOpacity onPress={handleEditPress}>
                <Entypo name="edit" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMovePress}>
                <AntDesign name="export" size={35} color="black" />
              </TouchableOpacity>
              <AntDesign name="close" size={35} color="black" />
            </AnimatedButtons>
          </View>
          {Object.entries(scheduleArr).map(activity => {
            return <DestinationCard destination={activity[1]} />;
          })}
        </View>
      )}
    </TripContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 0.95 * Dimensions.get("window").width,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: "2%",
    paddingVertical: "1%",
  },
  titleText: {
    fontSize: 30,
    color: "black",
  },
  titleRow: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    padding: 5,
    borderRadius: 5,
  },
});
