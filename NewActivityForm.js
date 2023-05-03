import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { SegmentedButtons } from "react-native-paper";
import ActivityTypeSelection from "./ActivityTypeSelection";

export default function NewActivityForm() {
  const [type, setType] = useState("destination");
  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <ActivityTypeSelection type={type} setType={setType} />
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "#DAD7CD" }}>
              What are we doing?
            </Text>
            <TextInput
              style={{
                height: 40,
                width: "100%",
                backgroundColor: "#DAD7CD",
                fontSize: 30,
                borderRadius: 5,
                paddingHorizontal: 5,
                marginTop: 5,
              }}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "#DAD7CD" }}>Description</Text>
            <TextInput
              multiline={true}
              style={{
                height: 140,
                width: "100%",
                backgroundColor: "#DAD7CD",
                fontSize: 20,
                borderRadius: 5,
                paddingHorizontal: 5,
                marginTop: 5,
              }}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={{width: "100%", height: 0.06 * Dimensions.get("window").height , backgroundColor: "#A3B18A", borderRadius: 5}} ><Text>Let's Go!</Text></TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingVertical: Dimensions.get("window").height * 0.02,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    height: "100%",
  },
});
