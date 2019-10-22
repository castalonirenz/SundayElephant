import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <FontAwesomeIcon icon={faBars} size={25} color="#000" style={{ marginLeft: 15, marginTop: 10, }} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Bill;
