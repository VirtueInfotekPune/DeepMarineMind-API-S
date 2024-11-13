import { Router } from "express";
import { hello } from "./function/hello";


const hellooRoutes = Router()


//routes 
hellooRoutes.get("/" , hello)


export default hellooRoutes