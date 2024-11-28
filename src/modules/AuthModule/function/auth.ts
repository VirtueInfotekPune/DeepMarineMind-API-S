import mongoose, { mongo } from "mongoose";
import { infoLogger, errorLogger, dataLogger } from "../../../core/logger";
import {
    catchResponse,
    successResponse,
    failureResponse,
} from "../../../core/response";
import {
    tempSignupDocument,
    TempSignupModel,
} from "../../../models/tempSignup";
import { UserModel } from "../../../models/user";
import mongooseService from "../../../services/mongoose";
import { RecruiterModel } from "../../../models/recruiter";
import * as jwt from "jsonwebtoken";
import * as  bcryptjs from "bcryptjs"
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const registerUser = async (req: any, res: any) => {
    try {
        let body = req.body;

        infoLogger("START:- registerUser function");
        dataLogger("req.body", req.body);

        const { email, type , role } = req.body;

        if (!email || !type) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        else if (type === 'recruiter' && !role) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E014",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const existingUser = await mongooseService.findOne(UserModel, { email });

        if (existingUser) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E002",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const tempUser = await mongooseService.findOne(TempSignupModel, { email });

        body.emailOtp = Math.floor(1000 + Math.random() * 9000);
        let otpExpiry = new Date(new Date().getTime() + 1 * 60 * 1000);

        body.payload = JSON.stringify(body);
        let payload = {};
        if (tempUser) {
            payload = {
                emailOtp: body.emailOtp,
                otpExpiry: otpExpiry,
                payload: body.payload,
            };
        } else {
            payload = {
                ...body,
                email: body.email,
                emailOtp: body.emailOtp,
                otpExpiry: otpExpiry,
            };
        }

        const result = await mongooseService.update(
            TempSignupModel,
            { email: email },
            payload,
            { upsert: true }
        );

        if (result) {
            //logic for sending email
            //logic for sending otp

            const response = successResponse({
                handler: "auth",
                messageCode: "S001",
                req: req,
                data: "email send successfully",
            });
            return res.status(response?.statusCode).send(response);
        } else {
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
        });
        return res.status(response?.statusCode).send(response);
    }
};

export const verifyotp = async (req: any, res: any) => {
    try {
        infoLogger("START:- verifyotp function");
        dataLogger("req.body", req.body);
        let query = {} as any;

        const { type, role, email, emailOtp, verificationType } = req.body;
        if (!email) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E004",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        } else if (!emailOtp) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E005",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        } else if (!type) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E007",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
       else if (type === 'recruiter' && !role) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E014",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        query.email = email;

        const tempUser = await mongooseService.findOne(TempSignupModel, query);

        if (!tempUser) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        dataLogger("tempUser", tempUser);

        if (verificationType === "register") {
            const payload = {} as any;
            const verifyOtp = emailOtp === tempUser.emailOtp;
            if (!verifyOtp) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E006",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            const IsOtpExpire =
                new Date(tempUser?.otpExpiry) < new Date(new Date().getTime());

            if (IsOtpExpire) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E009",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            payload.emailVerified = true;

            const result = await mongooseService.update(
                TempSignupModel,
                { email: email },
                payload,
                { new: true }
            );

            if (!result) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E010",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            dataLogger("result of update tempUser", result);

            const insertUser = await verifyUser(req, res, tempUser);

        }
        else {

            dataLogger("query", query);
            const user = await mongooseService.findOne(UserModel, { email: email });
            if (!user) {
                const response = await failureResponse({
                    handler: "auth",
                    messageCode: "E008",
                    req
                });
                return res.status(response?.statusCode).send(response);
            }

            const verifyOtp = emailOtp === tempUser.emailOtp;
            if (!verifyOtp) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E006",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            const IsOtpExpire =
                new Date(tempUser?.otpExpiry) < new Date(new Date().getTime());

            if (IsOtpExpire) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E009",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            const token = jwt.sign(
                {
                    expiresIn: Math.floor(Date.now() / 1000) + (6 * 30 * 24 * 60 * 60),
                    id: user._id,
                    client: user.recruiter,
                    type: user?.type,
                    email: user.email,
                    phone: user.phone,
                },
                process.env.JWT_ACCESS_SECRET as string

            )
            const response = await successResponse({
                handler: "auth",
                messageCode: "S004",
                req,
                data: { accessToken: token, refreshToken: token, user: { ...user._doc, password: undefined } }
            });
            return res.status(response?.statusCode).send(response);

        }
    } catch (error) {
        errorLogger("error in verify Otp", error);
        const response = await catchResponse({
            handler: "auth",
            messageCode: "E010",
            req,
            error,
        });
        return res.status(response?.statusCode).send(response);
    }
};

