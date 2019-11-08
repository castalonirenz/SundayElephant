import axios from 'axios'
import { NEW_STAFF } from "../actionType";

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
            console.log(response)

            if(response.data.error_msg === null){
                console.log(response.data.data)
                return true
            }
            else{
                return false
            }
        }))
        .catch(error => {
            
        })
    }
}