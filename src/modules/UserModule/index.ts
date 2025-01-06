import { Router } from "express";
import { updateUserRoute, userProfile ,updateUserProfileRoute} from "./function/user";
import { verifyToken } from "../../auth/authorizer";


const userRoutes = Router();


//routes
userRoutes.patch("/" ,verifyToken, updateUserRoute);
userRoutes.get("/profile" ,verifyToken, userProfile);
userRoutes.patch("/update-profile" ,verifyToken, updateUserProfileRoute);


export default userRoutes