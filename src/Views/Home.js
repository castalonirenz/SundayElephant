import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Button } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderComponent, CalendarComponent } from "../Components/indexComponent";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

let today = moment().format('YYYY-MM-DD')

const Home = (props) => {
  const [markedDates, setMarkedDates] = useState(
    {
      '2019-11-07': { selected: true, marked: true },
    }
  )
  const [omg, setTest] = useState(
    'some shit'
  )

  const Selected = (day) => {
    
    let selectedDate = day.dateString
    // let tempObj = markedDates
    //     tempObj[selectedDate] = {marked: true}
    //     setMarkedDates(tempObj)

    setMarkedDates({...markedDates, [selectedDate]:{
      marked: true
    }})

 
  }

  useEffect(() => {
    
  })

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
    </SafeAreaView>
  )
}

const mapStateToProps = state => {
  return{
      Credentials: state.Credentials.info
  }
}



export default connect(mapStateToProps, null)(withNavigation(Home))