import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { errorLogger, infoLogger, dataLogger } from "../../../core/logger";
import ashoreJobService from "../../../services/candidateDetails/ashoreJobExp";


export const addAshoreRoute  = async (req : any, res : any) => {
    try{
        infoLogger("START:- addAshoreRoute function");
        dataLogger("req.body", req.body);
        if(req.user.type !== 'candidate'){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E052",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const payload = {...req.body, candidate : req.user._id};
        const result = await ashoreJobService.save(payload);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S026",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in addAshoreRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E056",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateAshoreRoute = async (req : any, res : any) => {
    try{
        infoLogger("START:- findPaginateAshoreRoute function");
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
        const result = await ashoreJobService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S025",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in findPaginateAshoreRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E059",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteAshoreRoute = async (req : any, res : any) => {
    try{
        infoLogger("START:- deleteAshoreRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingAshore = await ashoreJobService.findOne({ _id: body.id });
        if (!existingAshore) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E060",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E061",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await ashoreJobService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S028",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in deleteAshoreRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E058",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateAshoreRoute = async (req : any, res : any) => {
    try{
        infoLogger("START:- updateAshoreRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if(!req.body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E061",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = req.body.id;
        const result = await ashoreJobService.update(filter, req.body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S027",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in updateAshoreRoute function", error);
        const response = catchResponse({
            handler: "personalDetails", 
            messageCode: "E057",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}