import { Router } from "express";
import {addVesselRoute , 
        findPaginateVesselRoute,
        updateVesselRoute, 
        deleteVesselRoute } from "./function/vessel";


const vesselRoutes = Router()


//routes 
vesselRoutes.get("/vessel" , findPaginateVesselRoute)
vesselRoutes.post("/vessel" , addVesselRoute)
vesselRoutes.patch("/vessel" , updateVesselRoute)
vesselRoutes.delete("/vessel" , deleteVesselRoute)


export default vesselRoutes