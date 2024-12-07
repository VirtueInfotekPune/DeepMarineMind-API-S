import {Router} from "express";
import { addFleetRoute, findPaginateFleetRoute, updateFleetRoute, deleteFleetRoute } from "./function/fleet";
import { verifyToken } from "../../auth/authorizer";
const recruiterDetailsRoutes = Router();


//routes for fleet
recruiterDetailsRoutes.get("/fleets" , findPaginateFleetRoute);
recruiterDetailsRoutes.post("/fleets" , verifyToken, addFleetRoute);
recruiterDetailsRoutes.patch("/fleets" , verifyToken, updateFleetRoute);
recruiterDetailsRoutes.delete("/fleets" , verifyToken, deleteFleetRoute);

export default recruiterDetailsRoutes