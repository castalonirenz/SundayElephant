import { Calendars } from "./Calendar";
import { Header } from "./Header";
import { renderLabel } from "./DrawerLabel";
import { M, TaskDetails, EmployeeDetails } from "./Modal";
import { DateTime } from "./Modal";
import { RadioButton } from "./RadioButton";
export const CalendarComponent = Calendars
export const HeaderComponent = Header
export const LabelComponent = renderLabel
export const ModalComponent = M
export const DatePickerComponent = DateTime
export const TaskModal = TaskDetails
export const EmployeeModal = EmployeeDetails
export const RadioButtonComponent = RadioButton