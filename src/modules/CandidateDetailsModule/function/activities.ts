import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import activityService from "../../../services/candidateDetails/activities";

export const addActivitiesRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- addActivitiesRoute function");
        dataLogger("req.body", req.body);
        const result = await activityService.save(req.body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S018",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in addActivitiesRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E032",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateActivitiesRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- findPaginateActivitiesRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id;
        }
        if(req.query.candidate) {
            filter.candidate = req.query.candidate;
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        }
        const result = await activityService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S017",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in findPaginateActivitiesRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E035",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateActivitiesRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- updateActivitiesRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if(!req.body.id){    
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E031",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = req.body.id;
        const result = await activityService.update(filter, req.body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S019",
            req: req,        
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateActivitiesRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E033",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteActivitiesRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- deleteActivitiesRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingActivity = await activityService.findOne({ _id: body.id });
        if (!existingActivity) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E030",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E031",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await activityService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S020",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteActivitiesRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E034",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}