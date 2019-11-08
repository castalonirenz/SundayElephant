import React, { useState, useEffect } from "react";
import { Modal, View, Text, Picker, Alert, TouchableHighlight, Dimensions } from "react-native";
import { Style } from "../utils/Style";
import DateTimePicker from '@react-native-community/datetimepicker';
const { width } = Dimensions.get('screen')

export const M = (props) => {

    return (
        <View >
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.Visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={[Style.Shadow, { marginTop: 22, backgroundColor: "transparent", flex: 1, alignItems: "center", justifyContent: "center" }]}>
                    {/* <View style={{backgroundColor:"gray", }}> */}
                    <Picker
                        mode="dropdown"
                        selectedValue={props.selectedValue}
                        itemStyle={[{ backgroundColor: "#fff", padding: 10, color: "orange" }]}
                        style={[{ width: width / 2 }]}
                        onValueChange={props.onValueChange}>
                        <Picker.Item label="Select Account Role" value={0} />
                        <Picker.Item label="Admin" value={1} />
                        <Picker.Item label="Normal User" value={2} />
                    </Picker>
                    {/* </View> */}
                </View>
            </Modal>
        </View>
    )
}

export const DateTime = (props) => {
    console.log('date time')
    return (
        <View style={{flex: 1, position:"absolute", backgroundColor:"green"}}>
            {/* <Modal
            
                animationType="fade"
                transparent={false}
                visible={props.dateTimeVisible}
                onRequestClose={props.onRequestClose}> */}
                {/* <View style={[Style.Shadow, { marginTop: 22, backgroundColor: "red", flex: 1, alignItems: "center", justifyContent: "center" }]}> */}
                    {/* <View style={{backgroundColor:"gray", }}> */}
                    <DateTimePicker 
                        onTouchCancel={props.onCancel}
                        style={{zIndex: 999}}
                        value={props.value}
                        // style={{ backgroundColor: "#fff", height: 200, width: 350, position: "absolute", zIndex: 9999, borderRadius: 10 }}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={props.onChange} />
                    {/* </View> */}
                {/* </View> */}
            {/* </Modal> */}
        </View>
    )
}