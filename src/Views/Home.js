import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text> Home </Text>
      </SafeAreaView>
    );
  }
}

export default Home;
