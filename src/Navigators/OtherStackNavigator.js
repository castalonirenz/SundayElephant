import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import EmployeeScreen from '../Views/Employee/Employee'
import CreateEmployeeScreen from '../Views/Employee/CreateEmployee'
import ProjectScreen from "../Views/Project/Project";
import CreateProjectScreen from "../Views/Project/CreateProject";
const EmployeeNav = createStackNavigator({
    Employee: {
        screen: EmployeeScreen
    },
    AddEmployee:{
        screen: CreateEmployeeScreen
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
    }
}, {
    defaultNavigationOptions: {
        header: null
    }
})

export const ProjectNavContainer = createAppContainer(ProjectNav)

