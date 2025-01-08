import { USER_ROLE } from "../../../constants/types/userRole";
import { USER_TYPE } from "../../../constants/types/userType";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";
import {
  tempSignupDocument,
  TempSignupModel,
} from "../../../models/tempSignup";
import { userDocument, UserModel } from "../../../models/user";
import mongooseService from "../../../services/mongoose";
import { FilterQuery, QueryOptions } from "mongoose";
import { dataLogger, infoLogger } from "../../../core/logger";
import { recruiterService } from "../../../services/recruiter";
import { recruiterDocument } from "../../../models/recruiter";
import messageCode from "../../../error-code";

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
    const user = req.user;

    if (user.type !== "recruiter" && user.role !== "superadmin") {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E010",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const { email, phone, ...updateFields } = req.body;

    const updateRecruiter = await recruiterService.update(
      { _id: user.recruiter._id },
      updateFields
    );

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

export const addTeamRoute = async (req: any, res: any) => {
  try {
    const { email} = req.body;
    let body = req.body;

    const user: userDocument = await mongooseService.findOne(UserModel, {
      email,
    });

    if (user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E002",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    // const tempUser = await mongooseService.findOne(TempSignupModel , {
    //   email
    // })

    // dataLogger("tempUser", tempUser);

    // if(tempUser) {
    //   const response = failureResponse({  
    //     handler: "recruiter",
    //     messageCode: "E014",
    //     req: req,
    //   });
    //   return res.status(response?.statusCode).send(response);
    // }

    body.recruiter = req.user.recruiter._id;
    body.type = USER_TYPE.RECRUITER;
    body.role = USER_ROLE.Team;
    const stringifyPayload = JSON.stringify(body);

    const newBody: tempSignupDocument = {
      ...body,
      createdBy: req.user._id,
      payload: stringifyPayload,
      emailOtp: null,
      otpExpiry: null,
    };

    const tempUserCreated = await mongooseService.update(TempSignupModel , {email} , newBody , {upsert : true , new : true});

    const response = successResponse({
      handler: "recruiter",
      messageCode: "S006",
      data: tempUserCreated,
      req: req,
    });
    return res.status(response.statusCode).send(response);
  } catch (error) {
    const response = catchResponse({
      handler: "recruiter",
      messageCode: "E012",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const getRecruiterByIdRoute = async (req: any, res: any) => {
  try {
      infoLogger("START:- getRecruiterByIdRoute function");

   

      if (req.query.id) {
          const recruiter = await recruiterService.findOne({ _id: req.query.id });
          const response = successResponse({
              handler: "recruiter",
              messageCode: "S001",
              data: recruiter,
              req: req,
          });
          return res.status(response.statusCode).send(response);
      }

      const filter = {} as FilterQuery<recruiterDocument>;
      const options = {
          page : req.query.page || 1,
          limit : req.query.limit || 10,
          sort: { createdAt: -1 },
      } as QueryOptions<recruiterDocument>;

      if(req.query.search) {
          filter.$or = [
              { organisationName: { $regex: req.query.search, $options: "i" } },
              { companyEmail: { $regex: req.query.search, $options: "i" } },
              { companyPhone: { $regex: req.query.search, $options: "i" } },
          ];
      }

      const recruiter = await recruiterService.paginate(filter, options);
      
      const response = successResponse({
          handler: "recruiter",
          messageCode: "S001",
          data: recruiter,
          req: req,
      });
      return res.status(response.statusCode).send(response);
  } catch (error) {
      const response = catchResponse({
          handler: "recruiter",
          messageCode: "E006",
          req: req,
          error: error,
      });
      return res.status(response.statusCode).send(response);
  }
}

export const getTeamMembersRoutes = async (req: any, res: any) => {
  try {

    const user = req.user;
    const filter = {} as FilterQuery<tempSignupDocument>;

    filter.recruiter = user.recruiter._id;
    filter.type = USER_TYPE.RECRUITER;
    filter.role = USER_ROLE.Team;


    const teamMembers = await recruiterService.findTeamMembers(filter);

    const response = successResponse({
      handler: "recruiter",
      messageCode: "S007",
      data: teamMembers,
      req: req,
    });
    return res.status(response.statusCode).send(response);

    
  } catch (error) {

    const response = catchResponse({
      handler: "recruiter",
      messageCode: "E013",
      req: req,
      error: error,
    });
    return res.status(response.statusCode).send(response);
    
  }
}

export const updateTeamMemberRoute = async (req: any, res: any) => {
  try {
    const user = req.user; // Extract logged-in user details
    const teamMemberId = req.query.id; // Extract the ID from query parameters
    const updateData = req.body; // Data to update team member fields

    // Ensure the user is a recruiter
    if (user.type !== USER_TYPE.RECRUITER) {
      return res.status(403).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E015",
          req,
        })
      );
    }

    // Validate the team member ID
    if (!teamMemberId) {
      return res.status(400).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E018",
          req,
        })
      );
    }

    // Construct filter with recruiter-specific validations
    const filter: FilterQuery<any> = {
      _id: teamMemberId,
      recruiter: user.recruiter._id, // Ensure the team member belongs to the recruiter
      type: USER_TYPE.RECRUITER,
      role: USER_ROLE.Team,
    };

    // Find the team member based on the filter
    const teamMember = await recruiterService.findTeamMembers(filter);

    if (!teamMember || teamMember.length === 0) {
      return res.status(404).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E016",
          req,
        })
      );
    }

    // Update the team member with provided data
    const updatedTeamMember = await recruiterService.updateTeamMember(
      filter,
      updateData
    );

    // Respond with success if update is successful
    return res.status(200).send(
      successResponse({
        handler: "recruiter",
        messageCode: "S008",
        data: updatedTeamMember,
        req,
      })
    );
  } catch (error) {
    // Handle errors and send a formatted response
    return res.status(500).send(
      catchResponse({
        handler: "recruiter",
        messageCode: "E017",
        req,
        error,
      })
    );
  }
};


export const deleteTeamMemberRoute = async (req: any, res: any) => {
  try {
    const user = req.user; // Extract logged-in user details
    const teamMemberId = req.query.id; // Extract the ID from query parameters

    // Ensure the user is a recruiter
    if (user.type !== USER_TYPE.RECRUITER) {
      return res.status(403).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E015",
          req,
        })
      );
    }

    // Validate the team member ID
    if (!teamMemberId) {
      return res.status(400).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E018",
          req,
        })
      );
    }

    // Construct filter with recruiter-specific validations
    const filter: FilterQuery<any> = {
      _id: teamMemberId,
      recruiter: user.recruiter._id, // Ensure the team member belongs to the recruiter
      type: USER_TYPE.RECRUITER,
      role: USER_ROLE.Team,
    };

    // Find and delete the team member
    const deletedTeamMember = await recruiterService.deleteTeamMember(filter);

    // If the team member was not found
    if (!deletedTeamMember) {
      return res.status(404).send(
        successResponse({
          handler: "recruiter",
          messageCode: "E016",
          req,
        })
      );
    }

    // Respond with success if delete is successful
    return res.status(200).send(
      successResponse({
        handler: "recruiter",
        messageCode: "S009", // Success message code for deletion
        data: deletedTeamMember,
        req,
      })
    );
  } catch (error) {
    // Handle errors and send a formatted response
    return res.status(500).send(
      catchResponse({
        handler: "recruiter",
        messageCode: "E020", // Error message code for server error
        req,
        error,
      })
    );
  }
};
