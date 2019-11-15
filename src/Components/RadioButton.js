

import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get('screen')
export const RadioButton = props => {
    return (
        <ScrollView disableScrollViewPanResponder={true} style={{ width: "100%", maxHeight: height / 2 }}>

            {props.options.map((item, key) => {
                
                return (

                    <TouchableOpacity
                        disabled={props.disabled}
                        onPress={props.onPress.bind(null, item)}
                        style={[props.style, { flexDirection: "row" }]}
                        key={key}>
                        <View

                            style={style.circle}>
                            {props.value === item.key && (<View style={style.checkedCircle} />)}
                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text style={[{ marginLeft: 10, color:"#fff" }]}>{item.text}</Text>
                            <Text style={[ { marginLeft: 10, color: "#c5c5c5" }]}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>

                )
            })}

        </ScrollView>

    )

}

const style = StyleSheet.create({
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderColor: "#AA2417",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    checkedCircle: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: "#AA2417"
    }
})