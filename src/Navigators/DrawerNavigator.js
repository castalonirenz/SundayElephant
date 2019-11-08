import React, { useState, Component } from 'react'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions, ImageBackground, Image, Alert } from "react-native";
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { DrawerLabel } from "../Themes/StyledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCog, faTasks, faUsers, faSignOutAlt, faFileInvoiceDollar, faFile, faArchive, faUser } from "@fortawesome/free-solid-svg-icons";

import { ThemeResponsive } from "../Themes/Theme";
import HomeScreen from "../Views/Home";
import EmployeeScreen from '../Views/Employee/Employee'
import { EmployeeNavContainer, ProjectNavContainer } from "./OtherStackNavigator";
import { renderLabel } from "../Components/DrawerLabel";
import Bill from '../Views/Bill';
import { connect } from "react-redux";
import { Logout } from "../Redux/Action/Auth";




const CustomDrawer = (props) => {
    let currentRoute = props.navigation.state.routes[props.navigation.state.index].routeName


    const logOut = () => {
        console.log('im here')
       return(
           Alert.alert(
               'Logout',
               'Are you sure?',
               [
                   {
                       text: 'Cancel',
                       onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                   },
                   {
                       text: 'OK', onPress: () => {
                           props.navigation.navigate('Initial')
                           props.onLogout()
                       }
                   },
               ],
               { cancelable: false },
           )
       )
    }

    return (

        <ScrollView style={{ width: "100%" }}>
            <SafeAreaView style={{ flex: 1, width: "100%" }}>

                <ImageBackground
                    resizeMode="cover"
                    source={require('../Assets/icon/header.png')}
                    style={{ backgroundColor: "green", height: Dimensions.get('screen').height * .2, justifyContent: "center", paddingLeft: 20 }}>

                    <Image
                        resizeMode="contain"
                        style={{ width: 70, height: 70 }}
                        source={require('../Assets/icon/job.png')} />

                    <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{props.Credentials.full_name}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{props.Credentials.email}</Text>

                </ImageBackground>

                <DrawerNavigatorItems {...props} />

                <TouchableOpacity
                    onPress={()=> logOut()}
                    style={{ flexDirection: "row", marginLeft: 18, marginTop: 10, alignItems: "center" }}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={25} color="gray" />
                    <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 28 }}>Signout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        Credentials: state.Credentials.info
    }
}

const dispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(Logout()),

    }
}

const Drawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) =>
                <FontAwesomeIcon icon={faHome} color={tintColor} size={25} />
        }
    },
    "My Account": {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) =>
                <FontAwesomeIcon icon={faUser} color={tintColor} size={25} />
        }
    },
    Project: {
        screen: ProjectNavContainer,
        navigationOptions: {
            drawerIcon: ({ tintColor }) =>
                <FontAwesomeIcon icon={faTasks} color={tintColor} size={25} />
        }
    },
    Employee: {
        screen: EmployeeNavContainer
        ,
        navigationOptions: {
            drawerIcon: ({ tintColor }) =>
                <FontAwesomeIcon icon={faUsers} color={tintColor} size={25} />
        }
    },
    // Logout: {
    //     screen: HomeScreen,
    //     navigationOptions: {
    //         drawerIcon: ({ tintColor }) =>
    //             <FontAwesomeIcon icon={faSignOutAlt} color={tintColor} size={25}/>
    //     }
    // }
}, {
    contentComponent: connect(mapStateToProps, dispatchToProps)(withNavigation(CustomDrawer)),
    contentOptions: {
        activeTintColor: "orange",
    }
})

export const DrawerContainer = createAppContainer(Drawer)