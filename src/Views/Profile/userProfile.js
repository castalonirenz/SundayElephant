import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { HeaderComponent } from "../../Components/indexComponent";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';
const Profile = (props) => {



    useEffect(() => {
        
    })


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16242a" }}>
            <HeaderComponent
                headerText={"Sunday Elephant"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <View style={{ flex: 1 }}>

                <Image
                    resizeMode="contain"
                    style={{ width: 150, height: 150, alignSelf: "center", marginTop: 20 }}
                    source={require('../../Assets/icon/avatar.png')}
                />

                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "orange", fontSize: 20 }}>Name: </Text>
                        <Text style={{ color: "#fff", fontSize: 20 }}>{props.Credentials.full_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text style={{ color: "orange", fontSize: 20 }}>Email: </Text>
                        <Text style={{ color: "#fff", fontSize: 20 }}>{props.Credentials.email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text style={{ color: "orange", fontSize: 20 }}>Phone No.: </Text>
                        <Text style={{ color: "#fff", fontSize: 20 }}>{props.Credentials.phone_no}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text style={{ color: "orange", fontSize: 20 }}>Address: </Text>
                        <Text style={{ color: "#fff", fontSize: 20 }}>{props.Credentials.address}</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        Credentials: state.Credentials.info
    }
}

export default connect(mapStateToProps, null)(withNavigation(Profile))