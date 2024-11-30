import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import awardService from "../../../services/candidateDetails/awards";


export const addAwardRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- addAwardRoute function");
        dataLogger("req.body", req.body);
        const result = await awardService.save(req.body);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S014",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in addAwardRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E026",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateAwardRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- findPaginateAwardRoute function");
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
        const result = await awardService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S013",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in findPaginateAwardRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E029",
            req: req,
            error: error
        });
    }
}

export const updateAwardRoute = async (req :any , res :any) => {
    try{
        infoLogger("START:- awardDetailsRoute function");
        dataLogger("req.body", req.body);
        const body = req.body
        const existingAward = await awardService.findOne({ _id: body.id });
        if (!existingAward) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0024",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0024",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await awardService.findOne(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S015",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in awardDetailsRoute function", error);        
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E027",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}


export const deleteAwardRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- deleteAwardRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingAward = await awardService.findOne({ _id: body.id });
        if (!existingAward) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0024",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0024",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await awardService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S016",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in deleteAwardRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E028",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}