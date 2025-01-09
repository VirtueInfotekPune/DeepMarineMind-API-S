import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import whitelistService from "../../../services/whitelist";
import { USER_TYPE } from "../../../constants/types/userType";
import { whitelistDocument } from "../../../models/whitelist";
import { USER_ROLE } from "../../../constants/types/userRole";
import mongooseService from "../../../services/mongoose";
import { TempSignupModel } from "../../../models/tempSignup";


export const SaveWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
        dataLogger("req.body", req.body);
        const existingRequest = await whitelistService.findOne({ email: req.body.email });
        if (existingRequest) {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await whitelistService.save(req.body);
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S002",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);

    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E001",
            req: req,
        });
        return res.status(response?.statusCode).send(response);

    }
}


export const DeleteWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
        dataLogger("req.body", req.body);
        if (!req.body.id) {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E005",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await whitelistService.delete({ _id: req.body.id });
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S004",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E003",
            req: req,
        });
        return res.status(response?.statusCode).send(response);

    }
}

export const GetWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");

        const filter = {} as any;
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 }
        } as any;

        if (req.query.id) {
            filter._id = req.query.id;
        }
        if (req.query.email) {
            filter.email = new RegExp(req.query.email, "i");
        }
        const result = await whitelistService.paginate(filter, options);
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S001",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E006",
            req: req,
        });
        return res.status(response?.statusCode).send(response);

    }
}


export const UpdateWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START: UpdateWhiteListRoute function");
        dataLogger("Request body:", req.body);

        const body: whitelistDocument = req.body;

        if (!body.id) {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E005",
                req,
            });
            return res.status(response?.statusCode).send(response);
        }
        else if (!body.approvalStatus && body.approvalStatus !== "approved" && body.approvalStatus !== "rejected") {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E008",
                req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const findRequest = await whitelistService.findOne({ _id: body.id });
        if (!findRequest) {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E006",
                req,
            });
            return res.status(response?.statusCode).send(response);
        }

        if (body.approvalStatus === "approved") {
            const emailOtp = 123456;
            const otpExpiry = new Date(new Date().getTime() + 1 * 60 * 1000); // OTP valid for 1 minute

            const tempUserPayload = {
                name: findRequest.name,
                email: findRequest.email,
                phone: findRequest.phone,
                type: "recruiter", 
                role: "superadmin", 
                emailOtp,
                otpExpiry
            };

            const result = await mongooseService.update(
                TempSignupModel,
                { email: findRequest.email },
                tempUserPayload,
                { upsert: true }
            );

            if (result) {
                const whiteList = await whitelistService.update(
                    { _id: body.id },
                    { approvalStatus: "approved" }
                );

                const response = successResponse({
                    handler: "whiteList",
                    messageCode: "S006",
                    req,
                    data: { requestDoc : whiteList , 
                        tempSignupDoc : result,
                     },
                });
                return res.status(response?.statusCode).send(response);
            } else {
                const response = failureResponse({
                    handler: "whiteList",
                    messageCode: "E003",
                    req,
                });
                return res.status(response?.statusCode).send(response);
            }
        }

        else if (body.approvalStatus === "rejected") {
            
        const updatedWhitelist = await whitelistService.update(
            { _id: body.id },
            body
        );
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S007",
            req,
            data: updatedWhitelist,
        });
        return res.status(response?.statusCode).send(response);
        }

    } catch (error) {
        errorLogger("Error in UpdateWhiteListRoute function", error);

        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E003",
            req,
        });
        return res.status(response?.statusCode).send(response);
    }
};
