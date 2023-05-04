import {
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from "react-native";
import { useState } from "react";
import NewActivityForm from "./NewActivityForm";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ActivityBottomSheet({
  open,
  setOpen,
  editable,
  activity,
  newActivity
}) {
  const [imageURI, setImageURI] = useState("");
  const [modalActivity, setModalActivity] = useState({});
  const API_ENDPOINT = `https://www.googleapis.com/customsearch/v1?cx=${}&key=${}&searchType=image&fields=items(link)&q=`;

  async function fetchImage() {
    const response = await fetch(API_ENDPOINT + modalActivity.name);
    const data = await response.json();
    const imageUris = data.items.map((item) => item.link);
    const randomIndex = Math.floor(Math.random() * imageUris.length);
    const selectedImageUri = imageUris[randomIndex];
    setImageURI(selectedImageUri);
  }

  function handleSubmit() {
      setOpen(false)
  }

  return (
    <Modal
      visible={open}
      animationType={"slide"}
      presentationStyle={"formSheet"}
      onRequestClose={() => setOpen(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={fetchImage}
            style={{ width: "100%", height: "100%" }}
            disabled={!editable}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: imageURI }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <NewActivityForm handleSubmit={handleSubmit} setActivity={setModalActivity} activity={modalActivity} editable={editable} newActivity={newActivity}/>
        </View>
        <View style={styles.buttonsContainer}></View>
      </KeyboardAvoidingView>
    </Modal>
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
  imageContainer: {
    flex: 3,
    width: "100%",
  },
  descriptionContainer: {
    height: 0.5 * Dimensions.get("window").height,
    width: "100%",
  },
  buttonsContainer: {
    flex: 2,
    width: "100%",
  },
});
