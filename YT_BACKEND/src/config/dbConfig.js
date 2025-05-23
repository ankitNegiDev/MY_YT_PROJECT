import mongoose from 'mongoose';
import { MONGODB_URL } from './serverConfig.js';

export async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("connection is set-up with mongo db database\n");

    }catch(error){
        console.log("failed to connect with mongoDB..");
        console.log("error : ", error);
    }
}