import React,{ useState, useEffect } from "react";
import { Modal, View, Text, Picker, Alert, TouchableHighlight, Dimensions } from "react-native";
import { Style } from "../utils/Style";
const {width} = Dimensions.get('screen')
export const M = (props) => {

    return(
        <View >
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.Visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={[Style.Shadow,{ marginTop: 22, backgroundColor:"transparent",flex: 1, alignItems:"center", justifyContent:"center" }]}>
                  {/* <View style={{backgroundColor:"gray", }}> */}
                        <Picker
                            mode="dropdown"
                            selectedValue={props.selectedValue}
                            itemStyle={[{backgroundColor:"#fff", padding: 10, color:"orange"}]}
                            style={[{  width: width / 2 }]}
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