import {
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState } from "react";
import NewActivityForm from "./NewActivityForm";

export default function ActivityBottomSheet({
  open,
  setOpen,
  editable,
  activity,
}) {
  return (
    <Modal
      visible={open}
      animationType={"slide"}
      presentationStyle={"formSheet"}
      onRequestClose={() => setOpen(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}
      >
          <View style={styles.imageContainer}></View>
          <View style={styles.descriptionContainer}>
            <NewActivityForm />
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
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
  },
  descriptionContainer: {
    height: 0.5 * Dimensions.get("window").height,
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
  },
  buttonsContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
  },
});
