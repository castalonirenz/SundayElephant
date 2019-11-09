import React, { useState, useEffect } from "react";
import { TextInput, Text, TouchableOpacity, SafeAreaView, Image, Picker, View, ScrollView, Platform, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { ModalComponent, DatePickerComponent } from "../../Components/indexComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { addStaff } from "../../Redux/Action/Staff";
import { DatePicker } from 'native-base';
import { addTask } from "../../Redux/Action/Task";
import { HeaderComponent } from "../../Components/indexComponent";
import moment from 'moment'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { projectDetails } from "../../Redux/Action/Project";
const CreateTasks = (props) => {
    const [project, setProject] = useState({
        project_name: null,
        project_description: null,
        start_date: moment().add().toDate(),
        end_date: (moment().add(4, 'days')).toDate(),
        start_time: moment().toDate(),
        end_time: moment().toDate(),
        user_id: null,
        project_id: props.navigation.getParam('project_id', null)

    })

    const [userList, setUserList] = useState(false)

    const [startDate, showStartDate] = useState(false)
    const [startTime, showStartTime] = useState(false)

    const [endDate, showEndDate] = useState(false)
    const [endTime, showEndTime] = useState(false)

    const Update = (property, action, date) => {
        
        
        
        date === undefined ? showStartDate(false) : null
        date === undefined ? showStartTime(false) : null

        date === undefined ? showEndDate(false) : null
        date === undefined ? showEndTime(false) : null
        if (property === "project_name" || property === "project_description" || property === "user_id") {
            
            let tempObj = project
            tempObj[property] = action
            setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
        }
        if (action.type === "set" || Platform.OS === "ios") {
            
            if (property === "start_date") {
                
                if (moment(date).isAfter(project.end_date)) {
                    alert('Start date must not overlap end date')
                    showStartDate(false)
                    showEndDate(false)
                    showStartTime(false)
                    showEndTime(false)
                }
                else {
                    let tempObj = project
                    tempObj[property] = date
                    showStartDate(false)
                    showEndDate(false)
                    showStartTime(false)
                    showEndTime(false)
                    setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
                }
            }
            else if (property === "end_date") {
                if (moment(date).isBefore(project.start_date)) {
                    alert('End date must not overlap start date')
                    showStartDate(false)
                    showEndDate(false)
                    showStartTime(false)
                    showEndTime(false)
                }
                else {
                    
                    let tempObj = project
                    tempObj[property] = date
                    showStartDate(false)
                    showEndDate(false)
                    showStartTime(false)
                    showEndTime(false)
                    setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
                }
            }
            else if (property === "start_time" || property === "end_time") {
                let tempObj = project
                tempObj[property] = date
                showStartDate(false)
                showEndDate(false)
                showStartTime(false)
                showEndTime(false)
                setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
            }
        }
        else if (action.type === "dismissed") {
            showStartDate(false)
            showEndDate(false)
            showStartTime(false)
            showEndTime(false)
        }
        // if(Platform.OS === "ios"){
        //     showStartDate(false)
        //     showEndDate(false)
        //     showStartTime(false)
        //     showEndTime(false)
        // }

    }

    useEffect(() => {
        console.log(project, "--> task details")
        axios.post('http://sunday.fitnessforlifetoday.com/api/showTask')
            .then((response) => {

                
                setUserList(response.data.data)
              
            })
            .catch((err => {

               alert('error getting employee list')
            }))
    }, [project.user_id])


    const addNewProject = () => {
        if (!project.project_name) {
            alert('project name is required')
        }
        else if (project.project_name) {
            props.AddTask(project)
                .then(success => {
                    props.loadProjectDetaisl(project.project_id)
                    success ? props.navigation.goBack() : null
                })
        }


    }

    const RenderItem = ({ item }) => {
        
        return (
            <TouchableOpacity
                onPress={() => Update("user_id",item.id)}
                style={{ padding: 10, flexDirection: "row", alignItems: "center", borderRadius: 10,borderWidth: item.id === project.user_id ? 5 : 0, borderColor: item.id === project.user_id ? "orange" : null  }}>
                <Image
                    resizeMode="contain"
                    style={{ width: 100, height: 100, borderRadius: 50, borderColor: "orange" }}
                    source={require('../../Assets/icon/avatar.png')}
                />
                <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 20, color: "green" }}>
                    {item.full_name}
         
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <HeaderComponent
                headerText={"Create Task"}
                Icon={faArrowLeft}
                Toggle={() => props.navigation.goBack()}
            />




            {/* <ScrollView style={{ width: "100%" }} contentContainerStyle={{ flexGrow: 1 }}> */}
                <View style={{ flex: 1, alignItems: "center", backgroundColor: "#16242a" }}>
                

                    <TextInput
                        placeholder="Enter Project Name:"
                        onChangeText={Update.bind(this, 'project_name')}
                        style={{
                            borderBottomWidth: 0.5,
                            marginTop: 20,
                            fontSize: 16,
                            fontWeight: "bold",
                            width: "90%",
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            padding: 10
                        }}
                    />

                    <TextInput
                        placeholder="Enter Project Description:"
                        onChangeText={Update.bind(this, 'project_description')}
                        style={{
                            borderBottomWidth: 0.5,
                            marginTop: 20,
                            fontSize: 16,
                            fontWeight: "bold",
                            width: "90%",
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            padding: 10
                        }}
                    />

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>


                        <View style={{ width: "40%" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Start Date</Text>
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: "#fff", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                                onPress={() => showStartDate(true)}
                            >
                                <Text
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}
                                >{project.start_date === null ? "Start Date" : project.start_date.toDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "40%" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Start Time</Text>
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: "#fff", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                                onPress={() => showStartTime(true)}
                            >
                                <Text>{project.start_date === null ? "Start Date" : moment(project.start_time).format('HH:mm')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10, marginTop: 10 }}>


                        <View style={{ width: "40%" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>End Date</Text>
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: "#fff", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                                onPress={() => showEndDate(true)}
                            >
                                <Text
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}
                                >{project.end_date === null ? "End Date" : project.end_date.toDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "40%" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>End Time</Text>
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: "#fff", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                                onPress={() => showEndTime(true)}
                            >
                                <Text >{project.end_time === null ? "End Time" : moment(project.end_time).format('HH:mm')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{height: "30%", width:"80%"}}>
                        <Text style={{fontSize: 16, fontWeight:"bold", color:"orange"}}>Select Employee</Text>
                        <FlatList
                        
                            data={userList}
                            renderItem={RenderItem.bind(this)}
                            // extraData={props.ProjectList}
                        // keyExtractor={item => item.id}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ width: "80%", backgroundColor: "orange", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                        onPress={() => addNewProject()}
                    >
                        <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>Create Task</Text>
                    </TouchableOpacity>



                </View>
            {/* </ScrollView> */}

            {startDate ? <DatePickerComponent

                // onCancel={() => }
                mode="date"
                dateTimeVisible={startDate}
                value={project.start_date}
                onChange={Update.bind(this, "start_date")}
            />
                : null}

            {startTime ? <DatePickerComponent

                // onCancel={() => }
                mode="time"
                dateTimeVisible={startTime}
                value={project.start_time}
                onChange={Update.bind(this, "start_time")}
            />
                : null}

            {endDate ? <DatePickerComponent

                // onCancel={() => }
                mode="date"
                dateTimeVisible={endDate}
                value={project.end_date}
                onChange={Update.bind(this, "end_date")}
            />
                : null}

            {endTime ? <DatePickerComponent

                // onCancel={() => }
                mode="time"
                dateTimeVisible={endTime}
                value={project.end_time}
                onChange={Update.bind(this, "end_time")}
            />
                : null}
        </SafeAreaView>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        AddTask: (task) => dispatch(addTask(task)),
        loadProjectDetaisl: (id) => dispatch(projectDetails(id))
    }
}

export default connect(null, mapDispatchToProps)(withNavigation(CreateTasks))