import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent, RadioButtonComponent } from "../../Components/indexComponent";
import { Rate, SoftSkills } from "../../utils/Options";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Style } from '../../utils/Style';
import axios from 'axios'
import moment from 'moment'
const Evaluation = (props) => {

    const [grit, setGrit] = useState(null)
    const [ownership, setOwnership] = useState(null)
    const [genuine, setGenuine] = useState(null)
    const [mindfullness, setMindfullness] = useState(null)
    const [curiosity, setCuriosity] = useState(null)
    const [comunnication, setCommunication] = useState(null)
    const [personalBranding, setPersonalBranding] = useState(null)
    const [creativity, setCreativity] = useState(null)
    const [array, setArray] = useState([])
    const [employeeDetails, setEmployeeDetails] = useState({})
    const [jobPerformance, setJobPerformance] = useState("")
    const [taskDetails, setTaskDetails] = useState({})
    const [route, setRoute] = useState(null)
    
const selectedRadio = (data, key) => {
    
    if (key === "grit") {
        setGrit(data.key)
    }
    else if (key == "ownership") {
        setOwnership(data.key)
    }
    else if (key == "genuine") {
        setGenuine(data.key)
    }
    else if (key == "mindfullness") {
        setMindfullness(data.key)
    }
    else if (key == "c") {
        setCuriosity(data.key)
    }
    else if (key == "com") {
       setCommunication(data.key)
    }
    else if (key == "pb") {
        setPersonalBranding(data.key)
    }
    else if (key == "cs") {
        setCreativity(data.key)
    }
  
}

useEffect(()=>{
    

    const Route = props.navigation.getParam('route', null) 
    
    if (Route === "employee") {
        const Employee = props.navigation.getParam('employee', null)
        setEmployeeDetails(Employee)
        
    }
    else if(Route === "project"){
        const Task = props.navigation.getParam('taskDetails', null)
        
        setTaskDetails(Task)
    }
    setRoute(Route)
   
},[])

const rendenRadio = (data, key) =>{
    let special = ""

    if(key === "grit"){
        special = grit
    }
    else if(key == "ownership"){
        special = ownership
    }
    else if (key == "genuine") {
        special = genuine
    }
    else if (key == "mindfullness") {
        special = mindfullness
    }
    else if (key == "c") {
        special = curiosity
    }
    else if (key == "com") {
        special = comunnication
    }
    else if (key == "pb") {
        special = personalBranding
    }
    else if (key == "cs") {
        special = creativity
    }
    // 
    

    return(
        <RadioButtonComponent
            onPress={(data)=> selectedRadio(data, key)}
            value={special}
            // storedValue={"exceeds_expectations"}
            options={data}
        />
    )
}

const TextChange = (val) => {
    setJobPerformance(val)
}
const submit = () => {

    const Route = props.navigation.getParam('route', null) 

    if(Route === "employee"){
        axios.post('http://sunday.fitnessforlifetoday.com/api/saveEvaluation', {
            user_id: employeeDetails.id,
            content:
            {
                employee_name: employeeDetails.full_name,
                date_of_evaluation: moment().format('YYYY-DD-MM HH:mm'),
                soft_skills: {
                    grit: grit,
                    ownership: ownership,
                    genuine_concern: genuine,
                    mindfullness: mindfullness,
                    curiosity: curiosity,
                    communication: comunnication,
                    personal_branding: personalBranding,
                    creativity_and_skill_set: creativity
                },
                job_performance: jobPerformance
            }

        })
            .then((response) => {


                if (response.data.error_msg === null) {
                    props.navigation.goBack()
                }
            })
            .catch((err => {

            }))
    }
    else if(Route === "project"){
        
        axios.post('http://sunday.fitnessforlifetoday.com/api/saveTaskEvaluation', {
            task_id: taskDetails.id,
            content:
            {
                task_id: taskDetails.id,
                date_of_evaluation: moment().format('YYYY-DD-MM HH:mm'),
                soft_skills: {
                    grit: grit,
                    ownership: ownership,
                    genuine_concern: genuine,
                    mindfullness: mindfullness,
                    curiosity: curiosity,
                    communication: comunnication,
                    personal_branding: personalBranding,
                    creativity_and_skill_set: creativity
                },
                job_performance: jobPerformance
            }

        })
            .then((response) => {


                if (response.data.error_msg === null) {
                    props.navigation.goBack()
                }
            })
            .catch((err => {

            }))
    }
    
    

}

    const displayText = () => {
        if(route === "employee"){
            return <Text style={{ color: "orange", fontWeight: "bold", fontSize: 18 }}>{employeeDetails.full_name}</Text>
        }
        else if(route === "project"){
            return <Text style={{ color: "orange", fontWeight: "bold", fontSize: 18 }}>{taskDetails.id}</Text>
        }
    }


    return(
        <SafeAreaView style={{ backgroundColor:"#16242a", flex: 1}}>
            <HeaderComponent
                headerText={"Evaluate Employee"}
                Icon={faArrowLeft}
                Toggle={() => props.navigation.goBack()}
            />

          <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{flex: 1}}>
                    <View style={{padding: 20, width:"100%", alignItems:"center", justifyContent:"center"}}>
                        {displayText()}
                    </View>
                    {SoftSkills.map((items, k) => {
                        return (
                            <View style={{ width: "100%", padding: 20 }}>
                                <Text style={{ color: "orange", fontWeight:"bold" }}>{items.text}</Text>
                                {rendenRadio(items.rate, items.key)}
                            </View>
                        )
                    })}
              </View>
              <View style={{width:"100%", alignItems:"center"}}>
                    <Text style={{ color: "orange", fontWeight: "bold" }}>Job Performance:</Text>
                  <TextInput 
                    value={jobPerformance}
                    multiline={true}
                    onChangeText={(val)=> TextChange(val)}
                    style={[Style.Shadow,{backgroundColor:"#fff", padding: 20, width:"80%", height: 200, borderRadius: 20}]}/>
              </View>

              <TouchableOpacity 
                    onPress={()=> submit()}
                    style={{alignSelf:"center", backgroundColor:"green", height: 50, width:"60%", alignItems:"center", justifyContent:"center", borderRadius: 25, marginTop: 20}}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>SUBMIT</Text>
              </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
    )
}

export default connect(null, null)(withNavigation(Evaluation))