import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS, SIZES } from "../constants";
import { getProducts, getProduct } from "../model/data";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Add a listener to fetch cart items when the screen gains focus
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCartItems();
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  // Function to increment the quantity of a product in the cart
  const incrementQuantity = (productId) => {
    const updatedItems = [...cartItems, productId];
    updateCart(updatedItems);
  };

  const Separator = () => <View style={styles.separator} />;

  // Function to decrement the quantity of a product in the cart
  const decrementQuantity = (productId) => {
    const index = cartItems.indexOf(productId);
    if (index > -1) {
      const updatedItems = [...cartItems];
      updatedItems.splice(index, 1);
      updateCart(updatedItems);
    }
  };

  // Function to update the cart in AsyncStorage and state
  const updateCart = async (updatedItems) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Function to fetch cart items from AsyncStorage
  const fetchCartItems = async () => {
    try {
      const items = await AsyncStorage.getItem("cartItems");
      if (items) {
        const parsedItems = JSON.parse(items);
        setCartItems(parsedItems);
        calculateTotalPrice(parsedItems);
      } else {
        setCartItems([]);
        calculateTotalPrice([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach((id) => {
      const product = getProduct(id);
      if (product) {
        totalPrice += parseFloat(product.price);
      }
    });
    setTotal(totalPrice);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = async (id) => {
    const updatedItems = cartItems.filter((itemId) => itemId !== id);
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to render individual products in the cart
  const renderProducts = (productId, index) => {
    const product = getProduct(productId);
    if (!product) return null;

    const quantity = cartItems.filter((id) => id === productId).length;
    const hasRendered = cartItems.slice(0, index).includes(productId);

    if (!hasRendered) {
      return (
        <View style={styles.cartItemContainer} key={index}>
          <View style={styles.cross}>
            <TouchableOpacity onPress={() => removeItemFromCart(product.id)}>
              <Entypo name="circle-with-cross" size={25} color={COLORS.red} />
            </TouchableOpacity>
          </View>
          {/* Render product image */}
          <View style={styles.cartItemImageContainer}>
            <Image
              source={product.image}
              style={styles.cartItemImage}
              resizeMode="contain"
            />
          </View>
          {/* Render product details */}
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemTitle}>{product.Title}</Text>
            <Text style={styles.category}>{product.Category}</Text>
            <Text style={styles.cartItemPrice}>Price: ${product.price}</Text>
            {/* Render quantity controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(productId)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(productId)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              {/* Remove item button */}
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  // Function to handle the checkout process
  const checkOut = async () => {
    try {
      // Clear the cart items from AsyncStorage
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error clearing cart:", error);
      return;
    }

    // Generate a summary of detailed product information for checkout
    const detailedProductSummary = cartItems
      .map((productId) => {
        const product = getProduct(productId);
        if (product) {
          const quantity = cartItems.filter((id) => id === productId).length;
          const totalPrice = parseFloat(product.price) * quantity;
          return {
            id: productId,
            image: product.image,
            title: product.Title,
            price: product.price,
            quantity,
            totalPrice,
          };
        }
        return null;
      })
      .filter((product) => product !== null);

    // Navigate to the order screen with product summary and total price
    navigation.navigate("OrderScreen", {
      productSummary: detailedProductSummary,
      total,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.screenTitle}>My Cart</Text>
        {cartItems.length > 0 ? (
          cartItems.map(renderProducts)
        ) : (
          <Image
            source={require("../assets/empty.png")}
            style={{
              resizeMode: "contain",
              marginLeft: -10,
              width: SIZES.width,
              height: SIZES.height,
              opacity: 1,
              bottom: 150
              
            }}
          />
        )}
      </ScrollView>
      <View style={styles.summary}>
        <Text style={styles.orderheading}>Order Summary</Text>
        <Separator />
        <View style={styles.infoContainer}>
          <Text style={styles.normaltxt1}>Number of Items:</Text>
          <Text style={[styles.normaltxt1, styles.alignRight]}>
            {cartItems.length}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.normaltxt1}>Delivery Fee:</Text>
          <Text style={styles.normaltxt1}>
            {<Text style={{ fontFamily: "bold" }}>Free</Text>}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.normaltxt2}>Total Price:</Text>
          <Text style={styles.normaltxt2}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <TouchableOpacity
          onPress={checkOut}
          style={[
            styles.checkoutButton,
            { backgroundColor: total > 0 ? "#ba5b73" : COLORS.gray2 },
          ]}
          disabled={total === 0}
        >
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  screenTitle: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "bold",
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    color: COLORS.black,
  },
  cross: {
    position: "absolute",
    top: -13,
    right: 1,
  },
  emptyCartText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
    color: COLORS.black,
  },
  cartItemContainer: {
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
  cartItemImageContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cartItemImage: {
    width: 120,
    height: 120,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    paddingTop: 15,
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.black,
  },
  category: {
    fontSize: 16,
    top: 4,
  },
  cartItemPrice: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
    top: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: -13,
    width: "42%",
    left: 113,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    borderRadius: 7,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  quantityButton: {
    fontSize: 20,
    color: COLORS.black,
  },
  quantity: {
    fontSize: 16,
    color: COLORS.red,
  },
  summary: {
    width: "90%",
    height: "20%",
    marginLeft: 18,
    marginRight: 18,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    borderRadius: 20,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  totalContainer: {
    alignItems: "center",
    padding: 100,
    paddingTop: 20,
    top: -15
  },
  checkoutButton: {
    backgroundColor: "#ba5b73",
    borderRadius: 20,
    width: "83%",
    height: 46,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontFamily: "regular",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 7,
  },
  summary: {
    width: "90%",
    marginLeft: 18,
    marginRight: 18,
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

  orderheading: {
    fontSize: 19,
    fontFamily: "bold",
  },

  normaltxt1: {
    fontSize: 17,
    marginBottom: 5,
  },

  normaltxt2: {
    fontSize: 17,
    color: "#ba5b73",
    marginBottom: 5,
    fontFamily: "semibold",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  alignRight: {
    textAlign: "right",
  },
  separator: {
    width: "93%",
    height: 1,
    backgroundColor: "#ba5b73",
    left: 7,
    top: -5,
  },
});

export default Cart;
