import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // Corrected path

import express from 'express';
import cors from 'cors';
import Connection from './Configs/Connection.js';
import router from './UserRoutes/UserRoute.js';
import cookieParser from 'cookie-parser';
import Emp_Router from './EmployeeRoutes/EmployeeRoute.js';


const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONT_END_URL, // Replace '*' with actual origin (e.g., 'http://localhost:3000') for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 2000;

app.use('/api/auth/user',router);
app.use('/api/employee',Emp_Router);

// Connect to DB and then start the server
app.get('/',(req,res) => {
    res.send("Server backend...");
})

const startServer = async () => {
    await Connection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
    });
};

startServer();