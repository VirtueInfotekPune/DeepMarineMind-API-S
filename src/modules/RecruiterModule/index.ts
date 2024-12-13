import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { updateRecruiterRoute } from "./function/recruiter";


const recruiterRoutes = Router();


//routes
recruiterRoutes.patch("/" ,verifyToken, updateRecruiterRoute);


export default recruiterRoutes