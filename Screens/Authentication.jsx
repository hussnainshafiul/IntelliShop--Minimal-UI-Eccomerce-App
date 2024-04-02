import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from "../config";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Authentication = ({route}) => {
  const rgbaColor = "rgba(94, 159, 163, 0.90)";
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [password, setPassword] = useState();
  const Spacing = 10;
  const [email, setEmail] = useState("");
  

 const { firstName, lastName, Address, Age } = route.params || {};

  const checkAndRegister = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // All fields are filled, proceed with registration
    registerUser(email, password, firstName, lastName, Address, Age);
  };

  //function for registration of user

  registerUser = async (email, password, firstName, lastName, Address, Age) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // Send email verification
    await userCredential.user.sendEmailVerification({
      handleCodeInApp: true,
      url: "https://intellishop-37949.firebaseapp.com",
    });

    // Add user details to Firestore
    await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
      firstName: firstName || "", // Use default value if firstName is undefined
      lastName: lastName || "", // Use default value if lastName is undefined
      email,
      Address: Address || "", // Use default value if Address is undefined
      Age: Age || "", // Use default value if Age is undefined
    });

    alert("Verification email Sent");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled" // Allow tapping outside of the input to dismiss the keyboard
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/newreg.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.txt}>Account Information</Text>
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
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.username}>
          <Ionicons
            name={
              isPasswordFocused || password ? "lock-open-sharp" : "lock-closed"
            }
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new" }}
            placeholder="Enter Password"
            onChangeText={(text) => {
              setPassword(text);
              setIsPasswordFocused(true);
              (password) => setPassword(password);
            }}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true} // To hide the password characters
          />
        </View>

        <View style={styles.username}>
          <Ionicons
            name={
              isPasswordFocused || password ? "lock-open-sharp" : "lock-closed"
            }
            size={20}
            color={rgbaColor}
            style={{ marginRight: 5, paddingTop: 12 }}
          />
          <TextInput
            style={{ fontFamily: "new" }}
            placeholder="Confirm Password"
            onChangeText={(text) => {
              setPassword(text);
              setIsPasswordFocused(true);
            }}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true} // To hide the password characters
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={checkAndRegister}
            style={{
              backgroundColor: "#ba5b73",
              marginVertical: Spacing * 3,
              borderRadius: 20,
              width: 115,
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
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    flexGrow: 1, // Allow the content to grow and be scrollable
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginLeft: 6,
  },
  image: {
    width: 310,
    height: 330,
    marginTop: -15,
  },
  txt: {
    marginTop: -22,
    fontFamily: "new",
    fontSize: 22.5,
    marginBottom: 2,
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
