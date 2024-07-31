import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { userModel } from "../models/userModel.js";
const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();


const router= new express.Router();




//Create Data

router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const userAdded = await userModel.create({
            name: name,
            email: email,
            age: age
        })
        res.status(201).json(userAdded);

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})


//Get All user data


router.get("/", async (req, res) => {
    try {
        const showData = await userModel.find();
        
        res.status(200).json(showData);
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})


//Get single user
router.get("/:id", async (req, res) => {
    try {
        const {id} =req.params;
        const singleUserData = await userModel.findById({
            _id:id
        });
        
        res.status(200).json(singleUserData);
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})

// Delete the data
router.delete("/:id", async (req, res) => {
    try {
        const {id} =req.params;
        const deleteUserData = await userModel.findByIdAndDelete({
            _id:id
        });
        
        res.status(200).json(deleteUserData);
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const {id} =req.params;
        const {name,email,age} = req.body;
        const updateUserData = await userModel.findByIdAndUpdate(
            id,req.body,{new:true}
        );
        
        res.status(200).json(updateUserData);
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})


export default router;