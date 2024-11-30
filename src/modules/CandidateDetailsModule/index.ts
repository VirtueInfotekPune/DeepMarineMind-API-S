import { Router } from "express";
import { addPersonalDetailsRoute, deletePersonalDetailsRoute, findPaginatePersonalDetailsRoute, updatePersonalDetailsRoute } from "./function/personalDetails";
import { addEducationRoute, deleteEducationRoute, findpaginateEducationRoute, updateEducationRoute } from "./function/education";
import { addAwardRoute, deleteAwardRoute, findPaginateAwardRoute, updateAwardRoute } from "./function/awards";
import { addCourseRoute, deleteCourseRoute, findPaginateCourseRoute, updateCourseRoute } from "./function/course";
import { addActivitiesRoute, deleteActivitiesRoute, findPaginateActivitiesRoute, updateActivitiesRoute } from "./function/activities";
import {addExperienceRoute, deleteExperienceRoute, findPaginateExperienceRoute, updateExperienceRoute} from "./function/experience";
const candidateInfo = Router();


// routes for candidate experience 
candidateInfo.get("/experience" , findPaginateExperienceRoute);
candidateInfo.post("/experience" , addExperienceRoute);
candidateInfo.patch("/experience" , updateExperienceRoute);
candidateInfo.delete("/experience" , deleteExperienceRoute);

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

// routes for awards
candidateInfo.get("/awards" , findPaginateAwardRoute);
candidateInfo.post("/awards" , addAwardRoute);
candidateInfo.patch("/awards" , updateAwardRoute);
candidateInfo.delete("/awards" , deleteAwardRoute);

// routes for activities
candidateInfo.get("/activities" , findPaginateActivitiesRoute);
candidateInfo.post("/activities" , addActivitiesRoute);
candidateInfo.patch("/activities" , updateActivitiesRoute);
candidateInfo.delete("/activities" , deleteActivitiesRoute);

// routes for course
candidateInfo.get("/course" , findPaginateCourseRoute);
candidateInfo.post("/course" , addCourseRoute);
candidateInfo.patch("/course" , updateCourseRoute);
candidateInfo.delete("/course" , deleteCourseRoute);



export default candidateInfo