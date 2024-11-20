import { Router } from "express";
import { registerUser } from "./function/auth";


const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)


export default authRoutes