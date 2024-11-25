import { info } from "console";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import rankService from "../../../services/master/rank";


export const findPaginateRankRoute = async (req: any, res: any) => {
   try{
    infoLogger("START:- findPaginateRankRoute function");
    const filter = {} as any;
    if(req.query.id) {
        filter._id = req.query.id
    }

    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: { createdAt: -1 },
    };

    const result = await rankService.paginate(filter, options);
    const response = successResponse({    
        handler: "master",
        messageCode: "S011",    
        req: req,
        data: result,
    })
    return res.status(response?.statusCode).send(response);
   } catch (error) {
    errorLogger("error in findPaginateRankRoute function", error);
    const response = catchResponse({
        handler: "master",
        req: req,
        messageCode: "E020",
        error: error
    });
    return res.status(response?.statusCode).send(response);
   }
}
   
export const addRankRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addRankRoute function");
        dataLogger("req.body", req.body);
        const existingRank = await rankService.findOneRank({name : req.body.name});

        if(existingRank) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E016",
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await rankService.saveRank(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S012",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addRankRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E017",
            error: error
        }); 
        return res.status(response?.statusCode).send(response);
    }
}

export const updateRankRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateRankRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E028",
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await rankService.updateRank(filter, body);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S013",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateRankRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E018",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteRankRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteRankRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                req: req,
                messageCode: "E028",
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await rankService.deleteRank(filter);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S014",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteRankRoute function", error);
        const response = catchResponse({
            handler: "master",
            req: req,
            messageCode: "E019",
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}