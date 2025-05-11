import mongoose from "mongoose";

const Connection = async () => {
    try {
        const mongo_url = process.env.MONGO_URL;
        const db_name = process.env.DB_NAME;
        if(!mongo_url || !db_name){
            throw new Error ("MongoDB URL or DB name is not defined in dotenv file...")
        }
        await mongoose.connect(mongo_url,{dbName: db_name});
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error.message);
    }
};

export default Connection;
