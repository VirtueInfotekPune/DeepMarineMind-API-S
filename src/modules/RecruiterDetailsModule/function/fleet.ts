import { errorLogger, dataLogger, infoLogger } from "../../../core/logger";
import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import fleetService from "../../../services/recruiterDetails/fleet";



export const findPaginateFleetRoute = async (req : any , res : any) => {
    try{
        infoLogger("START:- findPaginateFleetRoute function");
        dataLogger("req.body", req.body);

        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id;
        }
        if(req.query.recruiter) {
            filter.recruiter = req.query.recruiter;
        }
        const options = {
            page : req.query.page || 1,
            limit : req.query.limit || 10,
            sort : { createdAt : -1 }
        }
        const result = await fleetService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "recruiterDetaiils",
            messageCode: "S001",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);

    }catch(error){
        errorLogger("error in findPaginateFleetRoute function", error);
        const response = catchResponse({
            handler: "recruiterDetaiils",
            messageCode: "E001",
            req: req,
            error: error,
        })
        return res.status(response?.statusCode).send(response);
    }
}

export const addFleetRoute = async (req : any , res : any) => {
    try{
        infoLogger("START:- addFleetRoute function");
        dataLogger("req.body", req.body);

        if(req.user.type !== 'recruiter'){
            const response = failureResponse({
                handler: "recruiterDetaiils",
                messageCode: "E001",
                req: req,
            })
            return res.status(response?.statusCode).send(response);
        }
        const payload = {
            ...req.body,
            recruiter : req.user._id
        }
        const result = await fleetService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "recruiterDetaiils",
            messageCode: "S002",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in addFleetRoute function", error);
        const response = catchResponse({
            handler: "recruiterDetaiils",
            messageCode: "E002",
            req: req,
            error: error,
        })
        return res.status(response?.statusCode).send(response);
    }
}

export const updateFleetRoute = async (req : any , res : any) => {
    try{
        infoLogger("START:- updateFleetRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        console.log("body",body)
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "recruiterDetaiils",
                messageCode: "E003",
                req: req,
            })
            return res.status(response?.statusCode).send(response);
        }
        filter._id = body.id;
        const result = await fleetService.update(filter, body); 
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "recruiterDetaiils",
            messageCode: "S003",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in updateFleetRoute function", error);
        const response = catchResponse({
            handler: "recruiterDetaiils",
            messageCode: "E003",
            req: req,
            error: error,
        })
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteFleetRoute = async (req : any , res : any) => {
    try{
        infoLogger("START:- deleteFleetRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;

        const existingFleet = await fleetService.findOne({_id : body.id});
        if(!existingFleet){
            const response = failureResponse({  
                handler: "recruiterDetaiils",
                messageCode: "E006",
                req: req,
            })
            return res.status(response?.statusCode).send(response);
        }
        if(!body.id){
            const response = failureResponse({
                handler: "recruiterDetaiils",
                messageCode: "E005",
                req: req,
            })
            return res.status(response?.statusCode).send(response);
        }
        filter._id = body.id;
        const result = await fleetService.delete(filter); 
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "recruiterDetaiils",
            messageCode: "S004",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in deleteFleetRoute function", error);
        const response = catchResponse({
            handler: "recruiterDetaiils",
            messageCode: "E004",
            req: req,
            error: error,
        })
        return res.status(response?.statusCode).send(response);
    }
}