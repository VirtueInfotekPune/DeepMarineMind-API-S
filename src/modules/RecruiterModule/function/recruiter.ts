import { catchResponse, failureResponse, successResponse } from "../../../core/response";
import { recruiterService } from "../../../services/recruiter";



// export const updateRecruiterRoute = async (req: any, res: any) => {

//     let session;
//     let connection;

//     try {
//         connection = await openDBConnection();
//         const user = req.user;

//         // Check if user is recruiter
//         if (user.type !== "recruiter") {
//             const response = failureResponse({
//                 handler: "recruiter",
//                 messageCode: "E010",
//                 req: req,
//             });
//             return res.status(response?.statusCode).send(response);
//         }

//         // Remove email and phone from request body to prevent updates
//         const { email, phone, ...updateFields } = req.body;

//         // Start transaction
//         if (!connection) {
//             throw new Error('Database connection not found');
//         }
//         session = await connection.startSession();
//         session.startTransaction();

//         // Fields that can be updated in both user and recruiter collections
//         const commonFields = [
//             'name', 'image', 'country', 'city', 'state', 
//             'address1', 'address2', 'pincode', 'nearestAirport', 
//             'socialLink', 'status'
//         ];

//         // Create separate update objects for user and recruiter
//         const userUpdateFields: any = {};
//         const recruiterUpdateFields: any = {};

//         // Sort fields into appropriate update objects
//         Object.entries(updateFields).forEach(([key, value]) => {
//             if (commonFields.includes(key)) {
//                 userUpdateFields[key] = value;
//                 recruiterUpdateFields[key] = value;
//             } else {
//                 // Fields specific to recruiter
//                 if (['organisationName', 'aboutCompany'].includes(key)) {
//                     recruiterUpdateFields[key] = value;
//                 }
//             }
//         });

//         // Update user document
//         if (Object.keys(userUpdateFields).length > 0) {
//             const updatedUser = await UserModel.findByIdAndUpdate(
//                 user._id,
//                 { $set: userUpdateFields },
//                 { session, new: true }
//             );

//             if (!updatedUser) {
//                 const response = failureResponse({
//                     handler: "recruiter",
//                     messageCode: "E004",
//                     req: req,
//                 })
//                 return res.status(response?.statusCode).send(response);
//             }
//         }

//         // Update recruiter document
//         if (Object.keys(recruiterUpdateFields).length > 0) {
//             const updatedRecruiter = await RecruiterModel.findByIdAndUpdate(
//                 user.recruiter._id,
//                 { $set: recruiterUpdateFields },
//                 { session, new: true }
//             );

//             if (!updatedRecruiter) {
//                 const response = failureResponse({
//                     handler: "recruiter",
//                     messageCode: "E004",
//                     req: req,
//                 })
//                 return res.status(response?.statusCode).send(response);
//             }
//         }

//         // Explicitly commit the transaction
//         await session.commitTransaction();

//         // Fetch updated data after successful commit
//         const updatedUser = await UserModel.findById(user._id)
//             .populate('recruiter')
//             .lean();

//         const response = successResponse({
//             handler: "recruiter",
//             messageCode: "S002",
//             data: {...updatedUser , password : undefined},
//             req: req,
//         });

//         return res.status(response.statusCode).send(response);

//     } catch (error) {
//         // Abort transaction on error if session exists
//         if (session) {
//             await session.abortTransaction();
//         }

//         const response = catchResponse({
//             handler: "recruiter",
//             messageCode: "E004",
//             req: req,
//             error: error,
//         });
//         return res.status(response?.statusCode).send(response);
//     } finally {
//         // End session if it exists
//         if (session) {
//             await session.endSession();
//         }

//     }
// };


export const updateRecruiterRoute = async (req: any, res: any) => {
    try {
        const user = req.user

        if (user.type !== "recruiter" && user.role !== "superadmin") {
            const response = failureResponse({
                handler: "recruiter",
                messageCode: "E010",
                req: req,
            });
            return res.status(response?.statusCode).send(response);
        }
        const { email, phone, ...updateFields } = req.body

        const updateRecruiter = await recruiterService.update({ _id: user.recruiter._id }, updateFields)

        const response = successResponse({
            handler: "recruiter",
            messageCode: "S002",
            data: updateRecruiter,
            req: req,
        });
        return res.status(response.statusCode).send(response);


    } catch (error) {

        const response = catchResponse({
            handler: "recruiter",
            messageCode: "E004",
            req: req,
            error: error,
        });
        return res.status(response?.statusCode).send(response);

    }
};