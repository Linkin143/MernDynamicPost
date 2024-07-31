import mongoose from "mongoose";

const connectDB = async (DB_URL) =>{
    try {
    await mongoose.connect(DB_URL);
    console.log("DB created");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;