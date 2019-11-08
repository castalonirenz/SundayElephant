import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import Auth from "./Reducer/Auth";

const combineReducer = combineReducers({
        Credentials: Auth
})

export const store = createStore(combineReducer,compose(applyMiddleware(thunk)))