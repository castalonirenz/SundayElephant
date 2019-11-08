import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, ListView } from "react-native";
import { HeaderComponent } from '../../Components/indexComponent';
import { withNavigation } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Style } from "../../utils/Style";

const Project = (props) => {
    const [showAddEmployee, setShowAddEmployee] = useState(false)


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <HeaderComponent
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <TouchableOpacity
                onPress={() => props.navigation.navigate('AddProject')}
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

export default withNavigation(Project)