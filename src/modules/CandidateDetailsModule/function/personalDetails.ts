import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import {dataLogger, errorLogger, infoLogger} from "../../../core/logger";
import personalDetailsService from "../../../services/candidateDetails/personalDetails";


export const addPersonalDetailsRoute = async (req:any , res:any) =>{
    try{
        infoLogger("START:- addPersonalDetailsRoute function");
        dataLogger("req.body", req.body);
        const existingPersonalDetails = await personalDetailsService.findOne({candidate: req.body.candidate});
        if(existingPersonalDetails){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E017",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const payload = req.body;
        const result = await personalDetailsService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S002",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in addPersonalDetailsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E004",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginatePersonalDetailsRoute = async (req :any , res :any) => {
        try{
            infoLogger("START:- findPersonalDetailsPaginateRoute function");
            const filter = {} as any;
            if(req.query.id) {
                filter._id = req.query.id;
            }
            if(req.query.candidate) {
                filter.candidate = req.query.candidate;
            }
            const oprion = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
            }

            const result = await personalDetailsService.paginate(filter, oprion);
            const response = successResponse({
                handler: "personalDetails",
                messageCode: "S001",
                req: req,
                data: result,
            });
            return res.status(response?.statusCode).send(response);
        }catch(error){
            errorLogger("error in findPersonalDetailsPaginateRoute function", error);
            const response = catchResponse({
                handler: "personalDetails",
                messageCode: "E007",
                req: req,
                error: error
            });
            return res.status(response?.statusCode).send(response);
        }
}

export const updatePersonalDetailsRoute = async (req:any , res:any) => {
    try{
        infoLogger("START:- updatePersonalDetailsRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await personalDetailsService.update(filter, body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S003",
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in updatePersonalDetailsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E005",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deletePersonalDetailsRoute = async (req:any , res:any) => {
    try{
        infoLogger("START:- deletePersonalDetailsRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E008",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = { _id: body.id };
        const result = await personalDetailsService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S004",
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in deletePersonalDetailsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E006",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}