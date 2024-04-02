import {
  ScrollView,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Button,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getProduct } from "../../model/data"
// import { getProductFromFirebase, getProductsFromFirebase } from "../../model/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Cart from "../../Screens/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = ({ route, navigation }) => {

  
  const { productId } = route.params;

  //const product = productId ? getProduct(productId) : undefined;

  const [product, setProduct] = useState("");
  
  //setting the product using its id
  useEffect(() => {
    setProduct(getProduct(productId));
  });








  

  
  //function to add to wishlist

  const addToWishlist = async (id) => {
    let wishlistArray = await AsyncStorage.getItem("wishlistItems");
    wishlistArray = JSON.parse(wishlistArray) || [];

    if (!wishlistArray.includes(id)) {
      wishlistArray.push(id);
      await AsyncStorage.setItem(
        "wishlistItems",
        JSON.stringify(wishlistArray)
      );
      ToastAndroid.show("Added to wishlist successfully", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Already in wishlist", ToastAndroid.SHORT);
    }
  };

  //add to cart

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={() => addToWishlist(product.id)}>
          <Ionicons name="heart-outline" size={28} color={COLORS.red} />
        </TouchableOpacity>
      </View>
      <View style={style.imageContainer}>
        <Image
          source={product?.image}
          style={{ resizeMode: "contain", flex: 1 }}
        />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View style={style.line} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Best choice</Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 200,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {product?.Title}
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 10,
                color: COLORS.black,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
             $ {product?.price}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {product?.description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View >
                
              </View>
            </View>

            <View style={style.buyBtn}>
              <TouchableOpacity onPress={() => addToCart(product.id)}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 30,
    marginTop: -30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.black,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 18 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: "#ba5b73",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: -10
  },
  priceTag: {
    backgroundColor: COLORS.secondary,
    width: 73,
    height: 40,
    justifyContent: "center",
    marginLeft: 55,
    marginStart: 65,
    borderRadius: 20,
    
  },
});

export default ProductDetails;
