
import UploadOnCloudinary from "../Configs/Cloudinary_1.js"
import genToken from "../Configs/token.js";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs';

export const SignUp = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const file = req.file;
    let UserImage
    try {
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields correctly..." });
        }
        if(file?.path){
            // const cloudinary_image = await UploadOnCloudinary(file?.path);
            const cloudinary_image = await UploadOnCloudinary(file?.path);
            UserImage = cloudinary_image;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address..." })
        }

        const existUser = await User.findOne({ email }); // ✅ use findOne
        if (existUser) {
            return res.status(400).json({ message: "User already exists..." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long..." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            UserImage
        });

        if (!newUser) {
            return res.status(400).json({ message: "User not created..." });
        }

        const getToken = await genToken(newUser._id);

        res.cookie('token', getToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ Correct value
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({ message: "User SignUp Successfully...", newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Signup error..." });
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields correctly..." });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address..." })
        }

        const UserExists = await User.findOne({ email });
        if (!UserExists) {
            return res.status(400).json({ message: "User not found..." });
        }
        const isPasswordMatch = await bcrypt.compare(password, UserExists.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Credentials..." });
        }
        try{
            const getToken = await genToken(UserExists._id);
            res.cookie('token',getToken,{
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production'
            })
        }catch(error){

        }
        return res.status(200).json({ message: "User SignIn Successfully...", UserExists });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SignIn error..." })
    }

}
export const signOut = async (req, res) => {
    try {
        await res.clearCookie('token', {
            httpOnly: true,
            samesite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        })
        return res.status(200).json({message:"User SignOut Successfully..."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SignOut Error..." });
    }
}
