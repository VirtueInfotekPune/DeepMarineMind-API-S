import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { updateRecruiterRoute , getRecruiterByIdRoute} from "./function/recruiter";


const recruiterRoutes = Router();


//routes
recruiterRoutes.patch("/" ,verifyToken, updateRecruiterRoute);
recruiterRoutes.get("/" ,verifyToken,  getRecruiterByIdRoute);


export default recruiterRoutes