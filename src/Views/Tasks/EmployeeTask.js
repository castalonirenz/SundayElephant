import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { HeaderComponent } from "../../Components/indexComponent";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'
const EmployeeTask = (props) => {

    const [taskList, setTaskList] = useState([])

    const getTask = () => {
        axios.post('http://sunday.fitnessforlifetoday.com/api/taskList', {
           user_id: props.Credentials.id
        })
            .then((response) => {
                    console.log(response.data.data, "--> eto un")
                    setTaskList(response.data.data)
            })
            .catch((err => {

          
            }))
    }


    useEffect(()=>{
        getTask()
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


    const Task = (props) => {

        let ArrayShit = props.tasksData
        let TaskComponent =
            ArrayShit.map((items, index) => (
                <TouchableOpacity
                    // onPress={() => openTask(items)}
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

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a"}}>
            <HeaderComponent
                headerText={"Sunday Elephant"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
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
