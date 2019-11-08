import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { Style } from "../utils/Style";
export const Header = (props) => {
    return (
        <View
            style={[Style.Shadow,{
                width: "100%",
                backgroundColor: "#16242a",
                alignItems: "center",
                flexDirection: "row",
                padding: 20
            }, props.Style]}>

            <TouchableOpacity
                onPress={props.Toggle}
            >
                <FontAwesomeIcon icon={props.Icon} size={25} color="#fff"  />

            </TouchableOpacity>
            <Text style={{
                color:"#fff",
                fontWeight:"bold",
                fontSize: 18,
                marginLeft: 30
            }}>
                Sunday Elephant
            </Text>
        </View>
    )
}