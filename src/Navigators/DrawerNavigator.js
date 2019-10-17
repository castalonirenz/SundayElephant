import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Views/Home";
const Drawer = createDrawerNavigator({
    Home:{
        screen: HomeScreen
    },
    "My Account": {
        screen: HomeScreen
    },
    Project: {
        screen: HomeScreen
    },
    Employee: {
        screen: HomeScreen
    },
    Logout: {
        screen: HomeScreen
    }
})

export const DrawerContainer = createAppContainer(Drawer)