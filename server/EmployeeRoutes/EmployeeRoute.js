import express from "express";
import { addEmployeeData, deleteEmployeeData, get_Single_Employee_Data, getAllEmployeesData, getUserEmployeeData, updateEmployeeData } from "../Controllers/EmployeeController.js";
import UserAuth from "../MiddleWares/UserAuth.js";
const Emp_Router = express.Router();
Emp_Router.get('/get_employee',UserAuth,getUserEmployeeData); // http://localhost:3000/api/employee/get_employee
Emp_Router.post('/add_employee',UserAuth,addEmployeeData); // http://localhost:3000/api/employee/add_employee
Emp_Router.get('/get_employees',UserAuth,getAllEmployeesData); // http://localhost:3000/api/employee/get_employees
Emp_Router.put('/update_employee/:id',UserAuth,updateEmployeeData); // http://localhost:3000/api/employee/update_employee/:id
Emp_Router.get('/get_employee/:id',UserAuth,get_Single_Employee_Data); // http://localhost:3000/api/employee/get_employee/:id
Emp_Router.delete('/delete_employee/:id',UserAuth,deleteEmployeeData); // http://localhost:3000/api/employee/delete_employee/:id

export default Emp_Router;