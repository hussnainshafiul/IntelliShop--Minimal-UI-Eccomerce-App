import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProducts } from "../model/data";
import { COLORS, SIZES } from "../constants";

const Wishlist = () => {
  const navigation = useNavigation();
  //adding the useState hook
  const [wishlistItems, setWishlistItems] = useState([]);

  //adding the removefromwishlist Function

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item !== id);
    setWishlistItems(updatedWishlist);
    await AsyncStorage.setItem(
      "wishlistItems",
      JSON.stringify(updatedWishlist)
    );
  };

  //function to add the items to cart

  const addToCartFromWishlist = async (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item !== id);
    setWishlistItems(updatedWishlist);

    let cartItems = await AsyncStorage.getItem("cartItems");
    cartItems = JSON.parse(cartItems) || [];
    cartItems.push(id);

    await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
  };


  //setting wishlist Items 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const wishlist = await AsyncStorage.getItem("wishlistItems");
      setWishlistItems(JSON.parse(wishlist) || []);
    });

    return unsubscribe;
  }, [navigation]);

  //rendering of products

  const renderItem = ({ item }) => {
    const product = getProducts().find((p) => p.id === item);

    return (
      <View style={styles.itemContainer}>
        <Image source={product.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{product.Title}</Text>
          <Text style={styles.itemPrice}>${product.price}</Text>
          <View style={styles.itemButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCartFromWishlist(product.id)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeFromWishlist(product.id)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {wishlistItems.length > 0 && wishlistItems.some(item => item !== null) ? (
        <FlatList
          data={wishlistItems.filter((item) => item !== null)}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyWishlistContainer}>
          <Text style={styles.emptyWishlistText}>Your Wishlist is Empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 20
    
  },
  listContent: {
    padding: SIZES.padding,
  },
  itemContainer: {
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
  itemImage: {
    width: "30%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: SIZES.radius,
    marginTop: 6
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  itemButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ba5b73",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
   emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWishlistText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
});

export default Wishlist;
