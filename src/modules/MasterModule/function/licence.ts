import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import licencesService from "../../../services/master/licence";

export const findPaginateLicenceRoute = async (req:any, res :any) => {
    try{
        infoLogger("START:- findPaginateLicenceRoute function");
        const filter = {} as any;
        if(req.query.id){
            filter._id = req.query.id
        }

        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
        };
        const result = await licencesService.paginate(filter, options);
        const response = successResponse({
            handler: "master",
            messageCode: "S031",
            req: req,   
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateLicenceRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E048",    
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const addLicenceRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- addLicenceRoute function");
        dataLogger("req.body", req.body);
        const existingLicence = await licencesService.findOneLicence({name : req.body.name});
        if(existingLicence) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E044",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await licencesService.saveLicence(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S032",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addLicenceRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E038",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateLicenceRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- updateLicenceRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E049",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await licencesService.updateLicence(filter, body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S033",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in updateLicenceRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E046",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteLicenceRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- deleteLicenceRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E049",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await licencesService.deleteLicence(filter);
        const responce = successResponse({
            handler: "master",
            messageCode: "S034",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in deleteLicenceRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E047",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}