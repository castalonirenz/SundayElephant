import { SHOW_EMPLOYEE } from "../actionType";

const initialState = {
    employeeList: []
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_EMPLOYEE:

            return {
                ...state,
                employeeList: action.list
            }
        default:
            return state
    }
}

export default AuthReducer