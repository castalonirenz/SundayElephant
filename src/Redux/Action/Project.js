import axios from 'axios'
import moment from "moment";
import { SHOW_PROJECT } from '../actionType';
export const addProject = (data) => {

    //YYYY-MM-DD H:i
    let date = moment(data.start_date).format('YYYY-MM-DD')
    let startTime = moment(data.start_time).format('H:mm')
    let startDate = date + " " + startTime

    let edate = moment(data.end_date).format('YYYY-MM-DD')
    let endTime = moment(data.end_time).format('H:mm')
    let endDate = edate + " " + endTime
    return dispatch => {
      
       return axios.post('http://sunday.fitnessforlifetoday.com/api/saveProject', {
            project_name: data.project_name,
            start_date: startDate,
            end_date: endDate
        })
            .then((response) => {
                console.log(response)
                if(response.data.error_msg === null){
                    return true
                }
                else{
                    return false
                }
            
            })
            .catch((err => {
                return false
       
            }))
    
    }
}

export const loadProjects = () => {
    return dispatch => {
       return axios.post('http://sunday.fitnessforlifetoday.com/api/projectList')
            .then((response) => {
                console.log(response)
                if (response.data.error_msg === null) {
                    // return true
                    dispatch(setProject(response.data.data))
                    return true
                }
                else {
                    // return false
                    alert('error getting project list')
                    return false
                }

            })
            .catch((err => {
            
                return false
            }))

    
    }
}

const setProject = (data) => {
    return{
        type: SHOW_PROJECT,
        projects: data
    }
}