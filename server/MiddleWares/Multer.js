import multer from 'multer';
const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'./public');
    },
    filename:(req,file,callBack)=>{
       callBack(null,file.originalname);
    }
})
export const upload = multer({storage});

