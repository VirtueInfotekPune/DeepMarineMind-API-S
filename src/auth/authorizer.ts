import { NextFunction, Request, Response } from "express";
import { dataLogger, errorLogger, infoLogger } from "../core/logger";
import { catchResponse, failureResponse, UnauthorizedResponse } from "../core/response";
import { userDocument, UserModel  } from "../models/user";
import jwt from "jsonwebtoken";



// Extend the Express Request interface to include custom properties like recruiter, type, etc.
interface CustomRequest extends Request {
    recruiter?: string;
    type?: string;      
    userId?: string;
    user?: userDocument; 
}
  

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction)=> {
    infoLogger("START:- verifyToken function");
   
  const bearerHeader = req.headers?.Authorization || req.headers?.authorization;
  
  try {
    if (!bearerHeader || typeof bearerHeader !== 'string') {
      throw new Error("Authorization header not Found");
    }

    // Split the bearer token from the header
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    
    // Decode and verify the JWT token
    const decoded = jwt.verify(bearerToken, process.env.JWT_ACCESS_SECRET as string) as { id: string };

    if (decoded) {
      // Find the user based on the decoded token
      const user = await UserModel.findOne(
        { $or: [{ _id: decoded.id }, { recruiter: decoded.id }] },
        { password: 0 }
      ).populate("recruiter type");

      if (!user) {
        const response = await failureResponse({
          handler: "auth",
          messageCode: "E006",
          req,
        });
        return res.status(response?.statusCode).send(response);
      }

      
       dataLogger("user", user);
       req.recruiter = user.recruiter;  
       req.type = user.type;            
       req.userId = user._id ? user._id.toString() : undefined;
       req.user = user;    

      next();
    }
  } catch (error) {
    errorLogger("Authentication Failed", error);
    const response =  UnauthorizedResponse({
      handler: "auth",
      messageCode: "E018",
      req,
      error,
    });
    return res.status(response?.statusCode).send(response);
  } 
};
