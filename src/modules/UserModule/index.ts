import { Router } from "express";
import { updateUserRoute } from "./function/user";
import { verifyToken } from "../../auth/authorizer";


const userRoutes = Router();


//routes
userRoutes.patch("/" ,verifyToken, updateUserRoute);


export default userRoutes