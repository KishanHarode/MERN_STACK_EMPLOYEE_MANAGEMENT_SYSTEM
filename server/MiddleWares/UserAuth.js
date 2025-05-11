import jwt from "jsonwebtoken";
const UserAuth = (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({message:"Token is not provided..."});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(400).json({message:"Token is not decoded..."});
        }
        req.user = decoded.userId;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Token is not valid..."})
    }
}
export default UserAuth;