import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import vesselService from "../../../services/master/vessel";


export const addVesselRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- addVesselRoute function");
        dataLogger("req.body", req.body);
        const existingVessel = await vesselService.findOneVessel({name : req.body.name});

        if(existingVessel) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E002",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const result = await vesselService.saveVessel(req.body);
        const responce = successResponse({
            handler: "master",
            messageCode: "S002",
            req: req,
            data: result,
        })
        return res.status(responce?.statusCode).send(responce);
    } catch (error) {
        errorLogger("error in addVesselRoute function", error);
        const response = catchResponse({
            handler: "master",
            messageCode: "E001",
            req: req,
            error: error
        });
        return res.status(response?.statusCode).send(response);
    }
}


export const findPaginateVesselRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- findAllVesselRoute function");
        const filter = {} as any;
        if(req.query.id) {
            filter._id = req.query.id
        }
        else if(req.query.industry) {
            filter.industry = req.query.industry
        }

        const options = {
            page: req.query.page || 1,
            limit : req.query.limit || 10,
            sort: { createdAt: -1 },

        }

        const result = await vesselService.paginate(filter, options);
        const response = successResponse({
            handler: "master",
            messageCode: "S001",
            req: req,
            data: result,
        });
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in findAllVesselRoute function", error);

        const response = catchResponse({
            handler: "master",
            messageCode: "E001",
            req,
            error,
        });

        return res.status(response?.statusCode || 500).send(response); // Default to 500 in case of undefined statusCode
    }
};

export const updateVesselRoute = async (req: any, res: any) => {
    try {
        infoLogger("START:- updateVesselRoute function");
        dataLogger("req.body", req.body);

        const body = req.body;
        const filter = {} as any;

        if (!body.id) {
            const response = failureResponse({
                handler: "master",
                messageCode: "E001",
                req: req,
            });
            return res.status(response?.statusCode || 400).send(response); // Default to 400 for missing ID
        }

        filter._id = body.id;

        const result = await vesselService.updateVessel(filter, body);

        // Ensure result contains a statusCode, or use a default value
        const response = successResponse({
            handler: "master",
            data: result,
            messageCode: "S003",

        })
        return res.status(response?.statusCode).send(response);
    } catch (error) {
        errorLogger("error in updateVesselRoute function", error);

        const response = catchResponse({
            handler: "master",
            messageCode: "E001",
            req: req,
            error: error,
        });
        return res.status(response?.statusCode).send(response);
    }
};

export const deleteVesselRoute = async (req: any, res: any) => {
    try {

      infoLogger("START:- deleteVesselRoute function");
      dataLogger("req.body", req.body);
      const body = req.body;

      // Check if the ID is provided
      if (!body.id) {
        const response = failureResponse({
          handler: "master",
          messageCode: "E007", // "VesselID Not Found"
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }

      const filter = { _id: body.id };
      // Call the service to delete the vessel
      const result = await vesselService.deleteVessel(filter);
      
      // Check if the deletion was successful
        const response = successResponse({
          handler: "master",
          messageCode: "S004", // "Vessel deleted successfully"
          req: req,
          data: result,
        });
        return res.status(response?.statusCode).send(response);
      
    } catch (error) {
      errorLogger("error in deleteVesselRoute function", error);
  
      const response = catchResponse({
        handler: "master",
        messageCode: "E005", // "Error adding vessel" (general error fallback)
        req: req,
        error: error,
      });
      return res.status(response?.statusCode).send(response);
    }
};
  

