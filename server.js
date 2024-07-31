//jshint esversion:6

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connectDB.js";
import userRoute from "./routes/userRoute.js";
const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/merndb";


app.use("/",userRoute);


connectDB(DB_URL).then(() => {
    app.listen(port, function (req,res) {
        try {
            console.log(`Server is Up on the port ${port}`);
        } catch (error) {
            console.log("Error:", error)
        }

    })
});

