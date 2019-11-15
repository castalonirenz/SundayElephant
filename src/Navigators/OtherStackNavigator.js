import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import EmployeeScreen from '../Views/Employee/Employee'
import CreateEmployeeScreen from '../Views/Employee/CreateEmployee'
import ProjectScreen from "../Views/Project/Project";
import CreateProjectScreen from "../Views/Project/CreateProject";
import ProjectDetailScreen from "../Views/Project/ProjectDetails";
import CreateTasksScreen from '../Views/Tasks/CreateTask'
import ProfileScreen from '../Views/Profile/userProfile'
import HomeScreen from '../Views/Home'
import TaskScreen from "../Views/Tasks/EmployeeTask";
import EvaluateScreen from '../Views/Employee/Evaluation'
import EvaluateListScreen from "../Views/Employee/EvaluationList";
import EvaluationDetailScreen from "../Views/Employee/EvaluationDetails";
const HomeNav = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    ProjectDetails: {
        screen: ProjectDetailScreen
    },
    CreateTask: {
        screen: CreateTasksScreen
    }
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const HomeNavContainer = createAppContainer(HomeNav)

const EmployeeNav = createStackNavigator({
    Employee: {
        screen: EmployeeScreen
    },
    AddEmployee:{
        screen: CreateEmployeeScreen
    },
    Evaluate: {
    screen: EvaluateScreen
    },
    EvaluateList:{
        screen: EvaluateListScreen
    },
    EvaluateDetail:{
        screen: EvaluationDetailScreen
    }
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const EmployeeNavContainer = createAppContainer(EmployeeNav)

const ProjectNav = createStackNavigator({
    Project: {
        screen: ProjectScreen
    },
    AddProject: {
        screen: CreateProjectScreen
    },
    ProjectDetails:{
        screen: ProjectDetailScreen
    },
    CreateTask:{
        screen: CreateTasksScreen
    },
    EvaluateEmployee:{
        screen: EvaluateScreen
    }
}, {
    defaultNavigationOptions: {
        header: null
    }
})
export const ProjectNavContainer = createAppContainer(ProjectNav)

const ProfileNav = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    },
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const ProfileNavContainer = createAppContainer(ProfileNav)

const EmployeeTaskNav = createStackNavigator({
    Task: {
        screen: TaskScreen
    },
    // ViewTask:{
    //     screen: 
    // }
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const EmployeeTaskContainer = createAppContainer(EmployeeTaskNav)

const EmployeeEvaluateNav = createStackNavigator({
    EvaluateList: {
        screen: EvaluateListScreen
    },
    Evaluate: {
        screen: EvaluateScreen
    },
    EvaluateDetail: {
        screen: EvaluationDetailScreen
    }
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const EmployeeEvaluateNavContainer = createAppContainer(EmployeeEvaluateNav)

