import { GOOGLE_SIGIN } from "../actionType";

const initialState ={ 
    data: null
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case GOOGLE_SIGIN:
            console.log(action.credentials, "--> credentals")
            return{
                ...state,
                data: action.credentials
            }
            default:
        return state
    }
}

export default AuthReducer