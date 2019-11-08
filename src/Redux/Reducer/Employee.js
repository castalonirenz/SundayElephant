import { SHOW_EMPLOYEE, LOG_OUT } from "../actionType";

const initialState = {
    employeeList: [],
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_EMPLOYEE:

            return {
                ...state,
                employeeList: action.list,
            }
        case LOG_OUT:
            return{
                employeeList: []
            }
        default:
            return state
    }
}

export default EmployeeReducer