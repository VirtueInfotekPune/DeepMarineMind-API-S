import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import departmentService from "../../../services/master/department";


export const addDepartmentRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addDepartmentRoute function");
        dataLogger("req.body", req.body);
       const exisitingDepartment = await departmentService.findOneDepartment({
           name: req.body.name,
           shiptype : req.body.shiptype,
           vessel : req.body.vessel
           
       })

       if(exisitingDepartment) {
           const response = failureResponse({
               handler: "master",
               messageCode: "E009",
               req: req,
           });
           return res.status(response?.statusCode).send(response);
       }
        const result = await departmentService.saveDepartment(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S007",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addDepartmentRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E010",
            req: req,    
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const findPaginateDepartmentRoute = async (req: any, res: any) => {
    try{
        infoLogger("START:- findPaginateDepartmentRoute function");
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id
        }
        else if(req.query.shiptype) {
            filter.shiptype = req.query.shiptype
        }
        else if(req.query.vessel){
            filter.vessel = req.query.vessel
        }

        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
        };

        const result = await departmentService.paginate(filter, options);
        const response = successResponse({
            handler: "master",
            messageCode: "S006",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);

    
        }   catch (error) {
        errorLogger("error in findPaginateDepartmentRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E013",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response); 
    }
} 

export const updateDepartmentRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateDepartmentRoute function");
        dataLogger("req.body", req.body);

        const body = req.body;  
        const filter = {} as any;

        if (!body.id) {
            const response = failureResponse({  
                handler: "master",
                messageCode: "E014",    
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }

        filter._id = body.id;    

        const result = await departmentService.updateDepartment(filter, body);

        // Ensure result contains a statusCode, or use a default value
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S008",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateDepartmentRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E004",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}

export const deleteDepartmentRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- deleteDepartmentRoute function");
        dataLogger("req.body", req.body);

        const body = req.body;

        // Check if the ID is provided
        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E015",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID 
        }

        const filter = { _id: body.id };

        const result = await departmentService.deleteDepartment(filter);

        // Ensure result contains a statusCode, or use a default value
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S009",
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {    
        errorLogger("error in deleteDepartmentRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E012",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
    
}


