import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import InitialScreen from "../Views/Startup";
import createScreen from '../Views/Bill'
import homeScreen from "../Views/Home";
import { DrawerContainer } from "./DrawerNavigator";
const InitialStack = createStackNavigator({
    Initial:{
        screen: InitialScreen
    }
},{
    defaultNavigationOptions:{
        header: null
    }
})

export const InitialStackContainer = createAppContainer(InitialStack)


const HomeNav = createStackNavigator({
    Drawer:{
        screen: DrawerContainer
    },
    Create:{
        screen: createScreen
    }
},{
    defaultNavigationOptions:{
        header: null
    }
})

export const HomeNavContainer = createAppContainer(HomeNav)