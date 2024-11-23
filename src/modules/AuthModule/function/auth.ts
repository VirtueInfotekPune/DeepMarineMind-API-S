import { infoLogger , errorLogger , dataLogger } from "../../../core/logger";
import { catchResponse , successResponse , failureResponse } from "../../../core/response";
import { TempSignupModel } from "../../../models/tempSignup";
import { UserModel } from "../../../models/user";
import mongooseService from "../../../services/mongoose";


export const registerUser = async (req: any, res: any) => {
    try {

        let body = req.body

        infoLogger("START:- registerUser function");
        dataLogger("req.body", req.body);

        const { email , type } = req.body; 

        if (!email || !type ) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const existingUser = await mongooseService.findOne(UserModel , { email });

        if(existingUser) { 
            const response = failureResponse({  
                handler: "auth",
                messageCode: "E002",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const tempUser = await mongooseService.findOne(TempSignupModel, { email });

     
        body.emailOtp = Math.floor(1000 + Math.random() * 9000);
        let otpExpiry = new Date(new Date().getTime() + 5 * 60 * 1000);

        body.payload = JSON.stringify(body);
        let payload = {};
        if (tempUser) {
            payload = {
                emailOtp: body.emailOtp,
                otpExpiry : otpExpiry
            }
        } else {
            payload = {
                ...body,
                email: body.email,
                emailOtp: body.emailOtp,
                otpExpiry: otpExpiry,
            }
        }

        const result = await mongooseService.update(TempSignupModel, { email : email  }, payload, { upsert: true });


        if(result) {

            //logic for sending email
            //logic for sending otp


            const response = successResponse({
                handler: "auth",
                messageCode: "S001",
                req: req,
                data: "email send successfully",
            });
            return res.status(response?.statusCode).send(response);

        }

        else {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E003",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
  
    } catch (error) {
        errorLogger("error in registerUser function", error);
        const response = catchResponse({
            handler: "auth",
            messageCode: "E003",
            req: req,
            error: error,
        })
        return res.status(response?.statusCode).send(response);
        
    }
}