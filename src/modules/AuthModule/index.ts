import { Router } from "express";
import { Login, registerUser, verifyotp, forgotPassword, resetPassword} from "./function/auth";


const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)

authRoutes.post("/verify-otp" , verifyotp)

authRoutes.post("/login" , Login)

authRoutes.post("/forgot-password" , forgotPassword)

authRoutes.post("/reset-password" , resetPassword)



export default authRoutes