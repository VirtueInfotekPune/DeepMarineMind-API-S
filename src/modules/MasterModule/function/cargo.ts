
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import cargoService from "../../../services/master/cargo";


export const findPaginateCargoRoute = async (req: any, res: any) => {
    infoLogger("START:- findPaginateCargoRoute function");
    const filter = {} as any;
    if(req.query.id) {
        filter._id = req.query.id    
    }
    if(req.query.name) {
        filter.name = req.query.name
    }
    const options = {    
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };
    try {
        const result = await cargoService.paginate(filter, options);
        const response = successResponse({
            handler: "master",
            messageCode: "S016",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateCargoRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E027",
            req: req,
            error: error,
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const addCargoRoute = async (req: any, res: any) => {
    infoLogger("START:- addCargoRoute function");
    dataLogger("req.body", req.body);
    try {
        const existingCargo = await cargoService.findOneCargo({name : req.body.name});

        if(existingCargo) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E023",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await cargoService.saveCargo(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S017",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addCargoRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E017",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateCargoRoute = async (req: any, res: any) => {
    infoLogger("START:- updateCargoRoute function");
    dataLogger("req.body", req.body);
    try {
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E028",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await cargoService.updateCargo(filter, body);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S018",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateCargoRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E025",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteCargoRoute = async (req: any, res: any) => {
    infoLogger("START:- deleteCargoRoute function");
    dataLogger("req.body", req.body);
    try {
        const body = req.body;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E028",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = { _id: body.id };
        const result = await cargoService.deleteCargo(filter);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S019",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteCargoRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E026",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}