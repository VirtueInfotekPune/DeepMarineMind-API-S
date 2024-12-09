import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import experienceService from "../../../services/candidateDetails/experience";
import { USER_TYPE } from "../../../constants/types/userType";
import { FilterQuery } from "mongoose";
import { experienceDocument } from "../../../models/cabdidateDetails/experience";

export const addExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addExperienceRouter function");
        dataLogger("req.body", req.body);

        if (req.user.type !== USER_TYPE.CANDIDATE) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E046",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const payload = {
            ...req.body,
            candidate: req.user._id
        };
        const result = await experienceService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S022",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in addExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "personalDetails",
                messageCode: "E039",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findPaginateExperienceRouter function");
        const filter = {} as any;



        if (req.query.id) {
            filter._id = req.query.id
        }
        else if (req.user.type === USER_TYPE.CANDIDATE) {
            filter.candidate = req.user._id
        }
        else if (req.query.candidate) {
            filter.candidate = req.query.candidate
        }
        else if (req.query.type) {
            filter.type = req.query.type; // Filter by type (e.g., "offshore")
        }

        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },

        };
        const result = await experienceService.paginate(filter, options);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S021",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findPaginateExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "personalDetails",
                messageCode: "E042",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const updateExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateExperienceRouter function");
        dataLogger("req.body", req.body);
        const body = req.body;

        const existingExperience = await experienceService.findOne({ _id: body.id });
        if (!existingExperience) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E044",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = {} as FilterQuery<experienceDocument>;
        if (!body.id) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E045",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await experienceService.update(filter, body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S023",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E040",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteExperienceRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteExperienceRouter function");
        dataLogger("req.body", req.body);
        const body = req.body;

        const existingExperience = await experienceService.findOne({ _id: body.id });
        if (!existingExperience) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E044",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        if (!body.id) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E045",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        const filter = { _id: body.id };
        const result = await experienceService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S024",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in deleteExperienceRouter function", error);
        const response = catchResponse(
            {
                handler: "experience",
                messageCode: "E041",
                req: req,
                error: error
            });
        return res.status(response?.statusCode).send(response);
    }
}
