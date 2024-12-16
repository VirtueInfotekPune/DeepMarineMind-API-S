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
import * as bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { whitelistModel } from "../../../models/whitelist";
import { USER_TYPE } from "../../../constants/types/userType";
import { USER_ROLE } from "../../../constants/types/userRole";


// Load environment variables
dotenv.config();

export const registerUser = async (req: any, res: any) => {
  try {
    let body = req.body;

    infoLogger("START:- registerUser function");
    dataLogger("req.body", req.body);

    const { email, type, role } = req.body;

    if (!email || !type) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E001",
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

    if (
      tempUser && tempUser.type === USER_TYPE.RECRUITER &&
      tempUser.role === USER_ROLE.Team
    ) {
      const getRecruiter = await mongooseService.findOne(RecruiterModel, {
        _id: tempUser.recruiter,
      });

      if (!getRecruiter) {
        const response = failureResponse({
          handler: "auth",
          messageCode: "E023",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }

      const emailOtp = 123456;
      let otpExpiry = new Date(new Date().getTime() + 1 * 60 * 1000);
      body.payload = JSON.stringify(body);

      const updatePayload = {
        emailOtp,
        otpExpiry,
        payload: body.payload,
      };

      const updateTempUser = await mongooseService.update(
        TempSignupModel,
        { email },
        updatePayload,
        { new: true }
      );

      if (updateTempUser) {
        // todo : logic for sending email
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
    }

    if (type === "recruiter" && !role) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E014",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // if(type === "recruiter" && role === "superadmin"){
    //     const isWhilteListed = await mongooseService.findOne(whitelistModel, { email });

    //     if(!isWhilteListed){
    //         const response = failureResponse({
    //             handler: "auth",
    //             messageCode: "E020",
    //             req: req,
    //         });
    //         return res.status(response?.statusCode).send(response);
    //     }
    //     const isApprove = isWhilteListed.approvalStatus === "approved"? true : false;

    //     if(!isApprove){
    //         const code: string = isWhilteListed.approvalStatus === "pending" ? "E021" : isWhilteListed.approvalStatus === "rejected" ? "E022" : "E023";
    //         const response = failureResponse({
    //             handler: "auth",
    //             messageCode: code ,
    //             req: req,
    //         });
    //         return res.status(response?.statusCode).send(response);
    //     }
    // }

    body.emailOtp = 123456;
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
      // todo : logic for sending email
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
    } else if (type === "recruiter" && !role) {
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
    } else {
      dataLogger("query", query);
      const user = await mongooseService.findOne(UserModel, { email: email });
      if (!user) {
        const response = await failureResponse({
          handler: "auth",
          messageCode: "E008",
          req,
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
          expiresIn: Math.floor(Date.now() / 1000) + 6 * 30 * 24 * 60 * 60,
          id: user._id,
          client: user.recruiter,
          type: user?.type,
          email: user.email,
          phone: user.phone,
        },
        process.env.JWT_ACCESS_SECRET as string
      );
      const response = await successResponse({
        handler: "auth",
        messageCode: "S004",
        req,
        data: {
          accessToken: token,
          refreshToken: token,
          user: { ...user._doc, password: undefined },
        },
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

    if (
      tempUser.type === "recruiter" &&
      tempUser.role === USER_ROLE.SUPERADMIN &&
      tempUser.payload !== undefined
    ) {
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
          expiresIn: Math.floor(Date.now() / 1000) + 6 * 30 * 24 * 60 * 60,
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
          user: { ...user._doc, password: undefined },
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

      const userData = await mongooseService.save(UserModel, insertUser);

      dataLogger("user", userData);

      if (!userData) {
        const response = failureResponse({
          handler: "auth",
          messageCode: "E011",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }

      const token = jwt.sign(
        {
          expiresIn: Math.floor(Date.now() / 1000) + 6 * 30 * 24 * 60 * 60,
          id: userData._id,
          recruiter: userData.recruiter,
          type: userData?.type,
          email: userData.email,
          phone: userData?.phone,
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
          user: { ...userData._doc, password: undefined },
        },
      });
      return res.status(response?.statusCode).send(response);
    } else if (
      tempUser.type === "recruiter" &&
      tempUser.role === USER_ROLE.Team &&
      tempUser.payload !== undefined
    ) {
      const payload = {
        _id: userId,
        email: tempUser.email,
        type: tempUser.type,
        role: tempUser.role,
        recruiter: tempUser.recruiter,
        right: tempUser.right,
      };
      const teamUser = await mongooseService.save(UserModel, payload);
      dataLogger("teamUser", teamUser);

      if (!teamUser) {
        const response = failureResponse({
          handler: "auth",
          messageCode: "E011",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }

      const token = jwt.sign(
        {
          expiresIn: Math.floor(Date.now() / 1000) + 6 * 30 * 24 * 60 * 60,
          id: teamUser._id,
          recruiter: teamUser.recruiter,
          type: teamUser?.type,
          email: teamUser.email,
          phone: teamUser?.phone,
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
          user: { ...teamUser._doc, password: undefined },
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

    const { email, password, type } = req.body;
    const filter = {} as any;

    // if (role) {
    //   filter.role = role;
    // }
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
    // else if (type === "recruiter" && !role) {
    //   const response = failureResponse({
    //     handler: "auth",
    //     messageCode: "E014",
    //     req: req,
    //   });
    //   return res.status(response?.statusCode).send(response);
    // }

    dataLogger("filter", filter);

    const user = await mongooseService.findOne(UserModel, filter);

    if (!user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E008",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    if (!user.password) {
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
        expiresIn: Math.floor(Date.now() / 1000) + 6 * 30 * 24 * 60 * 60,
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
        user: { ...user._doc, password: undefined },
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
};

export const forgotPassword = async (req: any, res: any) => {
  try {
    infoLogger("START:- forgotPassword function");
    dataLogger("req.body", req.body);

    const { email, type, role } = req.body;

    if (!email || !type) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const user = await mongooseService.findOne(TempSignupModel, { email });

    if (!user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E008",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    } else if (type === "recruiter" && !role) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E014",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Generate OTP and expiry
    const emailOtp = 123456;
    const otpExpiry = new Date(new Date().getTime() + 1 * 60 * 1000); // OTP valid for 5 minutes

    // Update user schema with OTP and expiry
    const updatePayload = { emailOtp, otpExpiry };
    const result = await mongooseService.update(
      TempSignupModel,
      { email, type },
      updatePayload,
      { new: true }
    );

    if (result) {
      // todo : Logic to send email with OTP
      // Example: await sendOtpEmail(email, otp);

      const response = successResponse({
        handler: "auth",
        messageCode: "S001",
        req: req,
        data: "OTP sent to registered email.",
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
    errorLogger("error in forgotPassword function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E016",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const resetPassword = async (req: any, res: any) => {
  try {
    infoLogger("START:- resetPassword function");
    dataLogger("req.body", req.body);

    const { email, type, emailOtp, newPassword } = req.body;

    // Validate required fields
    if (!email || !type || !emailOtp || !newPassword) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Fetch the user from TempSignupModel
    const user = await mongooseService.findOne(TempSignupModel, {
      email,
      type,
    });

    if (!user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E008",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Check if the OTP matches and is not expired
    if (user.emailOtp !== emailOtp || new Date(user.otpExpiry) < new Date()) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E009", // Custom message code for invalid or expired OTP
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the user's password in UserModel
    const updateResult = await mongooseService.update(
      UserModel,
      { email, type },
      { password: hashedPassword },
      { new: true }
    );

    if (updateResult) {
      // Remove OTP details from TempSignupModel (optional, for security)
      await mongooseService.update(
        TempSignupModel,
        { email, type },
        { emailOtp: null, otpExpiry: null },
        {}
      );

      const response = successResponse({
        handler: "auth",
        messageCode: "S006", // Custom success message code for password reset
        req: req,
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
    errorLogger("error in resetPassword function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E016",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};
