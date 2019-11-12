import { SHOW_PROJECT, LOG_OUT, PROJECT_DETAILS } from "../actionType";

const initialState = {
    projectList: [],
    remainingHours: null,
    totalHours: null,
    tasks: []
}

// type: PROJECT_DETAILS,
//     remaining: data.remainingHours,
//         total: data.totalHours,
//             task: data.tasks

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PROJECT:

            return {
                ...state,
                projectList: action.projects,
            }
        case PROJECT_DETAILS:
            return{
                ...state,
                tasks: action.task,
                totalHours: action.total,
                remainingHours: action.remaining
            }
        case LOG_OUT:
            return {
                projectList: [],
                tasks: [],
                totalHours: null,
                remainingHours: null
            }
        default:
            return state
    }
}

export default ProjectReducer