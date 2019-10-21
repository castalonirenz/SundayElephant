import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground
        source={require('../Assets/Background/background3.jpg')}
        style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
          >
          <FontAwesomeIcon icon={faBars} size={25} color="#fff" style={{marginLeft: 15  , marginTop: 10,}}/>
        </TouchableOpacity>


        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Home;
