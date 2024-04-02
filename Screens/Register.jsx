import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { firebase } from "../config";

const Register = ({ navigation }) => {
  const rgbaColor = "rgba(94, 159, 163, 0.90)";
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [password, setPassword] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [Age, setAge] = useState("");

  const checkRegister = () => {
    if (!firstName || !lastName || !Address || !Age) {
      alert("Please fill in all fields.");
      return;
    }

    // All fields are filled, pass user details to Authentication screen
    navigation.navigate("Authentication", {
      email: "", // empty email field, as it will be filled in Authentication screen
      password: "", // empty password field, as it will be filled in Authentication screen
      firstName,
      lastName,
      Address,
      Age,
    });
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/Signup.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.txt}>
            Lets Register Yourself with IntelliShop!!
          </Text>
        </View>

        <View>
          <Text style={styles.txt2}>Enter your Personal Info</Text>
        </View>

        <View style={styles.username}>
          <Ionicons
            name="person"
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new", flex: 1 }}
            placeholder="Enter your First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.username}>
          <Ionicons
            name="person"
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new", flex: 1 }}
            placeholder="Enter your Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.username}>
          <Ionicons
            name="person-add"
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new", flex: 1 }}
            placeholder="Enter your Age"
            onChangeText={(Age) => setAge(Age)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.username}>
          <Ionicons
            name="location-sharp"
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new", flex: 1 }}
            placeholder="Enter your address"
            onChangeText={(Address) => setAddress(Address)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View>
          <TouchableOpacity onPress={checkRegister}>
            <Ionicons
              name="arrow-forward-outline"
              size={30}
              color="#ba5b73"
              style={{ marginLeft: 270, paddingTop: 12 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", flex: 1, marginTop: 0 }}>
          <Text style={{ fontFamily: "new2", fontSize: 17 }}>
            Already a member ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{}}
          >
            <Text
              style={{
                fontFamily: "new",
                color: "#ba5b73",
                fontSize: 17,
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 258,
    height: 258,
    marginTop: -10,
  },
  txt: {
    marginTop: -15,
    fontFamily: "new",
    fontSize: 20,
    width: 280,
    marginBottom: 2,
  },
  txt2: {
    fontFamily: "new2",
    fontSize: 18,
    marginRight: 95,
    marginBottom: 5,
  },
  username: {
    flexDirection: "row",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "#FFF", // White background
    shadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color with opacity
    shadowOffset: {
      width: 0,
      height: 0, // Y-axis shadow offset
    },
    shadowOpacity: 1, // Full opacity
    shadowRadius: 4, // Shadow radius of 20px
    elevation: 4, // Android elevation for shadow
    width: 319,
    height: 48,
  },
  buttonContainer: {
    backgroundColor: "#007bff", // Background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 8, // Border radius for rounded corners
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18, // Text font size
    textAlign: "center", // Center the text horizontally
  },
});
