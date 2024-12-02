import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import educationService from "../../../services/candidateDetails/education";


export const addEducationRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addEductionRoute function");
        dataLogger("req.body", req.body);
        if(req.user.type !== 'candidate'){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E047",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const payload = {
            ...req.body,
            candidate: req.user._id
        };
        const result = await educationService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S006",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in addEductionRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E012",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findpaginateEducationRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findpaginateEducationRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.user._id || req.query.id;
        }
        if(req.query.candidate) {
            filter.candidate = req.query.candidate;
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort : { createdAt: -1 },
        }
        const result = await educationService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S005",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findpaginateEducationRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E007",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateEducationRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateEducationRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0016",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await educationService.update(filter, body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S007",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateEducationRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E013",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteEducationRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteEducationRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0016",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await educationService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S008",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteEducationRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E014",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}
        