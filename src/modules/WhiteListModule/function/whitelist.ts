import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import whitelistService from "../../../services/whitelist";
import { USER_TYPE } from "../../../constants/types/userType";


export const SaveWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
        dataLogger("req.body", req.body);
        const existingRequest = await whitelistService.findOne({email : req.body.email});
        if (existingRequest) {
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await whitelistService.save(req.body);
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S002",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);

    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E001",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
        
    }
}


export const DeleteWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
        dataLogger("req.body", req.body);
        if(!req.body.id){
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E005",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await whitelistService.delete({_id : req.body.id});
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S004",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E003",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
        
    }
}

export const GetWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
       
        const filter = {} as any;
        const options = {
            page : req.query.page || 1,
            limit : req.query.limit || 10,
            sort : { createdAt : -1 }
        } as any;

        if(req.query.id){
            filter._id = req.query.id;
        }
        if(req.query.email){
            filter.email = new RegExp(req.query.email, "i");
        }
        const result = await whitelistService.paginate(filter , options);
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S001",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E006",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
        
    }
}


export const UpdateWhiteListRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- whiteListRoute function");
        dataLogger("req.body", req.body);
        if(!req.body.id){
            const response = failureResponse({
                handler: "whiteList",
                messageCode: "E005",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        
        // todo : for dev not required
        // if(req.body.approvalStatus && req.user.type !== USER_TYPE.SUPERADMIN){
        //     const response = failureResponse({
        //         handler: "whiteList",
        //         messageCode: "E007",
        //         req: req,
        //     });
        //     return res.status(response?.statusCode).send(response);
        // }
        const result = await whitelistService.update({_id : req.body.id} , req.body);
        const response = successResponse({
            handler: "whiteList",
            messageCode: "S003",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in whiteListRoute function", error);
        const response = catchResponse({
            handler: "whiteList",
            messageCode: "E003",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
        
    }
}