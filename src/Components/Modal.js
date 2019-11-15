import React, { useState, useEffect } from "react";
import { Modal, View, Picker, Alert, TouchableHighlight, Dimensions, TouchableOpacity, SafeAreaView, Image, FlatList, Text, ScrollView } from "react-native";
import { Style } from "../utils/Style";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWindowClose, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PieChart } from 'react-native-svg-charts'
const { width } = Dimensions.get('screen')
import { TextSvg } from "../utils/Text";
import axios from 'axios'
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

    const [task, setTask] = useState({})
    
    
    useEffect(()=> {
        
        if (props.status === "done" || props.status !== undefined) {
            
            axios.post('http://sunday.fitnessforlifetoday.com/api/taskEvaluation', {
                task_id: props.id
            })
                .then((response) => {
                    
                    
                    setTask(response.data.data)

                })
                .catch((err => {
                    
                    alert('Error getting task details')
                }))
        }
    }, [props.id])


    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
    
            return (
             

                    <TextSvg
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {Math.round(data.percent)}%
                      
                         {/* <Text>{data.percent}</Text> */}
                    </TextSvg>
       
            )
        })
    }


    const Pie = () => {
        let finalData = []
        

            //   overAll.reduce((a, b) =>{
            //       total = parseInt(a.total)+parseInt(b.total)
            //     })

            let total = task.communication + task.creativity_and_skill_set + task.curiosity + task.genuine_concern + task.grit + task.mindfullness + task.ownership + task.personal_branding
            
            finalData.push(
                {
                    amount: task.communication,
                    key: 0,
                    percent: task.communication / total * 100,
                    svg: {
                        fill: "orange"
                    }

                }
            )
            finalData.push(
                {
                    amount: task.creativity_and_skill_set,
                    key: 1,
                    percent: task.creativity_and_skill_set / total * 100,
                    svg: {
                        fill: "green"
                    }

                }
            )
            finalData.push(
                {
                    amount: task.curiosity,
                    key: 2,
                    percent: task.curiosity / total * 100,
                    svg: {
                        fill: "blue"
                    }

                }
            )
            finalData.push(
                {
                    amount: task.genuine_concern,
                    key: 3,
                    percent: task.genuine_concern / total * 100,
                    svg: {
                        fill: "yellow"
                    }

                }
            )
            finalData.push(
                {
                    amount: task.grit,
                    key: 4,
                    percent: task.grit / total * 100,
                    svg: {
                        fill: "red"
                    }

                }
            )
        finalData.push(
            {
                amount: task.mindfulness,
                key: 4,
                percent: task.mindfullness / total * 100,
                svg: {
                    fill: "pink"
                }

            }
        )
        finalData.push(
            {
                amount: task.ownership,
                key: 4,
                percent: task.ownership / total * 100,
                svg: {
                    fill: "brown"
                }

            }
        )
        finalData.push(
            {
                amount: task.personal_branding,
                key: 4,
                percent: task.personal_branding / total * 100,
                svg: {
                    fill: "violet"
                }

            }
        )

        
        return (
            <PieChart
                // outerRadius={'95%'}
                valueAccessor={({ item }) => item.amount}
                style={{ height: 200, width: 200 }}
                data={finalData}
                spacing={0}
                outerRadius={'95%'}
            >
                {/* <Text style={{ fontSize: 18, color: "orange", fontWeight: "bold", alignSelf:"center", top: 80 }}>50%</Text> */}
                <Labels />

            </PieChart>
        )
    }



    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.Visible}
                onRequestClose={props.onRequestClose}>
                <View style={[Style.Shadow, { marginTop: 22, backgroundColor: "transparent", flex: 1, alignItems: "center", justifyContent: "center" }]}>



                    <View style={[Style.Shadow, { backgroundColor: "#423e3e", padding: 0, width: "80%", borderRadius: 10, alignItems: "center", height:"80%", justifyContent: "center" }]}>
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
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "orange" }}>Completion: </Text>
                                <Text style={{ color: "#fff" }}>{props.completion}</Text>
                            </View>

                    <Text style={{ color: "orange", marginTop: 20 }}>Assigned to: {props.assignee}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                <FlatList
                                    renderItem={props.renderItem}
                                    extraData={props.extraData}
                                    data={props.data}
                                />
                            </View>
                        </View>

                        {props.status !== "done" ? <TouchableOpacity
                            // onPress={props.Selected.bind(null, 2)}
                            onPress={props.complete}
                            style={{ marginTop: 10, width: "70%", borderRadius: 30, backgroundColor: "green", alignItems: "center", height: "10%", justifyContent: "center", padding: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>MARK AS COMPLETE</Text>
                        </TouchableOpacity> : null}

                        {props.status === "done" || task!== null ? <Pie/> : null}
                        {props.status === "done" ?
                        <View>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "orange" }} />

                                    <Text style={{color:"#fff", marginLeft: 10}}>Communication</Text>
                            </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "green" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Creativity and Skill Set</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "blue" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Curiosity</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "yellow" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Genuine Concern</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "red" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Grit</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "pink" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Mindfullness</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "brown" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Ownership</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 15, width: 15, backgroundColor: "violet" }} />

                                    <Text style={{ color: "#fff", marginLeft: 10 }}>Personal Branding</Text>
                                </View>
                        </View>
                        : null}
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
        
      pieData.reduce((a, b) =>{
          total = parseInt(a.total)+parseInt(b.total)
        })
        

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