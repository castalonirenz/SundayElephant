import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, PixelRatio } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { ThemeResponsive } from "../Themes/Theme";
import { Title } from "../Themes/StyledComponent";
const Pixel = PixelRatio.get()
export default class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, "--> user info")
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../Assets/Background/InititialBackground.jpg')}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

          <View style={{ width: "80%", alignItems:"center" }}>
            <Text style={ThemeResponsive(Pixel).header}>Organize your task on hand</Text>
          </View>

            <View style={{width:"80%", marginTop: 20}}>
             <Title
                size="12px"  
              >
                Create an account to see your bills and access them anywhere.
              </Title>
            </View>
     
            <GoogleSigninButton
              style={{ width: "80%", height: 48, position:"absolute", bottom: 20 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
 

        </ImageBackground>
      </SafeAreaView>
    );
  }
}
