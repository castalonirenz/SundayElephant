import React, { useState, useEffect } from "react";
import { TextInput, Text, TouchableOpacity, SafeAreaView, Image, Picker, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { ModalComponent , DatePickerComponent} from "../../Components/indexComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { addStaff } from "../../Redux/Action/Staff";
import { DatePicker } from 'native-base';
import moment from 'moment'
const CreateProject = (props) => {
    const [project, setProject] = useState({
        project_name: null,
        project_description: null,
        start_date: moment().toDate(),
        end_date: null

    })
    const [startDate, showStartDate] = useState(false)
    const [endDate, showEndDate] = useState(false)

    const Update = (property, val, date) => {
        
        date === undefined ? showStartDate(false) : null
        // let tempObj = project
        // tempObj[property] = val
        // setProject(prevCredentials => ({ ...prevCredentials, ...tempObj }))
    }

    useEffect(() => {
        
    })


    const register = () => {
        props.AddStaff(project)
            .then(success => {
                success ? props.navigation.goBack() : alert('creation failed')
            })
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>

            {startDate ? <DatePickerComponent

                // onCancel={() => }
                dateTimeVisible={startDate}
                value={project.start_date}
                onChange={Update.bind(this, "start_date")}
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
                            padding: 10,
                            fontSize: 16,
                            fontWeight: "bold",
                            width: "90%",
                            backgroundColor:"#fff",
                            borderRadius: 10,
                            padding: 15
                        }}
                    />

                    <View style={{width:"100%", flexDirection:"row", justifyContent:"space-around",  padding: 10}}>

                  
                            <TouchableOpacity
                                style={{width:"40%", backgroundColor:"#fff", alignItems:"center", justifyContent:"center", borderRadius: 10, marginTop: 20, padding: 15}}
                                onPress={()=> showStartDate(true)}
                                >
                                <Text style={{width:"40%"}}>{project.start_date === null ? "Start Date" : "boom"}</Text>
                            </TouchableOpacity>
           
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        AddStaff: (info) => dispatch(addStaff(info))
    }
}

export default connect(null, mapDispatchToProps)(withNavigation(CreateProject))