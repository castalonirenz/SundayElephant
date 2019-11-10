import React, { useState, useEffect } from "react";
import { Modal, View, Text, Picker, Alert, TouchableHighlight, Dimensions, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Style } from "../utils/Style";
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faWindowClose, faTimes } from "@fortawesome/free-solid-svg-icons";

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
                    {/* <Picker
                        mode="dialog"
                        selectedValue={props.selectedValue}
                        itemStyle={[{ backgroundColor: "#fff", padding: 10, color: "orange" }]}
                        style={[{ width: width / 2 }]}
                        onValueChange={props.onValueChange}>
                        <Picker.Item label="Select Account Role" value={0} />
                        <Picker.Item label="Admin" value={1} />
                        <Picker.Item label="Normal User" value={2} />
                    </Picker> */}

                    <View style={{backgroundColor:"#fff", padding:20, width:"80%", borderRadius: 10}}>
                        <TouchableOpacity onPress={props.Selected.bind(null, 1)}>
                            <Text style={{fontSize: 16, fontWeight:"bold"}}>Admin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                                onPress={props.Selected.bind(null, 2)}
                                style={{marginTop: 10}}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Normal User</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </View>
            </Modal>
        </View>
    )
}

export const DateTime = (props) => {
    
    return (
        // <SafeAreaView style={{flex: 1,  backgroundColor:"green", justifyContent:"center", alignItems:"center"}}>
         
                    <DateTimePicker 
                        onTouchCancel={props.onCancel}
                        value={props.value}
                        // style={{ backgroundColor: "#fff", height: 200, width: 350,  borderRadius: 10 }}
                        mode={props.mode}
                        is24Hour={true}
                        // display="default"
                        onChange={props.onChange} />
         
        // </SafeAreaView>
    )
}


export const TaskDetails = (props) => {

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.Visible}
                onRequestClose={props.onRequestClose}>
                <View style={[Style.Shadow, { marginTop: 22, backgroundColor: "transparent", flex: 1, alignItems: "center", justifyContent: "center" }]}>

              

                    <View style={{ backgroundColor: "#16242a", padding: 0, width: "80%", borderRadius: 10, alignItems:"center", height:"60%", justifyContent:"center" }}>
                        <TouchableOpacity
                                onPress={props.closeModal} 
                                style={{position:"absolute", top: 20, right: 20}}>
                            <FontAwesomeIcon icon={faTimes} color={"orange"} />
                        </TouchableOpacity>
                       <View style={{alignItems:"center"}}>
                            <Text style={{color:"orange", fontSize:24}}>{props.taskName}</Text>
                            <Text style={{color:"#fff"}}>{props.taskDetails}</Text>
                       </View>

                       <View style={{alignSelf:"flex-start", padding: 30}}>
                           <View style={{flexDirection:"row"}}>
                                <Text style={{color:"orange"}}>Status: </Text>
                                <Text style={{ color: "#fff" }}>{props.status}</Text>
                           </View>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "orange" }}>From: </Text>
                                <Text style={{ color: "#fff" }}>{props.startDate}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "orange" }}>To: </Text>
                                <Text style={{ color: "#fff" }}>{props.endDate}</Text>
                            </View>

                            <Text style={{color:"orange", marginTop: 20}}>Assigned to:</Text>
                             <View style={{flexDirection:"row", alignItems:"center", marginTop: 20}}>
                                <Image 
                                    resizeMode="contain"
                                    style={{width: 80, height: 80, borderRadius: 40}}
                                    source={require('../Assets/icon/avatar.png')}/>
                                      <Text style={{color:"green", fontSize:18, marginLeft: 20, fontWeight:"bold"}}>{props.employeeName}</Text>
                           </View>
                       </View>

                        <TouchableOpacity
                            // onPress={props.Selected.bind(null, 2)}
                            onPress={props.complete}
                            style={{ marginTop: 10, width:"70%", borderRadius: 30, backgroundColor:"green", alignItems:"center", height:"10%", justifyContent:"center", padding: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color:"#fff" }}>MARK AS COMPLETE</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </View>
            </Modal>
        </View>
    )
}