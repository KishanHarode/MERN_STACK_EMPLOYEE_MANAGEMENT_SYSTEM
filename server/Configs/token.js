import jwt from 'jsonwebtoken';
const genToken = async (userId) => {
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
            expiresIn: '7d'
        })
        return token;
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Token generation error..."});
    }
}
export default genToken;