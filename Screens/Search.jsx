import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SHADOWS, SIZES } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getProducts, getProduct } from "../model/data";
import { useNavigation } from "@react-navigation/native";
const Search = () => {
  const navigation = useNavigation();

  // adding necessary useState Hooks
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //function to handleSearch

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // Show a message if the search query is empty
      alert("Please type something to search for a product");
      return;
    }

    // Perform search logic here using the searchQuery
    const results = getProducts().filter((product) =>
      product.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.primary}
              style={{ marginLeft: 48, paddingTop: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              placeholder="What are you looking for?"
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Image
            source={require("../assets/search.png")}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* Display search results */}
      <View>
        {searchResults.length === 0 ? (
          <View>
            <Image style={{
                resizeMode: 'contain',
                marginLeft: 33,
                marginTop: 70,
                width: SIZES.width-100,
                height: SIZES.height-300,
                opacity: 0.9
            }}source={require("../assets/Pose23.png")}/>
          </View>
        ) : (
          searchResults.map((product) => (
            <View key={product.id}>
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productId: product.id,
                  })
                }
              >
                <View style={styles.image}>
                  <Image
                    source={product.image}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.productTitle}>{product.Title}</Text>
                  <Text style={styles.category}>{product.Category}</Text>
                  <Text style={styles.price}>${product.price}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    marginBottom: SIZES.small - 14,
    ...SHADOWS.small,
  },
  imageContainer: {
    marginRight: SIZES.small,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.medium,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  productTitle: {
    marginBottom: SIZES.xSmall - 6,
    fontFamily: "semibold",
    fontSize: 15,
  },
  category: {
    color: COLORS.gray,
    marginBottom: SIZES.xSmall,
  },
  price: {
    color: COLORS.primary,
  },

  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xxLarge,
    height: 45,
    marginHorizontal: 12,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    marginHorizontal: 9,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -2,
    marginRight: 8,
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#B95A75",
  },
  noResultsText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: SIZES.h3,
    color: COLORS.gray,
  },
});
