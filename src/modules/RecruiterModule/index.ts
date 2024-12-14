import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { addTeamRoute, updateRecruiterRoute } from "./function/recruiter";
import { haveAccess } from "../../auth/access";


const recruiterRoutes = Router();


//routes
recruiterRoutes.patch("/" ,verifyToken, updateRecruiterRoute);
recruiterRoutes.post("/add-team" , verifyToken, haveAccess(["recruiter"] , "superadmin"),addTeamRoute);


export default recruiterRoutes