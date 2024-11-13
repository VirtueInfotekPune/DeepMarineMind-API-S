import { errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, successResponse } from "../../../core/response";
import { Request ,Response } from "express";



export const hello = async (req: Request, res: Response) =>  {

    try {
        infoLogger("this is hello function")
        const response = successResponse({
            handler: "hello",
            messageCode: "S001",
            req: req,
            data: "hello",
        });
        return res.status(response?.statusCode).send(response);

    } catch (error) {
        errorLogger("error in hello function", error);
        const response = catchResponse({ handler: "hello", messageCode: "E001", req: req, error: error });

        return res.status(response?.statusCode).send(response);

    }


}
