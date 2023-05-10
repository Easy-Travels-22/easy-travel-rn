import {
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { useContext, useState } from "react";
import NewActivityForm from "./NewActivityForm";
import { TouchableOpacity } from "react-native-gesture-handler";
import TripContext from "./TripContext";

export default function CreateActivityPage({
  route, navigation
}) {
  const [imageURI, setImageURI] = useState("");
  const [modalActivity, setModalActivity] = useState({});
  const API_ENDPOINT = `https://www.googleapis.com/customsearch/v1?cx=${}&key=${}&searchType=image&fields=items(link)&q=`;
  const {date, dateIndex} = route.params;
  const {data, setData} = useContext(TripContext)

  async function fetchImage() {
    const response = await fetch(API_ENDPOINT + modalActivity.name);
    const data = await response.json();
    const imageUris = data.items.map((item) => item.link);
    const randomIndex = Math.floor(Math.random() * imageUris.length);
    const selectedImageUri = imageUris[randomIndex];
    setImageURI(selectedImageUri);
  }

  function handleSubmit() {
    const length = data[dateIndex]["schedule"].length;
    const newData = data;

    newData[dateIndex]["schedule"].push({description: modalActivity.description, name: modalActivity.name, order: length, image: imageURI})
    navigation.push("Edit", {date: date, dateIndex: dateIndex})
    setData(newData);
  }

  return (
    <TripContext.Consumer>
      {({ data, setData }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={fetchImage}
                style={{ width: "100%", height: "100%" }}
              >
                {imageURI ? (
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: imageURI }}
                  />
                ) : (
                  <View style={styles.noImageContainer}>
                    <Text
                      style={{
                        fontSize: 30,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Press to generate image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <NewActivityForm
                handleSubmit={handleSubmit}
                setActivity={setModalActivity}
                activity={modalActivity}
              />
            </View>
            <View style={styles.buttonsContainer}></View>
          </KeyboardAvoidingView>
      )}
    </TripContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#344E41",
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#A3B18A",
    borderWidth: 10,
    borderColor: "#344E41",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 2,
    width: "100%",
  },
  descriptionContainer: {
    height: 0.5 * Dimensions.get("window").height,
    width: "100%",
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
  },
});
