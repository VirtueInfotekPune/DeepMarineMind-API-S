import { Router } from "express";
import { Login, registerUser, verifyotp, forgotPassword, resetPassword} from "./function/auth";
import { verifyToken } from "../../auth/authorizer";

const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)

authRoutes.post("/verify-otp" , verifyotp)

authRoutes.post("/login" , Login)

authRoutes.post("/forgot-password" , forgotPassword)

authRoutes.patch("/reset-password" , verifyToken, resetPassword)




export default authRoutes