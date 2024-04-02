import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import Register from "./Screens/Register";
import Authentication from "./Screens/Authentication";
import Home from "./Screens/Home";
import Slider from "./Home/Slider";
import ProductCardView from "./Home/Products/ProductCardView";
import { firebase } from "./config";
import ProductDetails from "./Home/Products/ProductDetails";
import { useState, useEffect } from "react";
import BottomTab from "./BottomTab";
import Cart from "./Screens/Cart";
import Wishlist from "./Screens/Wishlist";
import OrderScreen from "./Screens/OrderScreen";
import MyDrawer from "./navigation/MyDrawer";
const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from "@react-navigation/drawer";
import Search from "./Screens/Search";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
   <Drawer.Navigator
      drawerContent={props => <CustomDrawer{...props} /> }
       screenOptions={{headerShown: false ,
       drawerActiveBackgroundColor: '#ba5b73',
       drawerActiveTintColor: '#fff',
       drawerInactiveTintColor: '#333',
        drawerLabelStyle:{marginLeft: -25, fontSize:15}}}>
        <Drawer.Screen component ={BottomTab} name='Home'  
            options={{drawerIcon: ({color})=>(
               <Ionicons name='home-outline' size={22} color={color}/>
            )}}
        />
        <Drawer.Screen component ={Search} name='Search' 
         options={{drawerIcon: ({color})=>(
               <Ionicons name='search-circle-outline' size={22} color={color}/>
            )}}  />
        <Drawer.Screen component ={Wishlist} name='Wishlist' 
         options={{drawerIcon: ({color})=>(
               <Ionicons name='heart-circle-outline' size={22} color={color}/>
            )}} />
        <Drawer.Screen component ={Cart} name='Cart'  
             options={{drawerIcon: ({color})=>(
               <Ionicons name='basket' size={22} color={color}/>
            )}}
        />
      </Drawer.Navigator>
  );
}
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{ headerShown: false }}
          />
        </>
      )}
       <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{headerShown: false}}
      />
       

      {/* */}
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    new: require("./assets/fonts/ArefRuqaa-Bold.ttf"),
    new2: require("./assets/fonts/ArefRuqaa-Regular.ttf"),
  });

  {/* */}
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <App />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "bold",
  },
});