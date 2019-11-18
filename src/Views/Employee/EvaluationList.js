import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios'
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faPlus, faArrowLeft, faStar, faEye, faBars } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from '../../Components/indexComponent';
import { PieChart } from 'react-native-svg-charts'
import { TextSvg } from "../../utils/Text";
const EvaluationList = (props) => {

    const [evaluation, setEvaluation] = useState([])
    const [overAll, setOverAll] = useState([])
    useEffect(() => {
        
        const Employee = props.navigation.getParam('employee', null)
        axios.post('http://sunday.fitnessforlifetoday.com/api/getEvaluation', {
            user_id: Employee !== null ? Employee.id : props.Credentials.id
        })
            .then((response) => {
                
                setEvaluation(response.data.data)

            })
            .catch((err => {


            }))
        getEvaluation(Employee)
            
    }, [])


    const getEvaluation = (item) => {
        axios.post('http://sunday.fitnessforlifetoday.com/api/analyticsEvaluation', {
            user_id: item !== null ? item.id : props.Credentials.id
        })
            .then((response) => {
                
                setOverAll(response.data.data)

            })
            .catch((err => {
                alert('Error getting project details')
            }))
    }


    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            let showPercent = Math.round(data.percent)
            return (
                <View>
               
                    <TextSvg
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.percent !== 0 ?[ showPercent+ "%"] : ""} 
                        
                    </TextSvg>
                </View>
            )
        })
    }

    const Pie = () => {
        let finalData = []
        let total = 0
        if (overAll.length !== 0) {
            
            //   overAll.reduce((a, b) =>{
            //       total = parseInt(a.total)+parseInt(b.total)
            //     })

            let total = overAll.outstanding + overAll.exceeds_expectations + overAll.meets_expectations + overAll.below_expectations + overAll.unsatisfactory

            finalData.push(
                {
                    amount: overAll.outstanding,
                    key: 0,
                    percent: overAll.outstanding / 40 * 100,
                    svg: {
                        fill: "orange"
                    }

                }
            )
            finalData.push(
                {
                    amount: overAll.exceeds_expectations,
                    key: 1,
                    percent: overAll.exceeds_expectations / 40 * 100,
                    svg: {
                        fill: "green"
                    }

                }
            )
            finalData.push(
                {
                    amount: overAll.meets_expectations,
                    key: 2,
                    percent: overAll.meets_expectations / 40 * 100,
                    svg: {
                        fill: "blue"
                    }

                }
            )
            finalData.push(
                {
                    amount: overAll.below_expectations,
                    key: 3,
                    percent: overAll.below_expectations / 40 * 100,
                    svg: {
                        fill: "yellow"
                    }

                }
            )
            finalData.push(
                {
                    amount: overAll.unsatisfactory,
                    key: 4,
                    percent: overAll.unsatisfactory / 40 * 100,
                    svg: {
                        fill: "red"
                    }

                }
            )
            
        }
        return (
            <PieChart
                // outerRadius={'95%'}
                valueAccessor={({ item }) => item.amount}
                style={{ height: 200, width: 200 }}
                data={finalData}
                spacing={0}
                outerRadius={'95%'}
            >
                {/* <Text style={{ fontSize: 18, color: "orange", fontWeight: "bold", alignSelf:"center", top: 40 }}>50%</Text> */}
                <Labels />
               
            </PieChart>
        )
    }


    const renderMe = () => {

        if (evaluation.length !== 0) {
            return evaluation.map((items, index) => {
                return items.content
            })

    
        }
        else {

        }
    }
    const goToEvaluateDetail = (item) => {
        
        props.navigation.navigate('EvaluateDetail', {
            evaluation: item
        })
    }

    const RenderItem = ({ item }) => {
        
        return (
        
                <TouchableOpacity
                    onPress={goToEvaluateDetail.bind(this, item)}
                    style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faEye} size={30} color={"orange"} />
                    {/* <Image
                    resizeMode="contain"
                    style={{ width: 100, height: 100, borderRadius: 50, borderColor: "orange" }}
                    source={require('../../Assets/icon/job.png')}
                /> */}
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        {item.date_of_evaluation}
                    </Text>
                </TouchableOpacity>
         
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16242a" }}>
            <HeaderComponent
                headerText={"Evaluation List"}
                Icon={faBars}
                Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />
            {/* <TouchableOpacity onPress={()=> renderMe()}>
                <Text>TEST</Text>
            </TouchableOpacity> */}
            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                    Overall Evaluation
                    </Text>
                <Pie />


            </View>
            <View style={{ width: "100%", marginLeft: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ height: 10, width: 10, backgroundColor: "orange" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        Outstanding
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ height: 10, width: 10, backgroundColor: "green" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        Exceeds Expectation
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ height: 10, width: 10, backgroundColor: "blue" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        Meet Expectation
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ height: 10, width: 10, backgroundColor: "yellow" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        Below Expectation
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ height: 10, width: 10, backgroundColor: "red" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20, color: "#fff" }}>
                        Unsatisfactory
                    </Text>
                </View>
            </View>
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