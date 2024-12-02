import { Router } from "express";
import { addPersonalDetailsRoute, deletePersonalDetailsRoute, findPaginatePersonalDetailsRoute, updatePersonalDetailsRoute } from "./function/personalDetails";
import { addEducationRoute, deleteEducationRoute, findpaginateEducationRoute, updateEducationRoute } from "./function/education";
import { addAwardRoute, deleteAwardRoute, findPaginateAwardRoute, updateAwardRoute } from "./function/awards";
import { addCourseRoute, deleteCourseRoute, findPaginateCourseRoute, updateCourseRoute } from "./function/course";
import { addActivitiesRoute, deleteActivitiesRoute, findPaginateActivitiesRoute, updateActivitiesRoute } from "./function/activities";
import {addExperienceRoute, deleteExperienceRoute, findPaginateExperienceRoute, updateExperienceRoute} from "./function/experience";
import { verifyToken } from "../../auth/authorizer";
const candidateInfo = Router();


// routes for candidate experience 
candidateInfo.get("/experience" ,verifyToken, findPaginateExperienceRoute);
candidateInfo.post("/experience" , verifyToken, addExperienceRoute);
candidateInfo.patch("/experience" , verifyToken, updateExperienceRoute);
candidateInfo.delete("/experience" , verifyToken, deleteExperienceRoute);

//routes for personal details
candidateInfo.get("/personalDetails" , verifyToken, findPaginatePersonalDetailsRoute);
candidateInfo.post("/personalDetails" , verifyToken, addPersonalDetailsRoute);
candidateInfo.patch("/personalDetails" , verifyToken, updatePersonalDetailsRoute);
candidateInfo.delete("/personalDetails" , verifyToken, deletePersonalDetailsRoute);

// routes for education 
candidateInfo.get("/education" , verifyToken, findpaginateEducationRoute);
candidateInfo.post("/education" ,  verifyToken, addEducationRoute);
candidateInfo.patch("/education" , verifyToken, updateEducationRoute);
candidateInfo.delete("/education" , verifyToken, deleteEducationRoute);

// routes for awards
candidateInfo.get("/awards" , verifyToken, findPaginateAwardRoute);
candidateInfo.post("/awards" , verifyToken, addAwardRoute);
candidateInfo.patch("/awards" , verifyToken, updateAwardRoute);
candidateInfo.delete("/awards" , verifyToken, deleteAwardRoute);

// routes for activities
candidateInfo.get("/activities" , verifyToken, findPaginateActivitiesRoute);
candidateInfo.post("/activities" , verifyToken, addActivitiesRoute);
candidateInfo.patch("/activities" , verifyToken, updateActivitiesRoute);
candidateInfo.delete("/activities" , verifyToken, deleteActivitiesRoute);

// routes for course
candidateInfo.get("/course" , verifyToken, findPaginateCourseRoute);
candidateInfo.post("/course" , verifyToken, addCourseRoute);
candidateInfo.patch("/course" , verifyToken, updateCourseRoute);
candidateInfo.delete("/course" , verifyToken, deleteCourseRoute);



export default candidateInfo