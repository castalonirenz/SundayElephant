import { GOOGLE_SIGIN, SIGN_IN, LOG_OUT } from "../actionType";
import axios from 'axios'

export const Login =(credentials) => {
    return dispatch => {
       return axios.post('http://sunday.fitnessforlifetoday.com/api/login', {
            username: credentials.username,
            password: credentials.password
        })
            .then((response) => {
                
                if (!response.data.error) {
                    
                    dispatch(SET_CREDENTIALS(response.data.data))
          
                    
                   return {
                       success: true,
                       role_id: response.data.data.role_id
                   }
                }
                else {
                   alert('log in failed')
                    return false
                }
            })
            .catch((err => {
                
                return false
            }))
    }
}

export const SET_CREDENTIALS = (data) => {
    return{
        type: SIGN_IN,
        credentials: data
    }
}

export const Logout =() => {
    return{
        type:LOG_OUT
    }
}