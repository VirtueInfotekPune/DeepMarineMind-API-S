import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import courseService from "../../../services/candidateDetails/course";



export const addCourseRoute  = async (req: any, res: any) => {
    try{
        infoLogger("START:- addCourseRoute function");
        dataLogger("req.body", req.body);

        if(req.user.type !== 'candidate'){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E050",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const payload = {
            ...req.body,
            candidate: req.user._id
        };
        const result = await courseService.save(payload);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S010",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in addCourseRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E020",    
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateCourseRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- findPaginateCourseRoute function");
        dataLogger("req.body", req.body);
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.user._id || req.query.id;
        }
        if(req.query.candidate) {
            filter.candidate = req.query.candidate;
        }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort : { createdAt: -1 },
        }
        const result = await courseService.paginate(filter, options);
        dataLogger("result of save", result);
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S009",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in findPaginateCourseRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E023",    
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
} 

export const updateCourseRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- updateCourseRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0017",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await courseService.update(filter, body);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S011",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in updateCourseRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E021",    
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}
  
export const deleteCourseRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- deleteCourseRoute function");
        dataLogger("req.body", req.body);
        const body = req.body;
        const existingCourse = await courseService.findOne({ _id: body.id });
        if (!existingCourse) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E018",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        const filter = {} as any;
        if(!body.id){
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E0018",
                req: req,
            });
            return res.status(response?.statusCode).send(response); // Default to 400 for missing ID
        }
        filter._id = body.id;
        const result = await courseService.delete(filter);
        const response = successResponse({
            handler: "personalDetails",
            data: result,
            messageCode: "S012",
            req: req,
        });
        return res.status(response?.statusCode).send(response);
    }catch(error){
        errorLogger("error in deleteCourseRoute function", error);
        const response = catchResponse({    
            handler: "personalDetails",
            messageCode: "E022",    
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}