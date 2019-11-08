import { GOOGLE_SIGIN, SIGN_IN } from "../actionType";
import axios from 'axios'

export const Login =(credentials) => {
    return dispatch => {
       return axios.post('http://sunday.fitnessforlifetoday.com/api/login', {
            username: credentials.username,
            password: credentials.password
        })
            .then((response) => {
                console.log(response)
                if (!response.data.error) {
                    console.log(response.data.data, "--> response from sign in")
                    dispatch(SET_CREDENTIALS(response.data.data))
                    alert('log in success')
                    
                   return true
                }
                else {
                   
                    return false
                }
            })
            .catch((err => {
                console.log(err)
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