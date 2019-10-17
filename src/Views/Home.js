import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';

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



        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Home;
