import React, {Component} from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import InitialScreen from "../Views/Startup";
import createScreen from '../Views/Bill'
import homeScreen from "../Views/Home";

import { DrawerContainer, EmployeeContainer } from "./DrawerNavigator";import { EmployeeNavContainer } from './OtherStackNavigator';
''
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
    NormalUser:{
        screen: EmployeeContainer
    }
},{
    defaultNavigationOptions:{
        header: null
    }
})

export const HomeNavContainer = createAppContainer(HomeNav)

