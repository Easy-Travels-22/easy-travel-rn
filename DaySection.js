import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DestinationCard from "./DestinationCard";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AnimatedButtons from "./AnimatedButtons";

export default function DaySection({ date, scheduleArr, navigation }) {
  const onPress = () => {
    console.log("press");
  };

  const handleEditPress = () => {
    console.log("edit");
    navigation.push("Edit", {date: date, scheduleArr: scheduleArr});
  };

  const handleMovePress = () => {
    console.log("move");
    
  };

  return (
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
      {scheduleArr.map((activity) => {
        return <DestinationCard destination={activity} />;
      })}
    </View>
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
