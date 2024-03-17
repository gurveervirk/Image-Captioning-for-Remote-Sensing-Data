import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// console.log("DB_NAME: ",DB_NAME);
const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection error: ",error);
        process.exit(1);
    }
}
export default connectDB;