import { GOOGLE_SIGIN, SIGN_IN, LOG_OUT } from "../actionType";

const initialState ={ 
    info: null
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case GOOGLE_SIGIN:
            
            return{
                ...state,
                info: action.credentials
            }
        case SIGN_IN:
            
            return {
                ...state,
                info: action.credentials
            }
        case LOG_OUT:
            return{
                info: null
            }
            default:
        return state
    }
}

export default AuthReducer