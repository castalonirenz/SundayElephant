import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, Image, RefreshControl } from "react-native";
import { HeaderComponent } from '../../Components/indexComponent';
import { withNavigation } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Style } from "../../utils/Style";
import { connect } from "react-redux";
import { showEmployee } from "../../Redux/Action/Employee";
const Employee = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const [employeeList, setEmployeeList] = useState([])


    useEffect(() => {
        
        props.loadEmployee()

    }, [])

    const RenderItem = ({ item }) => {
        
        return (
            <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Image
                    resizeMode="contain"
                    style={{ width: 100, height: 100, borderRadius: 50,  borderColor:"orange" }}
                    source={require('../../Assets/icon/avatar.png')}
                />
                <Text style={{fontSize: 24, fontWeight:"bold", marginLeft: 20, color:"green"}}>
                    {item.full_name}
                </Text>
            </View>
        )
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.loadEmployee()
        .then(stop => {
            setRefreshing(false)
        })
        // wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a"}}>
            <HeaderComponent
                headerText={"Employees"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <FlatList
                refreshControl={
                    <RefreshControl 
                    onRefresh={onRefresh}
                    refreshing={refreshing} />
                }
                data={props.EmployeeList}
                renderItem={RenderItem.bind(this)}
                extraData={props.EmployeeList}
            // keyExtractor={item => item.id}
            />

            <TouchableOpacity
                onPress={() => props.navigation.navigate('AddEmployee')}
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
        EmployeeList: state.Employee.employeeList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadEmployee: () => dispatch(showEmployee())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Employee))