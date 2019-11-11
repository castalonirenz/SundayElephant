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
//     const array =  {
//         content: [
//             employee_id,
//             period,
//             position,
//             date_of_evaluation,
//             soft_skills: [
//                 grit: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 ownership: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 genuine_concern: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 mindfullness: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 curiosity: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 communication: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },


//                 personal_branding: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 creativity_and_skill_set: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//                 personal_branding: {
//                     outstanding,
//                     exceeds_expectations,
//                     meets_expectations,
//                     below_expectations,
//                     unsatisfactory,
//                 },
//             ], // end of skill set
//             job_performance: ]
//   { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },
//     { account, project, scope_of_work },  n     fngjjrjjj
// ],
// employee_strengths_and_accomplishments,
//     plan_of_action_towards_improvement,
//     new_skillset,
//     employee_comments,
// ] // end of content

const selectedRadio = (data, key) => {
    console.log(key, "-->", data)
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
    console.log(grit)
    const Employee = props.navigation.getParam('employee', null)
  
    setEmployeeDetails(Employee)
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
    // console.log(key, "--> key", special)
    

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
    console.log('here?')
    axios.post('http://sunday.fitnessforlifetoday.com/api/saveEvaluation', {
        content:[
            {
                employee_id: employeeDetails.id,
                employee_name: employeeDetails.full_name,
                date_of_evaluation: moment().format('YYYY-DD-MM HH:mm'),
                soft_skills:{
                    grit: grit.text,
                    ownership: ownership.text,
                    genuine_concern: genuine.text,
                    mindfullness: mindfullness.text,
                    curiosity: curiosity.text,
                    communication: comunnication.text,
                    personal_branding: personalBranding.text,
                    creativity_and_skill_set: creativity.text
                },
                   job_performance: jobPerformance
            }
        ]
    })
        .then((response) => {

          console.log(response)
        })
        .catch((err => {
            console.log(err, "--> error submitting")
        }))

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
                        <Text style={{ color: "orange", fontWeight: "bold", fontSize: 18 }}>{employeeDetails.full_name}</Text>
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