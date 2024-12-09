import { infoLogger, errorLogger, dataLogger } from "../../../core/logger";
import { userDocument } from "../../../models/user";
import bcrypjs from "bcryptjs";
import { userService } from "../../../services/user";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";

export const updateUserRoute = async (req: any, res: any) => {
  infoLogger("START:- updateUserRoute function");
  dataLogger("req.body", req.body);

  try {
    const body: userDocument = req.body;

    const requestUser = req.user;

    dataLogger("requestUser", requestUser);

    if (body.password) {
      const password = await bcrypjs.hash(body.password, 10);
      body.password = password;
    } else if (body.email) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E008",
        req,
      });
      return res.status(response?.statusCode).send(response);
    } else if (body.phone) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E009",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const filter = {} as any;

    if (requestUser.type == "superadmin") {
      filter._id = body.id;
    } else {
      filter._id = requestUser._id;
    }

    const result = await userService.updateUser(filter, body);

    if (!result) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E004",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: "user",
      data: result,
      messageCode: "S002",
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in updateUserRoute function", error);

    const response = catchResponse({
      handler: "user",
      messageCode: "E004",
      req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const userProfile = async (req: any, res: any) => {
  try {

    const user = req.user;

    const response = successResponse({
      handler: "user",
      data: {
        userData :  { ...user , password : undefined },
      },
      messageCode: "S005",
      req
    });
    return res.status(response?.statusCode).send(response);
    
  } catch (error) {

    errorLogger("error in userProfile function", error);

    const response = catchResponse({  
      handler: "user",
      messageCode: "E006",
      req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
    
  }
};