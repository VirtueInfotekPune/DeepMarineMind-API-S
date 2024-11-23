import { Router } from "express";
import {addVesselRoute , 
        findAllVesselRoute,
        updateVesselRoute, 
        deleteVesselRoute } from "./function/vessel";


const vesselRoutes = Router()


//routes 
vesselRoutes.get("/vessel" , findAllVesselRoute)
vesselRoutes.post("/vessel" , addVesselRoute)
vesselRoutes.patch("/vessel" , updateVesselRoute)
vesselRoutes.delete("/vessel" , deleteVesselRoute)


export default vesselRoutes