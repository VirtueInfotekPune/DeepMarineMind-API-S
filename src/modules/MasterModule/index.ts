import { Router } from "express";
import {addVesselRoute , 
        findPaginateVesselRoute,
        updateVesselRoute, 
        deleteVesselRoute } from "./function/vessel";
import { addDepartmentRoute, deleteDepartmentRoute, findPaginateDepartmentRoute, updateDepartmentRoute } from "./function/department";


const masterRoutes = Router()



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


export default masterRoutes