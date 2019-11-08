import React, { useState, useEffect } from "react";
import { TextInput, Text, TouchableOpacity, SafeAreaView, Image, Picker, View , ScrollView} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { ModalComponent } from "../../Components/indexComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { addStaff } from "../../Redux/Action/Staff";
const CreateEmployee = (props) => {
    const [credentials, setCredentials] = useState({
        email: null,
        full_name: null,
        address: null,
        phone_no: null,
        username: null,
        password: null,
        role_id: null

    })

    const [modalVisible, setModalVisible] = useState(false)
    const Update = (property, val) => {

        let tempObj = credentials
        tempObj[property] = val
        console.log(tempObj, "--> before merge", property)
        setCredentials(prevCredentials => ({ ...prevCredentials, ...tempObj }))
        property === "role_id" ? setModalVisible(false) : null
    }

    useEffect(() => {
        console.log(credentials.role_id, 'use effect', [])
    })


    const register = () => {
        props.AddStaff(credentials)
        .then(success => {
            success ? props.navigation.goBack() : alert('creation failed')
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ModalComponent
                Visible={modalVisible}
                selectedValue={credentials.role_id}
                onValueChange={Update.bind(this, 'role_id')}
            />
        <ScrollView>
            <View style={{flex: 1, alignItems:"center"}}>
                    <Image
                        resizeMode="contain"
                        style={{ width: 200 }}
                        source={require('../../Assets/icon/logo.png')} />

                    <TextInput
                        placeholder="Email:"
                        onChangeText={Update.bind(this, 'email')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%"
                        }}
                    />

                    <TextInput
                        placeholder="Name:"
                        onChangeText={Update.bind(this, 'full_name')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20
                        }}
                    />

                    <TextInput
                        placeholder="Address:"
                        onChangeText={Update.bind(this, 'address')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20
                        }}
                    />

                    <TextInput
                        placeholder="Phone No:"
                        keyboardType={"phone-pad"}
                        onChangeText={Update.bind(this, 'phone_no')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20
                        }}
                    />

                    <TouchableOpacity
                        style={{ flexDirection: "row", width: "80%", padding: 10, alignItems: "center", justifyContent: "space-between", marginTop: 20 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {credentials.role_id === null ? "Select Account Role" : credentials.role_id === 1 ? "Admin" : "Normal User"}
                        </Text>

                        <FontAwesomeIcon icon={faCaretDown} />


                    </TouchableOpacity>



                    <TextInput
                        placeholder="Username:"
                        onChangeText={Update.bind(this, 'username')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20
                        }}
                    />
                    <TextInput
                        placeholder="Password:"
                        onChangeText={Update.bind(this, 'password')}
                        secureTextEntry={true}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20
                        }}
                    />


                    <View style={{ alignSelf: "flex-end", marginTop: 10, marginRight: 30 }}>
                        <TouchableOpacity
                            onPress={()=>register()}
                            style={{ backgroundColor: "#c5c5c5", padding: 15, borderRadius: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>CREATE</Text>
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

export default connect(null, mapDispatchToProps)(withNavigation(CreateEmployee))