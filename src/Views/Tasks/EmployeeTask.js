import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { HeaderComponent, TaskModal } from "../../Components/indexComponent";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'

const EmployeeTask = (props) => {

    const [taskList, setTaskList] = useState([])
    const [showTasks, setShowTasks] = useState(false)
    const [taskDetails, setTaskDetails] = useState({})
    const [evaluation, setEvaluation] = useState([])
    const getTask = () => {
        axios.post('http://sunday.fitnessforlifetoday.com/api/taskList', {
           user_id: props.Credentials.id
        })
            .then((response) => {
                    
                    setTaskList(response.data.data)
            })
            .catch((err => {

          
            }))
    }


    useEffect(()=>{
        getTask()
        // getEvaluation()
    },[])

    const colorIndicator = (status) => {
        if (status === "ongoing") {
            return "#4287f5"
        }
        else if (status === "done") {
            return "green"
        }
        else if (status === "incoming") {
            return "#fff"
        }
        else if (status === "incomplete") {
            return "red"
        }
    }

 

    const openTask = (item) => {``
        
        setShowTasks(true)
        axios.post('http://sunday.fitnessforlifetoday.com/api/viewTask', {
            task_id: item.id
        })
            .then((response) => {
                
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
                    onPress={() => openTask(items)}
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

    const updateTaskStatus = () => {
        
        axios.post('http://sunday.fitnessforlifetoday.com/api/updateTaskStatus', {
            task_id: taskDetails.id,
            status: "done"
        })
            .then((response) => {
                

                // props.getProjectDetails(projectDetails.id)
                setShowTasks(false)
            })
            .catch((err => {
                
                alert('Error updating task details')
            }))
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a"}}>
            <HeaderComponent
                headerText={"Sunday Elephant"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <TaskModal
                Visible={showTasks}
                // Visible={task}
                taskName={taskDetails.task_name}
                taskDetails={taskDetails.task_description}
                status={taskDetails.status}
                startDate={taskDetails.start_date}
                endDate={taskDetails.end_date}
                completion={taskDetails.status === "done" ? taskDetails.updated_at : '-----'}
                assignee={taskDetails.username}
                employeeName={taskDetails.full_name}
                closeModal={() => setShowTasks(false)}
                ononRequestClose={() => setShowTasks(false)}
                complete={() => updateTaskStatus()}
            />

            <Task tasksData={taskList} />
        </SafeAreaView>
    )
}


const mapStateToProps = state => {
    return {
        Credentials: state.Credentials.info
    }
}


export default connect(mapStateToProps, null)(withNavigation(EmployeeTask))
