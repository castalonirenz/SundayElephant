import { GOOGLE_SIGIN } from "../actionType";

export const SET_CREDENTIALS = (data) => {
    return{
        type: GOOGLE_SIGIN,
        credentials: data
    }
}