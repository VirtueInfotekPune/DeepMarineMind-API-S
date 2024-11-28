import { Router } from "express";
import { addPersonalDetailsRoute, deletePersonalDetailsRoute, findPaginatePersonalDetailsRoute, updatePersonalDetailsRoute } from "./function/personalDetails";
import { addEducationRoute, deleteEducationRoute, findpaginateEducationRoute, updateEducationRoute } from "./function/education";
const candidateInfo = Router();


//routes for personal details
candidateInfo.get("/personalDetails" , findPaginatePersonalDetailsRoute);
candidateInfo.post("/personalDetails" , addPersonalDetailsRoute);
candidateInfo.patch("/personalDetails" , updatePersonalDetailsRoute);
candidateInfo.delete("/personalDetails" , deletePersonalDetailsRoute);

// routes for education 
candidateInfo.get("/education" , findpaginateEducationRoute);
candidateInfo.post("/education" , addEducationRoute);
candidateInfo.patch("/education" , updateEducationRoute);
candidateInfo.delete("/education" , deleteEducationRoute);




export default candidateInfo