const verifyUser = async (req: any, res: any, tempUser: tempSignupDocument) => {
    try {
        infoLogger("START:- verifyUser function");
        dataLogger("tempUser", tempUser);

        const recruterId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();

        if (tempUser.type === "recruiter" && tempUser.payload !== undefined) {
            const tempUserPayload = JSON.parse(tempUser.payload);

            const insertRecruiter = {
                ...tempUserPayload,
                _id: recruterId,
                email: tempUser.email,
            };
            const insertUser = {
                ...tempUserPayload,
                _id: userId,
                email: tempUser.email,
                recruiter: recruterId,
            };

            const recruiter = await mongooseService.save(
                RecruiterModel,
                insertRecruiter
            );

            const user = await mongooseService.save(UserModel, insertUser);
            dataLogger("recruiter", recruiter);
            dataLogger("user", user);

            if (!recruiter || !user) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E011",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            const token = jwt.sign(
                {
                    expiresIn: Math.floor(Date.now() / 1000) + (6 * 30 * 24 * 60 * 60),
                    id: user._id,
                    recruiter: user.recruiter,
                    type: user?.type,
                    email: user.email,
                    phone: user?.phone,
                },
                process.env.JWT_ACCESS_SECRET as string
            );


            const response = successResponse({
                handler: "auth",
                messageCode: "S003",
                req: req,
                data: {
                    accessToken: token,
                    refreshToken: token,
                    user: { ...user, password: undefined },
                },
            });
            return res.status(response?.statusCode).send(response);
        } else if (
            tempUser.type === "candidate" &&
            tempUser.payload !== undefined
        ) {
            const tempUserPayload = JSON.parse(tempUser.payload);

            const insertUser = {
                ...tempUserPayload,
                _id: userId,
                email: tempUser.email,
            };

            const user = await mongooseService.save(UserModel, insertUser);

            dataLogger("user", user);

            if (!user) {
                const response = failureResponse({
                    handler: "auth",
                    messageCode: "E011",
                    req: req,
                });
                return res.status(response?.statusCode).send(response);
            }

            const token = jwt.sign(
                {
                    expiresIn: Math.floor(Date.now() / 1000) + (6 * 30 * 24 * 60 * 60),
                    id: user._id,
                    recruiter: user.recruiter,
                    type: user?.type,
                    email: user.email,
                    phone: user?.phone,
                },
                process.env.JWT_ACCESS_SECRET as string
            );

            const response = successResponse({
                handler: "auth",
                messageCode: "S003",
                req: req,
                data: {
                    accessToken: token,
                    refreshToken: token,
                    user: { ...user, password: undefined },
                },
            });
            return res.status(response?.statusCode).send(response);
        } else {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E011",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
    } catch (error) {
        errorLogger("error in verifyUser function", error);
        const response = catchResponse({
            handler: "auth",
            messageCode: "E011",
            req: req,
            error: error,
        });

        return res.status(response?.statusCode).send(response);
    }
};


export const Login = async (req: any, res: any) => {
    try {

        infoLogger("START:- Login function");
        dataLogger("req.body", req.body);

        const { email, password, type, role } = req.body;
        const filter = {} as any;

        if (role) {
            filter.role = role;
        }
        filter.email = email;
        filter.type = type;

        if (!email || !password) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E013",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        else if (type === 'recruiter' && !role) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E014",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const user = await UserModel.findOne(filter);

        if (!user) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        if(!user.password) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E017",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            const response = failureResponse({
                handler: "auth",
                messageCode: "E015",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const token = jwt.sign(
            {
                expiresIn: Math.floor(Date.now() / 1000) + (6 * 30 * 24 * 60 * 60),
                id: user._id,
                recruiter: user.recruiter,
                type: user?.type,
                email: user.email,
                phone: user?.phone,
            },
            process.env.JWT_ACCESS_SECRET as string
        );

        const response = successResponse({
            handler: "auth",
            messageCode: "S005",
            req: req,
            data: {
                accessToken: token,
                refreshToken: token,
                user: { ...user, password: undefined },
            },
        });
        return res.status(response?.statusCode).send(response);

    } catch (error) {
        errorLogger("error in Login function", error);
        const response = catchResponse({
            handler: "auth",
            messageCode: "E016",
            req: req,
            error: error,
        });

        return res.status(response?.statusCode).send(response);

    }

}




