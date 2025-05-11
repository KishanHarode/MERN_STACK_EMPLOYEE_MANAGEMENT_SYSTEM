import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const UploadOnCloudinary = async (filepath) => {
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME ,
        api_key: process.env.CLOUD_API_KEY ,
        api_secret: process.env.CLOUD_API_SECRET,
    })
    try{
       if(!filepath){
        return null;
       }
       const upload = await cloudinary.uploader.upload(filepath);
       fs.unlinkSync(filepath);
       return upload.secure_url;
    }catch(error){
        fs.unlinkSync(filepath);
       console.log(error);
    }
}
export default UploadOnCloudinary;