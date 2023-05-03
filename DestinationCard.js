import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";

export default function DestinationCard({ destination, editable }) {
  function determineIcon() {
    switch (destination.type) {
      case "accommodation":
        return <MaterialIcons name="hotel" size={80} color="black" />;
      case "transport":
        return <AntDesign name="car" size={70} color="black" />;
      case "destination":
        return <Entypo name="location" size={70} color="black" />;
    }
  }

  function handleMenuPress() {
    console.log("menu press")
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} >
        {destination.image ? (
          <Image source={destination.image} />
        ) : (
          determineIcon()
        )}
        {!destination.image && <Text>Tap to add image</Text>}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{color: "#DAD7CD", fontSize: 24, marginBottom: 5}} >{destination.name}</Text>
        <Text style={{color: "#DAD7CD"}} >{destination.description}</Text>
      </View>
      {editable && <View style={styles.menuContainer} >
        <TouchableOpacity onPress={handleMenuPress} ><Entypo name="dots-three-horizontal" size={20} color="black" /></TouchableOpacity>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A5A40",
    minHeight: 150,
    width: 0.9 * Dimensions.get("window").width,
    borderRadius: 10,
    marginTop: 0.025 * Dimensions.get("window").height,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 140,
    borderRadius: 10,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAD7CD"
  },
  descriptionContainer: {
    flex: 5,
    height: 140,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  menuContainer: {
    flex: 1,
    height: 140,
    paddingRight: 5
  }
});
