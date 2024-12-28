import { Router } from "express";
import { SaveWhiteListRoute , UpdateWhiteListRoute , GetWhiteListRoute , DeleteWhiteListRoute } from "./function/whitelist";
import { verifyToken } from "../../auth/authorizer";
import { haveAccess } from "../../auth/access";

const whiteListRoutes = Router()

//routes
whiteListRoutes.post("/whitelist" ,  SaveWhiteListRoute)
whiteListRoutes.patch("/verify-recruiter" ,verifyToken  , UpdateWhiteListRoute)
whiteListRoutes.get("/whitelist" ,verifyToken  , GetWhiteListRoute)
whiteListRoutes.delete("/whitelist" ,verifyToken  , DeleteWhiteListRoute)

export default whiteListRoutes

