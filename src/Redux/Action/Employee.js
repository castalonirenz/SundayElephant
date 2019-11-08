import axios from 'axios'
import { SHOW_EMPLOYEE } from '../actionType'


export const showEmployee = () => {
    return dispatch => {
       return axios.post('http://sunday.fitnessforlifetoday.com/api/employeList')
            .then((response) => {

                
                dispatch(setEmployee(response.data.data))
                return true
            })
            .catch((err => {
                return true
            }))
    }
}

const setEmployee = (data) => {
    return {
        type: SHOW_EMPLOYEE,
        list: data
    }
}