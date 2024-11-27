import {Router} from "express";
import {addExperienceRoute , deleteExperienceRoute, findPaginateExperienceRoute, updateExperienceRoute} from "./function/experience";


const experienceRoutes = Router();


//routes
experienceRoutes.get("/" , findPaginateExperienceRoute);
experienceRoutes.post("/" , addExperienceRoute);
experienceRoutes.patch("/" , updateExperienceRoute);
experienceRoutes.delete("/" , deleteExperienceRoute);


export default experienceRoutes;