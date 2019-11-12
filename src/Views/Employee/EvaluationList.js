import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios'
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faArrowLeft, faStar, faEye, faBars } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from '../../Components/indexComponent';
const EvaluationList = (props) => {

    const [evaluation, setEvaluation] = useState([])
    
    useEffect(()=> {
        console.log('render')
        const Employee = props.navigation.getParam('employee', null)
        axios.post('http://sunday.fitnessforlifetoday.com/api/getEvaluation', {
            user_id: Employee !== null ? Employee.id : props.Credentials.id
        })
            .then((response) => {
                console.log(response.data.data, "response")
                setEvaluation(response.data.data)
              
            })
            .catch((err => {

             
            }))

      
    }, [])

    const renderMe = () => {
        
       if(evaluation.length !== 0){
          return evaluation.map((items, index) => {
              return items.content
          })
       }
       else{

       }
    }
    const goToEvaluateDetail = (item) => {
        console.log(item, "--> item")
        props.navigation.navigate('EvaluateDetail', {
            evaluation: item
        })
    }

    const RenderItem = ({ item }) => {
        console.log(item, "---> item")
        return (
           item.map((items, key) => (
               <TouchableOpacity
                   onPress={goToEvaluateDetail.bind(this, items)}
                   style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                   <FontAwesomeIcon icon={faEye} size={30} color={"orange"} />
                   {/* <Image
                    resizeMode="contain"
                    style={{ width: 100, height: 100, borderRadius: 50, borderColor: "orange" }}
                    source={require('../../Assets/icon/job.png')}
                /> */}
                   <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                       {items.date_of_evaluation}
                   </Text>
               </TouchableOpacity>
           ))
        )
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor:"#16242a"}}>
            <HeaderComponent
                headerText={"Evaluation List"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />
            {/* <TouchableOpacity onPress={()=> renderMe()}>
                <Text>TEST</Text>
            </TouchableOpacity> */}
            <FlatList
              
                data={renderMe()}
                renderItem={RenderItem.bind(this)}
                // extraData={props.ProjectList}
                />
        </SafeAreaView>
    )
}


const mapStateToProps = state => {
    return {
        Credentials: state.Credentials.info
    }
}


export default connect(mapStateToProps, null)(withNavigation(EvaluationList))