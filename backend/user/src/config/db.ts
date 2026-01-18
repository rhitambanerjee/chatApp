import mongoose from "mongoose";

const connectDB = async () =>{
    const url = process.env.MONGO_URI;
    if(!url){
        throw new Error("Can't find mongo url");
    }

    try {
        await mongoose.connect(url,{
            dbName:"chatAppMicroService"
        });
        console.log("Connected to chatapp successful");

    } catch (error) {
        console.log("Failed to connect to mongodb",error);
        process.exit(1);
    }
}

export default connectDB;