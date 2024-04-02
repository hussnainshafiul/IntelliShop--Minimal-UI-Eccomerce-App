import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import Cart from "./Screens/Cart";
import Wishlist from "./Screens/Wishlist";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import CustomBottomTab from "./Components/BottomTabs/CustomBottomTab";
import Upload from "./Screens/Upload";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home2"
          component={Home}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{ tabBarLabel: "Profile" }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{ tabBarLabel: "Cart" }}
        />
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{ tabBarLabel: "Wishlist" }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default BottomTab;
