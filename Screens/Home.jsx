import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../constants";
import Entypo from "react-native-vector-icons/Entypo";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Slider from "../Home/Slider";
import ProductRow from "../Home/Products/ProductRow";
import { getProducts } from "../model/data.js";
import { DrawerActions } from "@react-navigation/native";

// import firebase from "../config";

const Home = () => {
  const navigation = useNavigation();
  //fetching the products on the base of Gender Category
  const newArrivals = getProducts().filter(
    (product) => product.Gender === "girl"
  );
  const boysProducts = getProducts().filter(
    (product) => product.Gender === "Boys"
  );
  const menProducts = getProducts().filter(
    (product) => product.Gender == "Men"
  );
  const womenProducts = getProducts().filter(
    (product) => product.Gender == "Women"
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <MaterialIcons name="menu-open" size={33} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.User}>Hello, Welcome</Text>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Feather
                name="search"
                size={19}
                color={COLORS.primary}
                style={{ marginLeft: 40 }}
              />
              <TextInput
                style={styles.searchInput}
                value=""
                placeholder="What are you looking for?"
                onPressIn={() => navigation.navigate("Search")}
              />
            </View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={()=> navigation.navigate("Search")}
            >
              <Image
                source={require("../assets/search.png")}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <Slider />
        </View>
        <View>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 22,
              fontFamily: "medium",
              fontSize: 22,
            }}
          >
           Women Apparels
          </Text>
          <View>
            <ProductRow products={newArrivals} />
          </View>
        </View>
        <View>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 22,
              fontFamily: "medium",
              fontSize: 22,
            }}
          >
            Men Apparels
          </Text>
          <View>
            <ProductRow products={boysProducts} />
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 12,
    marginLeft: 12,
    marginTop: SIZES.xxLarge - 4,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  User: {
    fontFamily: "new2",
    color: COLORS.primary,
    fontSize: 18,
    marginLeft: 7,
  },
  title: { marginTop: SIZES.medium, marginHorizontal: 10 },
  titletxt: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
    paddingHorizontal: 5,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 45,
    marginHorizontal: 12,
    marginLeft: 15,
  },
  searchWrapper: {
    marginLeft: 49,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "95%",
    marginHorizontal: 9,
    borderColor: "#B95A75",
    borderWidth: 1,
    flexDirection: "row",
    width: "88%",
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small - 5,
    paddingTop: 2,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 49,
  },
  searchBtnImage: {
    width: "52%",
    height: "52%",
    tintColor: "#B95A75",
  },
});

export default Home;
