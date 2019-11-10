import React, { useState, useEffect } from "react";
import { Modal, View, Picker, Alert, TouchableHighlight, Dimensions, TouchableOpacity, SafeAreaView, Image, FlatList, Text, ScrollView } from "react-native";
import { Style } from "../utils/Style";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWindowClose, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PieChart } from 'react-native-svg-charts'
const { width } = Dimensions.get('screen')
import { TextSvg } from "../utils/Text";
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

                    <View style={{ backgroundColor: "#fff", padding: 20, width: "80%", borderRadius: 10 }}>
                        <TouchableOpacity onPress={props.Selected.bind(null, 1)}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Admin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={props.Selected.bind(null, 2)}
                            style={{ marginTop: 10 }}>
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



                    <View style={{ backgroundColor: "#16242a", padding: 0, width: "80%", borderRadius: 10, alignItems: "center", height: "60%", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={props.closeModal}
                            style={{ position: "absolute", top: 20, right: 20 }}>
                            <FontAwesomeIcon icon={faTimes} color={"orange"} />
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "orange", fontSize: 24 }}>{props.taskName}</Text>
                            <Text style={{ color: "#fff" }}>{props.taskDetails}</Text>
                        </View>

                        <View style={{ alignSelf: "flex-start", padding: 30 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "orange" }}>Status: </Text>
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

                            <Text style={{ color: "orange", marginTop: 20 }}>Assigned to:</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                <FlatList
                                    renderItem={props.renderItem}
                                    extraData={props.extraData}
                                    data={props.data}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            // onPress={props.Selected.bind(null, 2)}
                            onPress={props.complete}
                            style={{ marginTop: 10, width: "70%", borderRadius: 30, backgroundColor: "green", alignItems: "center", height: "10%", justifyContent: "center", padding: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>MARK AS COMPLETE</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </View>
            </Modal>
        </View>
    )
}

export const EmployeeDetails = (props) => {
    let project = props.projects !== undefined ? props.projects : []

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const assignColor = (val) => {
        if (val === "ongoing") {
            return "blue"
        }
        else if (val === "done") {
            return "green"
        }
        else if (val === "incomplete") {
            return "red"
        }
        else if(val === "incoming"){
            return "#fff"
        }
    }

    const pieData = props.data !== undefined ? props.data : []
    let finalData = []
    let total = 0
    if (pieData.length !== 0) {
        console.log(pieData, "--> pie data")
      pieData.reduce((a, b) =>{
          total = parseInt(a.total)+parseInt(b.total)
        })
        console.log(total, "--> same")

        pieData.map((items, index) => {
            
            finalData.push(
                {
                    amount: items.total,
                    key: index,
                    status: items.status,
                    percent: items.total / total * 100,
                    svg: {
                        fill: assignColor(items.status)
                    }

                }
            )
        })
    }

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
             <View>
                    {/* <TextSvg
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[2]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={16}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}

                    </TextSvg> */}
                    <TextSvg
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={16}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.status}

                    </TextSvg>
                    <TextSvg
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[2]}
                        fill={'orange'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {Math.round(data.percent)}%

                    </TextSvg>
             </View>
            )
        })
    }
    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.Visible}
                onRequestClose={props.onRequestClose}>

                <View style={[Style.Shadow, { marginTop: 22, backgroundColor: "transparent", flex: 1, alignItems: "center", justifyContent: "center" }]}>




                    <View style={[Style.Shadow, { backgroundColor: "#423e3e", padding: 0, width: "80%", borderRadius: 10, alignItems: "center", height: "80%", justifyContent: "center" }]}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={props.closeModal}
                                style={{ position: "absolute", top: 20, right: 20 }}>
                                <FontAwesomeIcon icon={faTimes} color={"orange"} />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
                                    source={require('../Assets/icon/avatar.png')} />
                                <Text style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}>{props.employeeName}</Text>
                            </View>

                            <View style={{ alignSelf: "flex-start", padding: 30 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "orange" }}>Email: </Text>
                                    <Text style={{ color: "#fff" }}>{props.email}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Text style={{ color: "orange" }}>Phone: </Text>
                                    <Text style={{ color: "#fff" }}>{props.phone}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Text style={{ color: "orange" }}>Address: </Text>
                                    <Text style={{ color: "#fff" }}>{props.address}</Text>
                                </View>

                                <Text style={{ color: "orange", marginTop: 20 }}>Task Summary:</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, width:"100%" }}>
                                    <PieChart
                                        // outerRadius={'95%'}
                                        valueAccessor={({ item }) => item.amount}
                                        style={{ height: 200, width: 200 }}
                                        data={finalData}
                                        spacing={0}
                                        outerRadius={'95%'}
                                    >
                                        <Labels />
                                    </PieChart>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Text style={{ color: "orange", fontSize: 14, fontWeight: "bold" }}>Project Lists:</Text>
                                    {project.map((items, index)=> {
                                        
                                        let task = items.task_list
                                        return(
                                            <View style={{marginTop: 20, width:"100%"}}>
                                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                                   
                                                    <Text style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}>{items.project_name}</Text>
                                                </View>
                                                
                                                {task.map((task, key) => {
                                                    return(
                                                        <View style={{marginTop: 20, marginLeft: 30}}>
                                                            <View style={{flexDirection:"row"}}>
                                                                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: assignColor(task.status) }} />
                                                                <Text style={{ color: "orange", fontSize: 14, fontWeight: "bold" }}>{task.task_name}</Text>
                                                            </View>
                                                            <Text style={{ color: "#fff", fontSize: 14, marginTop: 5 }}>{task.task_description}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>

                            {/* <TouchableOpacity
                            // onPress={props.Selected.bind(null, 2)}
                            onPress={props.complete}
                            style={{ marginTop: 10, width: "70%", borderRadius: 30, backgroundColor: "green", alignItems: "center", height: "10%", justifyContent: "center", padding: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>MARK AS COMPLETE</Text>
                        </TouchableOpacity> */}

                            {/* </View> */}
                        </ScrollView>
                    </View>

                </View>

            </Modal>
        </View>
    )
}