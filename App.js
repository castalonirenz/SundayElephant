import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { TabContainer } from "./src/Navigators/BottomTabNavigator";
import { DrawerContainer } from "./src/Navigators/DrawerNavigator";
import { InitialStackContainer, HomeNavContainer } from './src/Navigators/StackNavigator';
import { Provider } from "react-redux";
import { store } from "./src/Redux/configureStore";
export default  class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
   <Provider store={store}>
        <SwitchContainer />
   </Provider>
    );
  }
}

const SwitchNav = createSwitchNavigator({
      // LandingPage: TabContainer,
      Initial: InitialStackContainer,
      LandingPage: HomeNavContainer
})

const SwitchContainer = createAppContainer(SwitchNav)





