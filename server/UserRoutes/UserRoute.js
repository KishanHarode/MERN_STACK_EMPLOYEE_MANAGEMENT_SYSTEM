import express from 'express';
import { signIn, signOut, SignUp } from '../Controllers/UserController.js';
import { upload } from '../MiddleWares/Multer.js';
const router = express.Router();
router.post('/signup',upload.single('image'),SignUp) // http://localhost:3000/api/auth/user/signup
router.post('/signin',signIn); // http://localhost:3000/api/auth/user/signin
router.get('/signout',signOut); // http://localhost:3000/api/auth/user/signout
export default router;