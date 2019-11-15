import React, { useState, useEffect } from 'react'
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
const EvaluationDetails = (props) => {

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

    useEffect(() => {
        const Data = props.navigation.getParam('evaluation', null)
        
        setGrit(Data.soft_skills.grit)
        setCommunication(Data.soft_skills.communication)
        setCreativity(Data.soft_skills.creativity_and_skill_set)
        setCuriosity(Data.soft_skills.curiosity)
        setGenuine(Data.soft_skills.genuine_concern)
        setMindfullness(Data.soft_skills.mindfullness)
        setOwnership(Data.soft_skills.ownership)
        setPersonalBranding(Data.soft_skills.personal_branding)
        setJobPerformance(Data.job_performance)
    }, [])


  

    const rendenRadio = (data, key) => {
        let special = ""

        if (key === "grit") {
            special = grit
        }
        else if (key == "ownership") {
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


        return (
            <RadioButtonComponent
                disabled={true}
                onPress={(data) => selectedRadio(data, key)}
                value={special}
                // storedValue={"exceeds_expectations"}
                options={data}
            />
        )
    }

    const TextChange = (val) => {
        setJobPerformance(val)
    }



    return (
        <SafeAreaView style={{ backgroundColor: "#16242a", flex: 1 }}>
            <HeaderComponent
                headerText={"Evaluate Employee"}
                Icon={faArrowLeft}
                Toggle={() => props.navigation.goBack()}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 20, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "orange", fontWeight: "bold", fontSize: 18 }}>{employeeDetails.full_name}</Text>
                    </View>
                    {SoftSkills.map((items, k) => {
                        return (
                            <View style={{ width: "100%", padding: 20 }}>
                                <Text style={{ color: "orange", fontWeight: "bold" }}>{items.text}</Text>
                                {rendenRadio(items.rate, items.key)}
                            </View>
                        )
                    })}
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ color: "orange", fontWeight: "bold" }}>Job Performance:</Text>
                    <TextInput
                        editable={false}
                        value={jobPerformance}
                        multiline={true}
                        onChangeText={(val) => TextChange(val)}
                        style={[Style.Shadow, { backgroundColor: "#fff", padding: 20, width: "80%", height: 200, borderRadius: 20 }]} />
                </View>
{/* 
                <TouchableOpacity
                    onPress={() => submit()}
                    style={{ alignSelf: "center", backgroundColor: "green", height: 50, width: "60%", alignItems: "center", justifyContent: "center", borderRadius: 25, marginTop: 20 }}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>SUBMIT</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default withNavigation(EvaluationDetails)