import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, PixelRatio, Button, Image, TextInput } from 'react-native';
import { ThemeResponsive } from "../Themes/Theme";
import { Title, DrawerLabel } from "../Themes/StyledComponent";
import { connect } from "react-redux";
import { SET_CREDENTIALS } from "../Redux/Action/Auth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { Login } from "../Redux/Action/Auth";
const Pixel = PixelRatio.get()
 class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password:'secret'
    };
  }

  

  Login = () => {
    this.state.username === undefined ? this.setState({username: ''}) : null
    this.state.password === undefined ? this.setState({password: '' }) : null

    if(this.state.password !== "" || this.state.username !== "" || this.state.username !== undefined || this.state.password !== undefined){
      this.props.Auth(this.state)
      .then(success => {
        // alert(success)
        success ? this.props.navigation.navigate('Drawer') : alert('Log in failed')
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a" }}>
        {/* <ImageBackground
          resizeMode="stretch"
          source={require('../Assets/Background/InititialBackground.jpg')}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> */}

     <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>


          <Image
             resizeMode="contain"
             style={{width:200}}
             source={require('../Assets/icon/logo.png')}/>

          <View style={{ width: "80%", marginTop: 20 }}>
          <TextInput
            autoCapitalize={"none"}
            placeholder="Username"
            placeholderTextColor="#c5c5c5"
            onChangeText={(val) => this.setState({username: val})}
            keyboardType="twitter"
            style={{
              borderBottomWidth: 0.5,
              padding: 10,
              fontSize: 18,
              fontWeight:"bold",
              color:"#fff",
              borderBottomColor:"#fff"
            }}
          />
          <Text style={{color:"red"}}>{this.state.username === "" ? "Username is required" : null}</Text>

            <TextInput
              autoCapitalize={"none"}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#c5c5c5"
              onChangeText={(val) => this.setState({ password: val })}
              style={{
                borderBottomWidth: 0.5,
                padding: 10,
                marginTop: 40,
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
                borderBottomColor: "#fff"
              }}
            />
            <Text style={{ color: "red" }}>{this.state.password === "" ? "Password is required" : null}</Text>
          </View>

         <View style={{alignSelf:"flex-end", marginTop: 50, marginRight: 30}}>
              <TouchableOpacity 
                    onPress={this.Login}
                    style={{backgroundColor:"#c5c5c5", padding: 15, borderRadius: 5}}>
                <Text style={{fontWeight:"bold"}}>LOGIN</Text>
              </TouchableOpacity>
         </View>
     </View>
 
{/* 
        </ImageBackground> */}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setGoogle: (data) => dispatch(SET_CREDENTIALS(data)),
    Auth: (credentials) => dispatch(Login(credentials))
  }
}


export default connect(null, mapDispatchToProps)(Startup)
