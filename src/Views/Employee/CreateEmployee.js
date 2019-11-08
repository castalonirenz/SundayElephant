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
        
        setCredentials(prevCredentials => ({ ...prevCredentials, ...tempObj }))
        property === "role_id" ? setModalVisible(false) : null
    }

    useEffect(() => {
        
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
                Selected={(val) => Update('role_id', val)}
                Visible={modalVisible}
                onValueChange={Update.bind(this, 'role_id')}
            />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{ flex: 1, alignItems: "center", backgroundColor: "#16242a" }}>
                    <Image
                        resizeMode="contain"
                        style={{ width: 200 }}
                        source={require('../../Assets/icon/logo.png')} />

                    <TextInput
                        placeholder="Email:"
                         placeholderTextColor="#fff"
                        onChangeText={Update.bind(this, 'email')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            color:"#fff",
                        }}
                    />

                    <TextInput
                        placeholder="Name:"
                        placeholderTextColor="#fff"
                        onChangeText={Update.bind(this, 'full_name')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20,
                            color:"#fff",
                        }}
                    />

                    <TextInput
                        placeholder="Address:"
                         placeholderTextColor="#fff"
                        onChangeText={Update.bind(this, 'address')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20,
                            color:"#fff",
                        }}
                    />

                    <TextInput
                        placeholder="Phone No:"
                         placeholderTextColor="#fff"
                        keyboardType={"phone-pad"}
                        onChangeText={Update.bind(this, 'phone_no')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20,
                            color:"#fff",
                        }}
                    />

                    <TouchableOpacity
                        style={{ flexDirection: "row", width: "80%", padding: 10, alignItems: "center", justifyContent: "space-between", marginTop: 20 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 16, color:"#fff" }}>
                            {credentials.role_id === null ? "Select Account Role" : credentials.role_id === 1 ? "Admin" : "Normal User"}
                        </Text>

                        <FontAwesomeIcon icon={faCaretDown} color={"#fff"}/>


                    </TouchableOpacity>



                    <TextInput
                        placeholder="Username:"
                        placeholderTextColor="#fff"
                        onChangeText={Update.bind(this, 'username')}
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20,
                            color:"#fff"
                        }}
                    />
                    <TextInput
                        placeholder="Password:"
                        onChangeText={Update.bind(this, 'password')}
                        secureTextEntry={true}
                        placeholderTextColor="#fff"
                        style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            width: "80%",
                            marginTop: 20,
                            color:"#fff"
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