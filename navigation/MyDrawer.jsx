import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screens/Home";
import Cart from "../Screens/Cart";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="Article" component={Cart} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
