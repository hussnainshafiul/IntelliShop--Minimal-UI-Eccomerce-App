// import { View, Text } from "react-native";
// import React from "react";
// import Home from "../Screens/Home";
// import { COLORS } from "../constants/index";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Feather from "react-native-vector-icons/Feather";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const Tab = createBottomTabNavigator();
// // const screenOptions = {
//   tabBarShowLabel: false,
//   tabBarHideOnKeyboard: true,
//   headerShown: false,
//   tabBarStyle: {
//     bottom: 0,
//     right: 0,
//     left: 0,
//     elevation: 0,
//     height: 55,
//   },
// };

// const BottomTabNav = () => {
//   return (
//      <Tab.Navigator screenOptions={screenOptions}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Ionicons
//                 name={focused ? "home" : "home-outline"}
//                 color={focused ? COLORS.primary : COLORS.gray2}
//                 size={24}
//               />
//             );
//           },
//         }}
//       />
   
//     </Tab.Navigator>
//   )
// }

// export default BottomTabNav