import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import shipTypeService from "../../../services/master/shipType";


export const addShipTypeRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addShipTypeRoute function");
        dataLogger("req.body", req.body);
        const existingShipType = await shipTypeService.findOne({
            name: req.body.name,
            vessel: req.body.vessel,
        });

        if (existingShipType) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E044",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const result = await shipTypeService.save(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S031",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addShipTypeRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E045",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findAllPaginateShipTypeRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findAllPaginateShipTypeRoute function");
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id
        }
        else if (req.query.vessel) {
            filter.vessel = req.query.vessel
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
        };
        const result = await shipTypeService.paginate(filter, options);
        const responce = successResponse({
            handler: "master",
            messageCode: "S031",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in findAllPaginateShipTypeRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E048",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateShipTypeRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateShipTypeRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E050",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await shipTypeService.update(filter, body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S033",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in updateShipTypeRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E046",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteShipTypeRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteShipTypeRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
  
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = { _id: body.id };
        const result = await shipTypeService.delete(filter);
        const responce = successResponse({
            handler: "master",
            messageCode: "S034",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in deleteShipTypeRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E047",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}