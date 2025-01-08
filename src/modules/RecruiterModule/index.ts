import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { addTeamRoute, getRecruiterByIdRoute, getTeamMembersRoutes, updateRecruiterRoute , updateTeamMemberRoute, deleteTeamMemberRoute} from "./function/recruiter";
import { haveAccess } from "../../auth/access";


const recruiterRoutes = Router();


//routes
recruiterRoutes.patch("/" ,verifyToken, updateRecruiterRoute);
recruiterRoutes.post("/add-team" , verifyToken, haveAccess(["recruiter"] , "superadmin"),addTeamRoute);
recruiterRoutes.get("/team" ,verifyToken, haveAccess(["recruiter"] , "superadmin"),  getTeamMembersRoutes);
recruiterRoutes.get("/" ,verifyToken,  getRecruiterByIdRoute);
recruiterRoutes.patch("/update-team", verifyToken, updateTeamMemberRoute);
recruiterRoutes.delete("/delete-team", verifyToken, deleteTeamMemberRoute);



export default recruiterRoutes