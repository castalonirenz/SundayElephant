import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import InitialScreen from "../Views/Startup";

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