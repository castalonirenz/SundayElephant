import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent, TaskModal } from '../../Components/indexComponent';
import { Style } from "../../utils/Style";
import { loadProjects, projectDetails } from "../../Redux/Action/Project";
import { connect } from "react-redux";
import axios from 'axios'
import { TaskDetails } from '../../Components/Modal';
import { ScrollView } from 'react-native-gesture-handler';
const ProjectDetails = (props) => {
    const projectDetails = props.navigation.getParam('project', null)
    const [project, setProject] = useState(projectDetails)
    // const [remainingHours, setRemainingHours] = useState(props.Project.remainingHours)
    // const [totalHours, setTotalHours] = useState(props.Project.totalHours)
    const [taskDetails, setTaskDetails] = useState({})
    const [showTasks, setShowTasks] = useState(false)
    useEffect(() => {
        console.log(props.Project, "--> from redux store")

        getDetails()
    }, [])

    const getDetails = () => {
        const projectDetails = props.navigation.getParam('project', null)
        props.getProjectDetails(projectDetails.id)
  
    }

    const colorIndicator = (status) => {
        if (status === "ongoing") {
            return "#4287f5"
        }
        else if (status === "done") {
            return "green"
        }
        else if (status === "incoming") {
            return "transparent"
        }
        else if (status === "incomplete") {
            return "red"
        }
    }

    const createTask = () => {
        props.navigation.navigate('CreateTask', 
            {project_id: project.id}
        )
    }

    const openTask = (item) => {
        setShowTasks(true)
        axios.post('http://sunday.fitnessforlifetoday.com/api/viewTask', {
            task_id: item.id
        })
            .then((response) => {
                console.log(response.data.data, '--> viewing task')
                setTaskDetails(response.data.data)

            })
            .catch((err => {

                alert('Error getting project details')
            }))
    }

    const Task = (props) => {

        let ArrayShit = props.tasksData
        let TaskComponent =
            ArrayShit.map((items, index) => (
                <TouchableOpacity
                        onPress={()=> openTask(items)}
                style={{ width: "100%", padding: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colorIndicator(items.status) }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: "bold", color: "orange", fontSize: 20 }}>{items.task_name}</Text>
                            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 10 }}>
                                {items.status}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))

        return (
            // <Text>test</Text>
            <View>
                {TaskComponent}
            </View>
        )
    }


    const UpdateStatus = (status) => {
        // 
        axios.post('http://sunday.fitnessforlifetoday.com/api/updateProjectStatus', {
            project_id: project.id,
            status: status
        })
            .then((response) => {
                props.loadProject()
                props.navigation.goBack()

            })
            .catch((err => {

                alert('Error updating project details')
            }))
    }

    const updateTaskStatus = () => {
        console.log(taskDetails.task_id, "task id")
        axios.post('http://sunday.fitnessforlifetoday.com/api/updateTaskStatus', {
            task_id: taskDetails.id,
            status: "done"
        })
            .then((response) => {
                console.log(response.data.data)

                props.getProjectDetails(projectDetails.id)
                setShowTasks(false)
            })
            .catch((err => {
                console.log(err)
                alert('Error updating task details')
            }))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16242a" }}>
            <HeaderComponent
                headerText="Project Details"
                Icon={faArrowLeft}
                Toggle={() => props.navigation.goBack()}
            />

            <TaskModal
                Visible={showTasks}
                // Visible={task}
                taskName={taskDetails.task_name}
                taskDetails={taskDetails.task_description}
                status={taskDetails.status}
                startDate={taskDetails.start_date}
                endDate={taskDetails.end_date}
                employeeName={taskDetails.full_name}
                closeModal={()=>setShowTasks(false)}
                ononRequestClose={()=>setShowTasks(false)}
                complete={()=> updateTaskStatus()}
            />

        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{width:"100%"}}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", padding: 20, alignItems: "center", width: "100%" }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../../Assets/icon/job.png')} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: "bold", color: "orange", fontSize: 20 }}>{project.project_name}</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: "orange", fontSize: 16 }}>{project.status}</Text>
                                <Text style={{ color: "#fff", fontSize: 16 }}>Remaining hours: {props.Project.remainingHours}</Text>
                                <Text style={{ color: "#fff", fontSize: 16 }}>Total hours: {props.Project.totalHours}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                        <View>
                            <Text style={{ fontSize: 16, color: "orange" }}>From</Text>
                            <Text style={{ fontSize: 16, color: "#fff" }}>{project.start_date}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, color: "orange" }}>To</Text>
                            <Text style={{ fontSize: 16, color: "#fff" }}>{project.start_date}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => UpdateStatus('done')}
                        style={{ width: "60%", padding: 15, borderRadius: 25, backgroundColor: "green", alignSelf: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>MARK AS COMPLETE</Text>
                    </TouchableOpacity>

                    <View style={{ width: "100%", padding: 10 }}>
                        <Text style={{ fontWeight: "bold", color: "orange", fontSize: 20, marginLeft: 20 }}>Tasks:</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ borderColor: "#fff", height: 10, width: 10, borderWidth: 1, borderRadius: 5, marginRight: 5 }} />
                                    <Text style={{ fontSize: 16, color: "orange" }}>Incoming</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#4287f5", height: 10, width: 10, borderWidth: 1, borderRadius: 5, marginRight: 5 }} />
                                    <Text style={{ fontSize: 16, color: "orange" }}>Ongoing</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "green", height: 10, width: 10, borderWidth: 1, borderRadius: 5, marginRight: 5 }} />
                                    <Text style={{ fontSize: 16, color: "orange" }}>Done</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "red", height: 10, width: 10, borderWidth: 1, borderRadius: 5, marginRight: 5 }} />
                                    <Text style={{ fontSize: 16, color: "orange" }}>Incomplete</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Task tasksData={props.Project.tasks} />

                </View>
        </ScrollView>
            <TouchableOpacity
                onPress={() => createTask()}
                style={[Style.Shadow, {
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "orange",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 20,
                    right: 20
                }]}>
                <FontAwesomeIcon icon={faPlus} color={"#fff"} />
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const mapStateToProps = state => {
    return{
        Project: state.Project
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProject: () => dispatch(loadProjects()),
        getProjectDetails: (id) => dispatch(projectDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)