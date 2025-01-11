import { Router } from "express";
import { Login, registerUser, verifyotp, forgotPassword, resetPassword, resendOtp, verifyOtpForForgotPassword} from "./function/auth";
import { verifyToken } from "../../auth/authorizer";

const authRoutes = Router()


//routes 
authRoutes.post("/register" , registerUser)

authRoutes.post("/verify-otp" , verifyotp)

authRoutes.post("/login" , Login)

authRoutes.post("/resend-otp" , resendOtp)


authRoutes.post("/forgot-password" , forgotPassword)

authRoutes.post("/verify-forgot-password-otp" , verifyOtpForForgotPassword)

authRoutes.patch("/reset-password" , resetPassword)




export default authRoutes