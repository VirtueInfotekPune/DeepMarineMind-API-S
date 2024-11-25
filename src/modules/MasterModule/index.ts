import { Router } from "express";
import {addVesselRoute , findPaginateVesselRoute, updateVesselRoute, deleteVesselRoute } from "./function/vessel";
import { addDepartmentRoute, deleteDepartmentRoute, findPaginateDepartmentRoute, updateDepartmentRoute } from "./function/department";
import { addRankRoute, findPaginateRankRoute, updateRankRoute, deleteRankRoute } from "./function/rank";
import { addCargoRoute, deleteCargoRoute, findPaginateCargoRoute, updateCargoRoute } from "./function/cargo";
import { findPaginateIndustryRoute, addIndustryRoute, updateIndustryRoute, deleteIndustryRoute } from "./function/industry";
const masterRoutes = Router()


//routes for Industry
masterRoutes.get("/industry" , findPaginateIndustryRoute)
masterRoutes.post("/industry" , addIndustryRoute)
masterRoutes.patch("/industry" , updateIndustryRoute)
masterRoutes.delete("/industry" , deleteIndustryRoute)

//routes for vessels
masterRoutes.get("/vessel" , findPaginateVesselRoute)
masterRoutes.post("/vessel" , addVesselRoute)
masterRoutes.patch("/vessel" , updateVesselRoute)
masterRoutes.delete("/vessel" , deleteVesselRoute)

// routes for department 
masterRoutes.get("/department" , findPaginateDepartmentRoute)
masterRoutes.post("/department" , addDepartmentRoute)
masterRoutes.patch("/department" , updateDepartmentRoute)
masterRoutes.delete("/department" , deleteDepartmentRoute)

// routes for rank 
masterRoutes.get("/rank" , findPaginateRankRoute)
masterRoutes.post("/rank" , addRankRoute)
masterRoutes.patch("/rank" , updateRankRoute)
masterRoutes.delete("/rank" , deleteRankRoute)

// routes for cargo 
masterRoutes.get("/cargo" , findPaginateCargoRoute)
masterRoutes.post("/cargo" , addCargoRoute)
masterRoutes.patch("/cargo" , updateCargoRoute)
masterRoutes.delete("/cargo" , deleteCargoRoute)



export default masterRoutes