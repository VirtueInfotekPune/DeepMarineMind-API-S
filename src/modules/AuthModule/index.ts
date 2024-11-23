import { Router } from "express";
import { registerUser, verifyotp } from "./function/auth";


const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)

authRoutes.post("/verify-otp" , verifyotp)


export default authRoutes