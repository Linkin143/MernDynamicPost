import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    age: { type: Number },

}, { timestamps: true }
)

const userModel = mongoose.model("userModel", userSchema);


export { userModel };
