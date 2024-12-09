import { Router } from "express";
import { SaveWhiteListRoute , UpdateWhiteListRoute , GetWhiteListRoute , DeleteWhiteListRoute } from "./function/whitelist";
import { verifyToken } from "../../auth/authorizer";
import { haveAccess } from "../../auth/access";

const whiteListRoutes = Router()

//routes
whiteListRoutes.post("/whitelist" ,  SaveWhiteListRoute)
whiteListRoutes.patch("/whitelist" ,verifyToken , haveAccess(["superadmin"]) , UpdateWhiteListRoute)
whiteListRoutes.get("/whitelist" ,verifyToken , haveAccess(["superadmin"]) , GetWhiteListRoute)
whiteListRoutes.delete("/whitelist" ,verifyToken , haveAccess(["superadmin"]) , DeleteWhiteListRoute)

export default whiteListRoutes

