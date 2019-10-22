import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { DrawerLabel } from "../Themes/StyledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCog, faArrowRight, faChevronCircleRight, faArrowLeft, faFileInvoiceDollar, faFile, faArchive, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react'
import { ThemeResponsive } from "../Themes/Theme";
import HomeScreen from "../Views/Home";
import {renderLabel} from "../Components/DrawerLabel";
import Bill from '../Views/Bill';




const CustomDrawer = (props) => {
    let currentRoute = props.navigation.state.routes[props.navigation.state.index].routeName


    return (
        console.log(props.navigation.state.routes[props.navigation.state.index].routeName),
        <ScrollView style={{ width: "100%" }}>
            <SafeAreaView style={{ flex: 1, width: "100%" }}>

                <ImageBackground
                    resizeMode="cover"
                    source={require('../Assets/Background/background4.jpg')}
                    style={{ backgroundColor: "green", height: Dimensions.get('screen').height * .2 }}>
                    <Text style={{ color: "#FFF" }}>test</Text>
                </ImageBackground>

           

                {renderLabel(props.navigation)}

                {/* <DrawerNavigatorItems {...props} /> */}
            </SafeAreaView>
        </ScrollView>
    )
}

const Drawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    "My Account": {
        screen: HomeScreen
    },
    Create:{
        screen: Bill
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
}, {
    contentComponent: withNavigation(CustomDrawer),
    contentOptions: {
        activeTintColor: "orange",
    }
})

export const DrawerContainer = createAppContainer(Drawer)