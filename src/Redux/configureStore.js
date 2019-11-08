import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import Auth from "./Reducer/Auth";
import Employee from './Reducer/Employee'
const combineReducer = combineReducers({
        Credentials: Auth,
        Employee: Employee
})

export const store = createStore(combineReducer,compose(applyMiddleware(thunk)))