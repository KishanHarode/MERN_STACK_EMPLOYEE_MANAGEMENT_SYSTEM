import Employee from "../Models/EmployeeModel.js";
import User from "../Models/UserModel.js";

export const getUserEmployeeData = async (req, res) => {
    try {
        const token_id = req.user;
        // console.log(token_id);
        if (!token_id) {
            return res.status(400).json({ message: "Token is not provided...." });
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        if (!Employee_Data) {
            return res.status(400).json({ message: "Employee Data is not found..." });
        }
        return res.status(200).json({ message: "Employee Data is found...", Employee_Data });
    } catch (error) {
        console.log(error);
    }
}

export const addEmployeeData = async (req, res) => {
    try {
        const { name, email, department, city, phone } = req.body;
        if (!name || !email || !department || !city || !phone) {
            return res.status(400).json({ message: "All fields are required..." });
        }
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(email)) {
            return res.status(400).json({ message: "Email is not valid..." });
        }
        const regexPhone = /^[0-9]{10}$/;
        if (!regexPhone.test(phone)) {
            return res.status(400).json({ message: "Phone number is not valid..." });
        }
        const emailExist = await Employee.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email is already exist..." });
        }
        const phoneExist = await Employee.findOne({ phone });
        if (phoneExist) {
            return res.status(400).json({ message: "Phone number is already exist..." });
        }
        const token_id = req.user;
        // console.log(token_id);
        if (!token_id) {
            return res.status(400).json({ message: "Token_id is not provided at addEmployeeData..." });
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        // console.log(Employee_Data);
        if (!Employee_Data) {
            return res.status(400).json({ message: "Employee Data is not found at addEmployeeData..." });
        }
        const Employee_1 = await Employee.create({
            User: token_id,
            name,
            email,
            department,
            city,
            phone
        });
        if (!Employee_1) {
            return res.status(400).json({ message: "Employee is not created..." });
        }
        return res.status(200).json({ message: "Employee is created successfully...", Employee_1 });


    } catch (error) {
        return res.status(500).json({ message: error.message, message_1: "Internal Server Error..." });
    }
}

export const getAllEmployeesData = async (req,res) => {
    try{
        const token_id = req.user;
        if(!token_id){
            return res.status(400).json({message: "Token is not provided getAllEmployeeData..."});
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        if(!Employee_Data){
            return res.status(400).json({message: "Employee Data is not found getAllEmployeeData..."});
        }
        const All_Employee_Data = await Employee.find({User: token_id});
        if(!All_Employee_Data){
            return res.status(400).json({message:"All Employee Data is not found getAllEmployeeData..."});
        }
        return res.status(200).json({message: "All Employee Data is found succesfully...",All_Employee_Data});
    }catch(error){
        return res.status(500).json({message: error.message, message_1: "Internal Server Error..."});
    }
}

export const updateEmployeeData = async (req,res) => {
    try{
        const {name,email,department,city,phone} = req.body;
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message:"Id is not provided at updateEmployeeData..."});
        }
        if(!name || !email || !department || !city || !phone){
            return res.status(400).json({message:"All field are required..."});
        }
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(email)){
            return res.status(400).json({message:"Email is not valid..."});
        }
        const regexPhone = /^[0-9]{10}$/;
        if(!regexPhone.test(phone)){
            return res.status(400).json({message:"Phone number is not valid..."});
        }
        const token_id = req.user;
        if(!token_id){
            return res.status(400).json({message: "Token is not provided at updateEmployeeData..."})
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        if(!Employee_Data){
            return res.status(400).json({message: "Employee Data is not found at updateEmployeeData..."});
        }
        const Employee_1 = await Employee.findById(id);
        if(!Employee_1){
            return res.status(400).json({message: "Employee is not found at updateEmployeeData..."})
        }
        const Employee_2 = await Employee.findByIdAndUpdate(id,{
            name,
            email,
            department,
            city,
            phone,
        },{
            new: true,
            runValidators: true
        })
        if(!Employee_2){
            return res.status(400).json({message: "Employee is not updated at updateEmployeeData..."});
        }
        return res.status(200).json({message: "Employee is updated successfully...", Employee_2});

    }catch(error){
        return res.status(500).json({message: error.message, message_1: "Internal Server Error..."});
    }
}

export const deleteEmployeeData = async (req,res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Id is not provided at deleteEmployeeData..."})
        }
        const token_id = req.user;
        if(!token_id){
            return res.status(400).json({message: "Token is not provided at deleteEmployeeData..."});
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        if(!Employee_Data){
            return res.status(400).json({message: "Employee Data is not found at deleteEmployeeData..."});
        }
        const Employee_1 = await Employee.findById(id);
        if(!Employee_1){
            return res.status(400).json({message: "Employee is not found at deleteEmployeeData..."});
        }
        const Employee_2 = await Employee.findByIdAndDelete(id);
        if(!Employee_2){
            return res.status(400).json({message: 'Employee is not deleted at deleteEmployeeData...'})
        }
        return res.status(200).json({message: "Employee is deleted succesfully...", Employee_2});
    }catch(error){
        return res.status(500).json({message: error.message, message_1: "Internal Server Error..."});
    }
}
export const get_Single_Employee_Data = async (req,res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Id is not provided at get_Single_Employee_Data..."});
        }
        const token_id = req.user;
        if(!token_id){
            return res.status(400).json({message: "Token is not provided at get_single_Employee_Data..."});
        }
        const Employee_Data = await User.findById(token_id).select("-password");
        if(!Employee_Data){
            return res.status(400).json({message : 'Employee Data is not found at get_Single_Employee_Data...'});
        }
        const Employee_1 = await Employee.findById(id);
        if(!Employee_1){
            return res.status(400).json({message: "Employee is not found at get_Single_Employee_Data..."});
        }
        return res.status(200).json({message: "Employee is found successfully...", Employee_1});
    }catch(error){
        return res.status(500).json({message: error.message, message_1: "Internal Server Error..."});
    }
}
