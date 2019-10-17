import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { TabContainer } from "./src/Navigators/BottomTabNavigator";
import { DrawerContainer } from "./src/Navigators/DrawerNavigator";
import { InitialStackContainer } from './src/Navigators/StackNavigator';
export default  class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SwitchContainer/>
    );
  }
}

const SwitchNav = createSwitchNavigator({
      // LandingPage: TabContainer,
      Initial: InitialStackContainer,
      DrawerLandingPage: DrawerContainer
})

const SwitchContainer = createAppContainer(SwitchNav)





