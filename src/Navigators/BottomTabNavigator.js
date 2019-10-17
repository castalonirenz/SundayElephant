import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, {Component} from 'react'
import { View } from "react-native";
import { createAppContainer } from 'react-navigation';
import HomeScreen from "../Views/Home";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMoneyBill, faUserAlt, faQrcode } from '@fortawesome/free-solid-svg-icons'
const Tab = createBottomTabNavigator({
    Home: {

        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                // <Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={RFPercentage(3)} color={tintColor} />
                <View style={{ alignItems: "center" }}>
                    {/* <Image source={require('../myAssets/icon/home.png')} style={[Theme.iconSize, { tintColor: tintColor }]} /> */}
                    <FontAwesomeIcon icon={faHome} size={20} color={tintColor}/>
                </View>
            )
        }
    },
    Bill: {

        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Bill",
            tabBarIcon: ({ tintColor }) => (
                // <Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={RFPercentage(3)} color={tintColor} />
                <View style={{ alignItems: "center" }}>
                    {/* <Image source={require('../myAssets/icon/home.png')} style={[Theme.iconSize, { tintColor: tintColor }]} /> */}
                    <FontAwesomeIcon icon={faMoneyBill} size={20} color={tintColor} />
                </View>
            )
        }
    },
    Profile: {

        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                // <Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={RFPercentage(3)} color={tintColor} />
                <View style={{ alignItems: "center" }}>
                    {/* <Image source={require('../myAssets/icon/home.png')} style={[Theme.iconSize, { tintColor: tintColor }]} /> */}
                    <FontAwesomeIcon icon={faUserAlt} size={20} color={tintColor} />
                </View>
            )
        }
    },
},{
    tabBarOptions:{
        showLabel: false,
        activeTintColor: "#75e0d4",
        style:{
            backgroundColor:"#3c4245"
        }
    },
})

export const TabContainer = createAppContainer(Tab)