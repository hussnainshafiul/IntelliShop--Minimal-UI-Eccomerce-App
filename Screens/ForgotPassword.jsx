import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { firebase } from "../config";

const ForgotPassword = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  //function for login User

  const rgbaColor = "rgba(94, 159, 163, 0.90)";
  const Spacing = 10;
  //function to implement forget password
  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/forgpass.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.txt}>Forgot Password??</Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "new2",
              fontSize: 15,
              width: 330,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Don't worry ! It happens. Please enter the email to reset your
            password
          </Text>
        </View>

        <View style={styles.username}>
          <MaterialIcons
            name="email"
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new", flex: 1 }}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              forgetPassword();
            }}
            style={{
              backgroundColor: "#ba5b73",
              marginVertical: Spacing * 3,
              borderRadius: 20,
              width: 200,
              height: 46,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "new2",
                fontSize: 24,
                textAlign: "center",
                paddingTop: 4,
              }}
            >
              Reset password
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ForgotPassword;

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
    width: 315, // Adjust the width to your preference
    height: 330, // Adjust the height to your preference
  },
  txt: {
    marginTop: -15,
    fontFamily: "new",
    fontSize: 24,
    marginRight: 0,
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
});
