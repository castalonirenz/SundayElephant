import { GOOGLE_SIGIN, SIGN_IN } from "../actionType";

const initialState ={ 
    info: null
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case GOOGLE_SIGIN:
            console.log(action.credentials, "--> credentals")
            return{
                ...state,
                info: action.credentials
            }
        case SIGN_IN:
            console.log(action.credentials, "--> credentals")
            return {
                ...state,
                info: action.credentials
            }
            default:
        return state
    }
}

export default AuthReducer