import { SHOW_PROJECT, LOG_OUT } from "../actionType";

const initialState = {
    projectList: [],
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PROJECT:

            return {
                ...state,
                projectList: action.projects,
            }
        case LOG_OUT:
            return {
                projectList: []
            }
        default:
            return state
    }
}

export default ProjectReducer