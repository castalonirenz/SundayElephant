import axios from 'axios'
import { NEW_STAFF, SHOW_EMPLOYEE } from "../actionType";

export const addStaff = (data) => {
    
    return dispatch => {
       return axios.post('http://sunday.fitnessforlifetoday.com/api/register_save',{
            role_id: data.role_id,
            email: data.email,
            full_name: data.full_name,
            address: data.address,
            phone_no:data.phone_no,
            username: data.username,
            password: data.password
        })
        .then((response => {
            if(response.data.error_msg === null){

                dispatch(setEmployee(response.data.data))
                return true  
           
            }
            else{
                return false
            }
        }))
        .catch(error => {
                return false
        })
    }
}

const setEmployee = (data) => {
    return {
        type: SHOW_EMPLOYEE,
        list: data
    }
}