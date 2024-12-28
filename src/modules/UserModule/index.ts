import { Router } from "express";
import { updateUserRoute, userProfile } from "./function/user";
import { verifyToken } from "../../auth/authorizer";


const userRoutes = Router();


//routes
userRoutes.patch("/" ,verifyToken, updateUserRoute);
userRoutes.get("/profile" ,verifyToken, userProfile);


export default userRoutes