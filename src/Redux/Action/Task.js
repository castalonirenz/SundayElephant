import axios from 'axios'
import moment from 'moment'
export const addTask = (data) => {

    //YYYY-MM-DD H:i
    let date = moment(data.start_date).format('YYYY-MM-DD')
    let startTime = moment(data.start_time).format('H:mm')
    let startDate = date + " " + startTime

    let edate = moment(data.end_date).format('YYYY-MM-DD')
    let endTime = moment(data.end_time).format('H:mm')
    let endDate = edate + " " + endTime
    return dispatch => {

        return axios.post('http://sunday.fitnessforlifetoday.com/api/saveTask', {
            user_id:data.user_id,
            project_id: data.project_id,
            task_name:data.project_name,
            task_description: data.project_description,
            start_date: startDate,
	        end_date: endDate
        })
            .then((response) => {
                console.log(response)
                return true

            })
            .catch((err => {
                
                return false
            }))

    }
}