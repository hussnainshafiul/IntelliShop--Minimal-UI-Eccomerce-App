import { firebase } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from "react-native-phone-input";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const OrderScreen = ({ route, navigation }) => {
  const { productSummary, total } = route.params; //adding routing params
    const rgbaColor = "rgba(94, 159, 163, 0.90)";


  //defining neccesary useState Hooks

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [useBillingForShipping, setUseBillingForShipping] = useState(true);

  //function to handleShipping Address
  const handleShippingAddressOption = (useBilling) => {
    setUseBillingForShipping(useBilling);
    if (useBilling) {
      setShippingAddress(billingAddress);
    } else {
      setShippingAddress("");
    }
  };

  // adding a useEffect hook for firestore
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setBillingAddress(snapshot.data()?.Address);
        } else {
          console.log("User doesn't exist");
        }
      });
  }, []);

  // function for confirming the order

  const confirmOrder = async () => {
    if (!name || !mobileNumber) {
      alert("Please fill in all fields.");
      return;
    }

    //storing the data on firestore

    try {
      const db = firebase.firestore();

      const orderData = {
        address: useBillingForShipping ? billingAddress : shippingAddress,
        name,
        mobileNumber,
        productSummary,
        paymentMethod,
        total,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection("orders").add(orderData);

      await AsyncStorage.removeItem("cartItems");
      ToastAndroid.show(
        "Your order will be delivered Soon",
        ToastAndroid.SHORT
      );
      navigation.navigate("Home2");
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <GestureHandlerRootView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView >
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Order Summary</Text>
        {productSummary.map((product, index) => {
          const hasRendered = productSummary
            .slice(0, index)
            .some((prevProduct) => prevProduct.id === product.id);
          {
            /*If the product has already rendered dont show it again*/
          }

          if (!hasRendered) {
            return (
              <View key={index} style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={product.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text>Price: ${product.price}</Text>
                  <Text>Quantity: {product.quantity}</Text>
                  <Text>Total Price: ${product.totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            );
          }

          return null;
        })}
        <Text style={styles.totalPriceText}>
          Total Price: ${total.toFixed(2)}
        </Text>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.details}>
            Please fill in the following Details
          </Text>

          <View style={styles.addressContainer}>
            <View style={styles.addressSection}>
              <Text style={styles.addressSectionTitle}>Billing Address</Text>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value={billingAddress}
                  status="checked"
                  onPress={() => setBillingAddress(billingAddress)}
                  color={COLORS.black}
                />
                <Text>{billingAddress}</Text>
              </View>
            </View>

            {/*Setting the Shipping Address */}

            <View style={styles.addressSection}>
              <Text style={styles.addressSectionTitle}>Shipping Address</Text>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="useBilling"
                  status={useBillingForShipping ? "checked" : "unchecked"}
                  onPress={() => handleShippingAddressOption(true)}
                  color={COLORS.black}
                />
                <Text>Same as Billing Address</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="differentAddress"
                  status={useBillingForShipping ? "unchecked" : "checked"}
                  onPress={() => handleShippingAddressOption(false)}
                  color={COLORS.primary}
                />
                <Text>Try a Different Address</Text>
              </View>
              {useBillingForShipping ? (
                <Text style={styles.shippingAddressText}>
                  Shipping Address: Same as Billing Address
                </Text>
              ) : (
                <TextInput
                  placeholder="Enter Shipping Address"
                  value={shippingAddress}
                  onChangeText={(text) => setShippingAddress(text)}
                  style={styles.shippingAddressInput}
                />
              )}
            </View>
          </View>

          <View style={styles.textcontainer}>
            <MaterialIcons
              name="person-add"
              size={20}
              color={rgbaColor}
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.TextInput}
            />
          </View>

          <View style={styles.textcontainer}>
            <MaterialIcons
              name="local-phone"
              size={20}
              color={rgbaColor}
              style={{ marginRight: 5 }}
            />
            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              textStyle={{ fontSize: 16 }}
              style={{
                borderBottomWidth: 0,
                borderColor: "#ccc",
                paddingVertical: 10,
              }}
              initialCountry="pk"
              value={mobileNumber}
              onChangePhoneNumber={(text) => {
                const formattedNumber =
                  "+" + this.phone.getCountryCode() + "-" + text;
                setMobileNumber(formattedNumber);
              }}
            />
          </View>

          <Text style={styles.paymentText}>Payment Method:</Text>
          <View style={styles.radioContainer}>
            <RadioButton
              value="cashOnDelivery"
              status={
                paymentMethod === "cashOnDelivery" ? "checked" : "unchecked"
              }
              onPress={() => setPaymentMethod("cashOnDelivery")}
            />
            <MaterialCommunityIcons
              name="cash"
              size={34}
              color={COLORS.primary}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.radioLabel}>Cash on Delivery</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              onPress={confirmOrder}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 16,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  productContainer: {
   flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    borderRadius: 20,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    marginBottom: 17,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  productImageContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  productImage: {
    width: 90,
    height: 90,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.black,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    fontFamily: "bold",
    fontSize: SIZES.large - 2,
  },
  textcontainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  TextInput: {
    flex: 1,
    paddingHorizontal: 5,
    color: "black",
  },
  paymentText: {
    fontSize: 18,
    marginLeft: 4,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 6,
  },
  radioLabel: {
    fontSize: 17,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#ba5b73",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 150,
    alignItems: "center",
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  addressContainer: {
    marginBottom: 0,
  },
  addressSection: {
    marginBottom: 0,
  },
  addressSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  shippingAddressText: {
    marginTop: 5,
    fontStyle: "italic",
  },
  shippingAddressInput: {
    borderWidth: 1,
    borderColor: COLORS.primary, // Customize the color
    borderRadius: 8,
    padding: 8,
    marginTop: 5,
  },
});

export default OrderScreen;
