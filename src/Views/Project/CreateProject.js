import React, { useState, useEffect } from "react";
import { TextInput, Text, TouchableOpacity, SafeAreaView, Image, Picker, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { ModalComponent, DatePickerComponent } from "../../Components/indexComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { addStaff } from "../../Redux/Action/Staff";
import { DatePicker } from 'native-base';
import { addProject } from "../../Redux/Action/Project";
import { HeaderComponent } from "../../Components/indexComponent";
import moment from 'moment'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CreateProject = (props) => {
    const [project, setProject] = useState({
        project_name: null,
        project_description: null,
        start_date: moment().add().toDate(),
        end_date: (moment().add(4, 'days')).toDate(),
        start_time: moment().toDate(),
        end_time: moment().toDate(),

    })

    const [startDate, showStartDate] = useState(false)
    const [startTime, showStartTime] = useState(false)

    const [endDate, showEndDate] = useState(false)
    const [endTime, showEndTime] = useState(false)

    const Update = (property, action, date) => {
        console.log(property, "--> action")
        date === undefined ? showStartDate(false) : null
        date === undefined ? showStartTime(false) : null

        date === undefined ? showEndDate(false) : null
        date === undefined ? showEndTime(false) : null
        if (property === "project_name") {
            console.log('here')
            let tempObj = project
            tempObj[property] = action
            setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
        }
        if (action.type === "set") {
            console.log('set')
            if (property === "start_date") {
                console.log(moment(date).isAfter(project.end_date))
                if (moment(date).isAfter(project.end_date)) {
                    alert('Start date must not overlap end date')
                    showStartDate(false)
                    showEndDate(false)
                    showStartTime(false)
                    showEndTime(false)
                }
                else if (moment(date).isBefore(project.start_date)) {
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
        }
        else if (action.type === "dismissed") {
            showStartDate(false)
            showEndDate(false)
            showStartTime(false)
            showEndTime(false)
        }

    }

    useEffect(() => {
        console.log(project, "effects")
    })


    const addNewProject = () => {
        if(!project.project_name){
            alert('project name is required')
        }
        else if(project.project_name){
            props.AddProject(project)
            .then(success => {
                success ? props.navigation.goBack() : null
            })
        }
      
        
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <HeaderComponent
                Icon={faArrowLeft}
                Toggle={()=> props.navigation.goBack()}
            />

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



            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, alignItems: "center", backgroundColor: "#16242a" }}>
                    <Image
                        resizeMode="contain"
                        style={{ width: 150, height: 150, marginTop: 20 }}
                        source={require('../../Assets/icon/job.png')} />

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

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>


                        <View style={{ width: "40%" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Start Date</Text>
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: "#fff", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                                onPress={() => showStartDate(true)}
                            >
                                <Text >{project.start_date === null ? "Start Date" : project.start_date.toDateString()}</Text>
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
                                <Text >{project.end_date === null ? "End Date" : project.end_date.toDateString()}</Text>
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

                    <TouchableOpacity
                        style={{ width: "80%", backgroundColor: "orange", justifyContent: "center", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" }}
                        onPress={() => addNewProject()}
                    >
                        <Text style={{fontSize: 16, color:"#fff", fontWeight:"bold"}}>Add Project</Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        AddStaff: (info) => dispatch(addStaff(info)),
        AddProject: (project) => dispatch(addProject(project))
    }
}

export default connect(null, mapDispatchToProps)(withNavigation(CreateProject))