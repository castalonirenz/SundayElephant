import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, TouchableOpacity,View, Dimensions, ImageBackground } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import { DrawerLabel } from "../Themes/StyledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import React from 'react'
import { ThemeResponsive } from "../Themes/Theme";
import HomeScreen from "../Views/Home";

const CustomDrawer = (props) => {
    let currentRoute = props.navigation.state.routes[props.navigation.state.index].routeName
    return (
    console.log(props.navigation.state.routes[props.navigation.state.index].routeName),
    <ScrollView style={{ width: "100%" }}>
        <SafeAreaView style={{ flex: 1, width: "100%"}}>

                <ImageBackground 
                    resizeMode="cover"
                    source={require('../Assets/Background/background4.jpg')}
                    style={{ backgroundColor: "green", height: Dimensions.get('screen').height * .2}}>
                      <Text style={{color:"#FFF"}}>test</Text>
                </ImageBackground>

                <View style={{ alignItems: "center", justifyContent: "center", flex: 1}}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('DrawerLandingPage')}
                        style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                        <FontAwesomeIcon icon={faHome} size={30} color={currentRoute === "Home" ? "orange" : "#000"} />
                        <View style={{ marginLeft: 5, }}>
                            <DrawerLabel color={currentRoute === "Home" ? "orange" : "#000"}>Home</DrawerLabel>
                        </View>
                    </TouchableOpacity>
            </View>
          
            {/* <DrawerNavigatorItems {...props} /> */}
        </SafeAreaView>
    </ScrollView>
)}

const Drawer = createDrawerNavigator({
    Home: {
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
}, {
    contentComponent: CustomDrawer,
    contentOptions:{
        activeTintColor: "orange",
    }
})

export const DrawerContainer = createAppContainer(Drawer)