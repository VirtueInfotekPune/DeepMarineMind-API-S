import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import industryService from "../../../services/master/industry";
import { Request, Response } from "express";

export const findPaginateIndustryRoute = async (req: Request, res: Response) => {
    try{
        infoLogger("START:- findPaginateIndustryRouter function");
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
        };
        const result = await industryService.paginate(filter, options);
        const response = successResponse({    
            handler: "master",
            messageCode: "S021",    
            req: req,
            data: result,
        })
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateIndustryRouter function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E034",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const addIndustryRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addIndustryRoute function");
        dataLogger("req.body", req.body);
        const existingIndustry = await industryService.findOneIndustry({name : req.body.name});
        if(existingIndustry) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E030",
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await industryService.saveIndustry(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S022",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addIndustryRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E031",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateIndustryRoute = async (req: any, res: any) => {
    try {   
        infoLogger("START:- updateIndustryRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E035",
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await industryService.updateIndustry(filter, body);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S023",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateIndustryRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E032",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteIndustryRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteIndustryRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E035",
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await industryService.deleteIndustry(filter);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S024",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteIndustryRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E033",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}