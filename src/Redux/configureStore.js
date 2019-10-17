import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import Auth from "./Reducer/Auth";

const combineReducer = combineReducers({
        Auth: Auth
})

export const store = createStore(combineReducer,compose(applyMiddleware(thunk)))