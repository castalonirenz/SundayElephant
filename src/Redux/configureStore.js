import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import Auth from "./Reducer/Auth";
import Employee from './Reducer/Employee'
import Project from "./Reducer/Project";
const combineReducer = combineReducers({
        Credentials: Auth,
        Employee: Employee,
        Project: Project
})

export const store = createStore(combineReducer,compose(applyMiddleware(thunk)))