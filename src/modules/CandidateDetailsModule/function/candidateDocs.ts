import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { candidateDocsService } from "../../../services/candidateDetails/candidateDocs"
import { USER_TYPE } from "../../../constants/types/userType";

export const addCandidateDocsRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addCertificatedDocsRoute function");
        dataLogger("req.body", req.body);

        // Ensure only candidates can add documents
        if (req.user.type !== USER_TYPE.CANDIDATE) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E066",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        const { name } = req.body;

        // Validate that `name` is an array and has at least one entry
        if (!Array.isArray(name) || name.length === 0) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E068", // Custom error message code for validation
                req: req,
                error: "Name must be a non-empty array",
            });
            return res.status(response?.statusCode).send(response);
        }

        // Prepare payloads for each certificate name
        const payloads = name.map((certName: string) => ({
            name: certName,
            candidate: req.user._id,
        }));

        // Save all certificates to the database
        const result = await candidateDocsService.save(payloads);
        dataLogger("result of save", result);

        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S031",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in addCertificatedDocsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E067",
            req: req,
            error: error,
        });
        return res.status(response?.statusCode).send(response);
    }
};


export const findPaginateCandidateDocsRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findPaginateCertificatesDocsRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if (req.query.id) {
            filter.id = req.query.id;
        }
        if (req.query.candidate) {
            filter.candidate = req.query.candidate || req.user._id;
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
        }
        const result = await candidateDocsService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S030",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateCertificatesDocsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E071",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateCandidateDocsRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateCertificatedDocsRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E070",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await candidateDocsService.update(filter, body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S032",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateCertificatedDocsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E068",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteCandidateDocsRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteCertificatedDocsRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingCertificate = await candidateDocsService.findOne({ _id: body.id });
        if (!existingCertificate) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E070",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if (!body.id) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E066",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await candidateDocsService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S033",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteCertificatedDocsRoute function", error);
        const response = catchResponse({
            handler: "personalDetails",
            messageCode: "E069",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}