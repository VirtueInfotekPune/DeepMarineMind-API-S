import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import certificateService from "../../../services/master/certificates";

export const findCertificatePaginateRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findCertificatePaginateRoute function in master module");
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id
        }
        const options = {
            page: req.query.page,
            limit: req.query.limit,
            sort: { createdAt: -1 },
        }
        const result = await certificateService.paginate(filter, options);
        const response = successResponse({
            handler: "master",
            messageCode: "S026",
            req: req,
            data: result,
        })
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findCertificatePaginateRoute function in master module", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E041",
            req: req,
            error: error,
        });
        return res.status(response?.statusCode).send(response);
    }

}

export const addCertificateRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addCertificateRoute function in master module");
        dataLogger("req.body", req.body);
        const existingCertificate = await certificateService.findOneCertificate({name : req.body.name});
        if(existingCertificate) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E037",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await certificateService.saveCertificate(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S027",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addCertificateRoute function in master module", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E038",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateCertificateRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- updateCertificateRoute function in master module");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E042",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await certificateService.updateCertificate(filter, body);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S028",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateCertificateRoute function in master module", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E025",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteCertificateRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteCertificateRoute function in master module");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingCertificates = await certificateService.findOneCertificate({ _id: body.id });
        if (!existingCertificates) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E042",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E042",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await certificateService.deleteCertificate(filter);
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S029",
        });        
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteCertificateRoute function in master module", error);
        const response = catchResponse({        
            handler: "master",
            messageCode: "E040",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}
