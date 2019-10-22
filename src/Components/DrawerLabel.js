import { View, TouchableOpacity } from "react-native";
import React , { Component, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCog, faArrowRight, faChevronCircleRight, faArrowLeft, faFile, faArchive, faUser, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { NavigationActions } from "react-navigation";
import { DrawerLabel } from "../Themes/StyledComponent";



export const renderLabel = (navigation) => {
    const [selection, setSelection] = useState('Home')
    if (selection === "Home") {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faHome} size={20} color={selection === "Home" ? "#f0134d" : "#000"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel size="12px">Home</DrawerLabel>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelection('Bills')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <FontAwesomeIcon icon={faFile} size={20} color={"#f0134d"} />
                            <View style={{ marginLeft: 5, }}>
                                <DrawerLabel color={selection === "Settings" ? "orange" : "#000"}>Bills</DrawerLabel>
                            </View>
                        </View>

                        <FontAwesomeIcon icon={faChevronCircleRight} size={20} color={selection === "Settings" ? "orange" : "#000"} />

                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelection('Profile')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <FontAwesomeIcon icon={faUser} size={20} color={"#f0134d"} />
                            <View style={{ marginLeft: 5, }}>
                                <DrawerLabel color={selection === "Settings" ? "orange" : "#000"}>Profile</DrawerLabel>
                            </View>
                        </View>

                        <FontAwesomeIcon icon={faChevronCircleRight} size={20} color={selection === "Settings" ? "orange" : "#000"} />

                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    if (selection === "Bills") {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <TouchableOpacity
                    onPress={() => setSelection('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={10} color={selection === "Home" ? "orange" : "#000"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={"#000"} size="10px">Back</DrawerLabel>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelection('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faFile} size={20} color={"#f0134d"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={selection === "Home" ? "#f0134d" : "#000"}>Current Bill</DrawerLabel>
                    </View>
                </TouchableOpacity>

                
                <TouchableOpacity
                    onPress={() => setSelection('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faArchive} size={20} color={"#f0134d"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={selection === "Home" ? "#f0134d" : "#000"}>Past Bill</DrawerLabel>
                    </View>
                </TouchableOpacity>


                {/* admin items */}

                <TouchableOpacity
                    onPress={() => navigation.navigate('Create')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faPlusSquare} size={20} color={"#f0134d"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={selection === "Home" ? "#f0134d" : "#000"}>Create Bill</DrawerLabel>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelection('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faFile} size={20} color={"#f0134d"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={selection === "Home" ? "#f0134d" : "#000"}>Update Bill</DrawerLabel>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelection('Home')}
                    // onPress={() => props.navigation.navigate('DrawerLandingPage')}
                    style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", padding: 10 }}>
                    <FontAwesomeIcon icon={faFile} size={20} color={"#f0134d"} />
                    <View style={{ marginLeft: 5, }}>
                        <DrawerLabel color={selection === "Home" ? "#f0134d" : "#000"}>List</DrawerLabel>
                    </View>
                </TouchableOpacity>



            </View>
        )
    }
}