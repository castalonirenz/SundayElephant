import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { HeaderComponent } from '../../Components/indexComponent';
import { withNavigation } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Style } from "../../utils/Style";
import { loadProjects } from "../../Redux/Action/Project";
import { connect } from "react-redux";
const Project = (props) => {
    const [showAddEmployee, setShowAddEmployee] = useState(false)

    useEffect(() => {

        props.loadProject()

    }, [])


    const RenderItem = ({ item }) => {
        console.log(item, "project details")
        return (
            <TouchableOpacity style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Image
                    resizeMode="contain"
                    style={{ width: 100, height: 100, borderRadius: 50, borderColor: "orange" }}
                    source={require('../../Assets/icon/job.png')}
                />
                <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 20, color: "green" }}>
                    {item.project_name}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a"}}>
            <HeaderComponent
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <FlatList
                data={props.ProjectList}
                renderItem={RenderItem.bind(this)}
                extraData={props.ProjectList}
            // keyExtractor={item => item.id}
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

const mapStateToProps = state => {
    return {
        ProjectList: state.Project.projectList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProject: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Project))