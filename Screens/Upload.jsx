import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import * as ImagePicker from "expo-image-picker";

const Upload = () => {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Upload Image</Text>
      <View style={styles.imagecontainer}>
        <Image
          source={require("../assets/upload.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", top: -80 }}>
        <TouchableOpacity style={styles.Uploadbtn} onPress={pickImage}>
          <Text style={styles.txt}>Upload Image</Text>
        </TouchableOpacity>
         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </SafeAreaView>
  );
};

export default Upload;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "bold",
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 0,
    color: COLORS.black,
    textAlign: "center",
  },
  imagecontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "83%", // Adjust the width of the image as needed
    height: "83%", // Adjust the height of the image as needed
  },
  Uploadbtn: {
    backgroundColor: "#ba5b73",
    borderRadius: 20,
    width: 200,
    height: 46,
  },
  txt: {
    color: COLORS.white,
    fontSize: 24,
    textAlign: "center",
    paddingTop: 4,
  },
});
