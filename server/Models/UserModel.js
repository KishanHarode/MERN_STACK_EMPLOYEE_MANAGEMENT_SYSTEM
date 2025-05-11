import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true,
    },
    lastName:{
        type:String,
        required: true,
        trim: true,
    },
    userName:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    UserImage:{
        type:String,
        default:""
    }
},{timestamps:true});
const User = mongoose.model("User",userSchema);
export default User;
// export default mongoose.model("User",userSchema);