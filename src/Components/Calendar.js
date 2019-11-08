import { Calendar } from "react-native-calendars";
import React from "react";
import moment from "moment";
export const Calendars = (props) => {
    console.log(moment().format('YYYY-DD-MM'))
    let today = moment().format('YYYY-MM-DD')
    return(
        <Calendar
            // Initially visible month. Default = Date()
            // 2012-03-01'
            current={props.current}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={today}
            markedDates={props.markedDates}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2050-11-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={props.DayPress}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => { console.log('selected day', day) }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => { console.log('month changed', month) }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={true}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            theme={{
                calendarBackground:"#16242a",
                textDisabledColor:"gray",
                todayTextColor:"green", 
                dotColor:"orange",
                dayTextColor:"#fff",
                monthTextColor:"#fff",
                arrowColor: 'orange',
                selectedDayBackgroundColor: 'orange'
            }}
            markingType={'simple'}
        />
    )
}