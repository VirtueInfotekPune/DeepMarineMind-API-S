import { Router } from "express";
import { Login, registerUser, verifyotp } from "./function/auth";


const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)

authRoutes.post("/verify-otp" , verifyotp)

authRoutes.post("/login" , Login)


export default authRoutes