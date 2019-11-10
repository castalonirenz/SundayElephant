import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderComponent, CalendarComponent } from "../Components/indexComponent";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import axios from 'axios'
let today = moment().format('YYYY-MM-DD')

const Home = (props) => {
  const [markedDates, setMarkedDates] = useState(
    {
      // '2019-11-07': { selected: true, marked: true },
    }
  )
  const [project, setProject] = useState([])
  const Selected = (day) => {
    console.log(day, "date selected")
    let month = day.month
    let araw = moment(day.dateString).format('DD')
    let year = day.year

    axios.post('http://sunday.fitnessforlifetoday.com/api/getProject', {
      month: month,
      year: year,
      day: araw
    })
      .then((response) => {

        console.log(response.data)
        setProject(response.data.data.projectList)
        let complete = {[year+"-"+month+"-"+araw]:{selected: true}}
        console.log(complete, "complete")
        setMarkedDates(complete)
      })
      .catch((err => {


      }))
  }

  useEffect(() => {
    let selectedDate = today

    setMarkedDates({...markedDates, [selectedDate]:{
      selected: true
    }})
    let date = {
      month: moment(today).format('MM'),
      day: moment(today).format('DD'),
      year: moment(today).format('YYYY')
    }

    Selected(date)

  }, [])

  const ProjectDetails = (project) => {
    props.navigation.navigate('ProjectDetails', {
      project: project
    })
  }

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => ProjectDetails(item)}
        style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={{ width: 80, height: 80, borderRadius: 40, borderColor: "orange" }}
          source={require('../Assets/icon/job.png')}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 20, color: "orange" }}>
            {item.project_name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 20, color: "orange" }}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: "#16242a" }}>
      <HeaderComponent
        headerText={"Sunday Elephant"}
        Icon={faBars}
        Toggle={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <CalendarComponent
        current={today}
        markedDates={markedDates}
        DayPress={Selected.bind(this)}
      />

      <View style={{padding: 20}}>
        <Text style={{color:"orange", fontSize:18, fontWeight:"bold"}}>Projects created this day:</Text>
        <FlatList
          data={project}
          renderItem={RenderItem.bind(this)}
          extraData={project}/>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => {
  return{
      Credentials: state.Credentials.info
  }
}



export default connect(mapStateToProps, null)(withNavigation(Home))