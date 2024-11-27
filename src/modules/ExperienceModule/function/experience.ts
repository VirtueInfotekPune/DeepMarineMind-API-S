import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import experienceService from "../../../services/experience";

export const addExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addExperienceRouter function");
        dataLogger("req.body", req.body);
        const payload = req.body;
        const result = await experienceService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "experience",
            messageCode: "S002",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in addExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E016",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findPaginateExperienceRouter function");
        const filter = {} as any;

        if (req.query.id) {                       // retrive object by id using query
            filter._id = req.query.id
        }
        if (req.query.name) {                    // retrive object by name using query
            filter.name = req.query.name
        }
        if(req.query.candidate){                   // retrive object by candidate ObjetId using query
            filter.candidate = req.query.candidate
        }
        const options = {
            page: req.query.page || 1,              
            limit: req.query.limit || 10,
        };
        const result = await experienceService.paginate(filter, options);
        const response = successResponse({
            handler: "experience",
            messageCode: "S001",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E007",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateExperienceRouter function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "experience",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await experienceService.update(filter, body);
        const response = successResponse({
            handler: "experience",
            data: result,
            messageCode: "S003",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E005",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteExperienceRouter function");
        dataLogger("req.body", req.body);
        const body = req.body;
        if (!body.id) {
            const response = failureResponse({
                handler: "experience",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = { _id: body.id };
        const result = await experienceService.delete(filter);
        const response = successResponse({
            handler: "experience",
            data: result,
            messageCode: "S004",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E006",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}
