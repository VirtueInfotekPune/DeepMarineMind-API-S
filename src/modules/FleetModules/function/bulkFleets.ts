import { USER_TYPE } from "../../../constants/types/userType";
import { errorLogger, dataLogger, infoLogger } from "../../../core/logger";
import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import fleetService from "../../../services/fleet/fleet";
import industryService from "../../../services/master/industry"; // Import the industry service

export const addBulkFleetRoute = async (req : any, res: any) => {
    try {
        infoLogger("START:- addBulkFleetRoute function");
        dataLogger("req.body", req.body);

        // Check user type
        if (req.user.type === USER_TYPE.CANDIDATE) {
            const response = failureResponse({
                handler: "fleet",
                messageCode: "E001",
                req: req,
            });
            return res.status(response.statusCode).send(response);
        }


       const vesselTosave = await Promise.all(req.body.map(async (vessel: any) => {
       
        const { vesselDetails, industry } = vessel;

        // Validate required fields
        if (!vesselDetails) {
            const response = failureResponse({
                handler: "fleet",
                messageCode: "E007",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }

        // if (
        //     !vesselDetails.vesselName || 
        //     !vesselDetails.shipName || 
        //     !vesselDetails.engineType?.name || 
        //     !vesselDetails.shipBuilt?.name ||
        //     !vesselDetails.DWT?.name || 
        //     !vesselDetails.GT?.name ||
        //     !vesselDetails.imoNumber?.name
        // ) {
        //     const response = failureResponse({
        //         handler: "fleet",
        //         messageCode: "E009",
        //         req: req,
        //     });
        //     return res.status(response?.statusCode).send(response);
        // }
       

        let industryId = null;
        let industryName = null;

        // Check if the industry exists in the database
        if (typeof industry === "string") {
            const foundIndustry = await industryService.findOneIndustry({ name: industry });

            if (foundIndustry) {
                industryId = foundIndustry._id; // Use the existing industry ID
            } else {
                industryName = industry; // Save the string value as industryName
            }
        }

        // Prepare data for saving
        const dataToSave = {
            recruiter: req.user.recruiter._id,
            industry: industryId, // Save industry ID if found
            industryName, // Save string value if no industry ID is found
            vesselDetails: {
                vesselName: vesselDetails.vesselName,
                shipType: vesselDetails.shipType,
                shipName: vesselDetails.shipName,
                flag: vesselDetails.flag,
                engineType: {
                    name: vesselDetails.engineType.name,
                    visibility: vesselDetails.engineType.visibility !== undefined ? vesselDetails.engineType.visibility : false,
                },
                cargoType: {
                    name: vesselDetails.cargoType.name,
                    visibility: vesselDetails.cargoType.visibility !== undefined ? vesselDetails.cargoType.visibility : false,
                },
                shipBuilt: {
                    name: vesselDetails.shipBuilt.name,
                    visibility: vesselDetails.shipBuilt.visibility !== undefined ? vesselDetails.shipBuilt.visibility : false,
                },
                DWT: {
                    name: vesselDetails.DWT.name,
                    visibility: vesselDetails.DWT.visibility !== undefined ? vesselDetails.DWT.visibility : false,
                },
                GT: {
                    name: vesselDetails.GT.name,
                    visibility: vesselDetails.GT.visibility !== undefined ? vesselDetails.GT.visibility : false,
                },
                imoNumber: {
                    name: vesselDetails.imoNumber.name,
                    visibility: vesselDetails.imoNumber.visibility !== undefined ? vesselDetails.imoNumber.visibility : false,
                },
            },
        };

        // Save data using fleet service
        const savedFleet = await fleetService.save(dataToSave);
        return savedFleet;
       }))

        // Return success response
        const response = successResponse({
            handler: "fleet",
            messageCode: "S002",
            data: vesselTosave,
        });
        return res.status(response.statusCode).send(response);
    } catch (error) {
        errorLogger("Error in addBulkFleetRoute function", error);

        const response = failureResponse({
            handler: "fleet",
            messageCode: "E002",
            error,
        });
        return res.status(response.statusCode).send(response);
    }
};