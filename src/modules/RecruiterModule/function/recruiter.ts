import { FilterQuery, QueryOptions } from "mongoose";
import { USER_ROLE } from "../../../constants/types/userRole";
import { USER_TYPE } from "../../../constants/types/userType";
import { errorLogger, infoLogger } from "../../../core/logger";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";
import { recruiterDocument } from "../../../models/recruiter";
import {
  tempSignupDocument,
  TempSignupModel,
} from "../../../models/tempSignup";
import { userDocument, UserModel } from "../../../models/user";
import mongooseService from "../../../services/mongoose";
import { recruiterService } from "../../../services/recruiter";
import { userService } from "../../../services/user";



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
    const { email, ...updateFields } = req.body;

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
    const { email } = req.body;
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

    const tempUserCreated = await mongooseService.update(TempSignupModel, { email }, newBody, { upsert: true, new: true });

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
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: { createdAt: -1 },
    } as QueryOptions<recruiterDocument>;

    if (req.query.search) {
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
    const filter = {} as FilterQuery<tempSignupDocument>;

    // Validate user type and role
    if (req.user.type !== 'recruiter' && req.user.role !== 'superadmin') {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E022",
        req: req,
      });
      return res.status(response.statusCode).send(response);
    }

    // Set filters for the query
    filter.recruiter = req.user.recruiter._id;
    filter.type = USER_TYPE.RECRUITER;
    filter.role = USER_ROLE.Team;

  

    // Perform aggregation
    const result = await TempSignupModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "users", // The name of the user collection
          localField: "email",
          foreignField: "email",
          as: "userDetails",
          pipeline: [
            {
              $project: {
                password: 0, // Exclude the password field
              },
            },
          ],
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$userDetails",
                  as: "user",
                  cond: { $eq: ["$$user.emailVerified", true] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          combinedData: { $mergeObjects: ["$$ROOT", "$user"] }, // Merge root document with user data
        },
      },
      {
        $replaceRoot: { newRoot: "$combinedData" }, // Replace the root document with combined data
      },
      {
        $project: {
          user: 0, 
          
        },
      },
    ]);

    // Respond with success
    const response = successResponse({
      handler: "recruiter",
      messageCode: "S007",
      data: result,
      req: req,
    });
    return res.status(response.statusCode).send(response);
  } catch (error) {
    // Handle errors
    const response = catchResponse({
      handler: "recruiter",
      messageCode: "E013",
      req: req,
      error: error,
    });
    return res.status(response.statusCode).send(response);
  }
};




export const updateTeamMemberRoute = async (req: any, res: any) => {
  try {
    const user = req.user; // Extract logged-in user details
    const { id, ...payload } = req.body; // Extract the ID from query parameters

    // Ensure the user is a recruiter
    if (user.role !== 'superadmin' && user.type !== 'recruiter') {
      const reponse = failureResponse({
        handler: "recruiter",
        messageCode: "E015",
        req,
      })
      return res.status(reponse.statusCode).send(reponse);
    }

    // Validate the team member ID
    if (!id) {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E018",
        req,
      })
      return res.status(response.statusCode).send(response);
    }

    // Construct filter with recruiter-specific validations
    const filter: FilterQuery<tempSignupDocument> = {
      _id: id,
      recruiter: user.recruiter._id,
      type: USER_TYPE.RECRUITER,
      role: USER_ROLE.Team,
    };

    // Find the team member based on the filter
    const teamMember = await recruiterService.findTeamMembers(filter);

    if (!teamMember) {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E016",
        req,
      })
      return res.status(response.statusCode).send(response);
    }

    if (teamMember.emailVerified === false) {
      // Update the team member with provided data
      const updatedTeamMember = await recruiterService.updateTeamMember(
        { _id: id },
        payload
      );

      // Respond with success if update is successful
      const response = successResponse({
        handler: "recruiter",
        messageCode: "S008",
        data: updatedTeamMember,
        req,
      })

      return res.status(response.statusCode).send(response);

    }

    const userQuery = {
      email: teamMember.email
    } as FilterQuery<userDocument>;

    const { email, ...userPayload } = req.body;

    const updateUser = await userService.updateUser(userQuery, userPayload);


    const response = successResponse({
      handler: "recruiter",
      messageCode: "S008",
      data: updateUser,
      req,
    })

    return res.status(response.statusCode).send(response);


  } catch (error) {
    // Handle errors and send a formatted response
    errorLogger("error in updateTeamMemberRoute", error);
    const response = catchResponse({
      handler: "recruiter",
      messageCode: "E017",
      req,
      error,
    })

    return res.status(response.statusCode).send(response);
  }
};




export const deleteTeamMemberRoute = async (req: any, res: any) => {
  try {
    const user = req.user; // Extract logged-in user details
    const { email } = req.body; // Extract the ID from query parameters
    console.log("user", req.user)

    // Ensure the user is a recruiter
    if (user.role !== 'superadmin') {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E021",
        req,
      })
      return res.status(response.statusCode).send(response);
    }

    // Validate the team member ID
    if (!email) {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E018",
        req,
      })
      return res.status(response.statusCode).send(response);
    }

    // Construct filter with recruiter-specific validations
    const filter: FilterQuery<tempSignupDocument> = {
      email,
      recruiter: user.recruiter._id,
      type: USER_TYPE.RECRUITER,
      role: USER_ROLE.Team,
    };

    // Find and delete the team member
    const deletedTeamMember = await recruiterService.deleteTeamMember(filter);

    // If the team member was not found
    if (!deletedTeamMember) {
      const response = failureResponse({
        handler: "recruiter",
        messageCode: "E016",
        req,
      })
      return res.status(response.statusCode).send(response);
    }

    // Respond with success if delete is successful
    const response = successResponse({
      handler: "recruiter",
      messageCode: "S009", // Success message code for deletion
      data: deletedTeamMember,
      req,
    })
    return res.status(response.statusCode).send(response);
  } catch (error) {
    // Handle errors and send a formatted response
    const response = catchResponse({
      handler: "recruiter",
      messageCode: "E020", // Error message code for server error
      req,
      error,
    })
    return res.status(response.statusCode).send(response);
  }
};
