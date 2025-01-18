import { infoLogger, errorLogger, dataLogger } from "../../../core/logger";
import { userDocument } from "../../../models/user";
import bcrypjs from "bcryptjs";
import { userService } from "../../../services/user";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";

export const updateUserRoute = async (req: any, res: any) => {
  infoLogger("START:- updateUserRoute function");
  dataLogger("req.body", req.body);

  try {
    const body: userDocument = req.body;

    const requestUser: userDocument = req.user; 

    dataLogger("requestUser", requestUser);

    if (body.password && requestUser.type !== "superadmin" ) {
      if (requestUser.firstTimePasswordChange === false) {
        const response = failureResponse({
          handler: "user",
          messageCode: "E010",
          req,
        });
        return res.status(response?.statusCode).send(response);
      }

      const password = await bcrypjs.hash(body.password, 10);

      const result = await userService.updateUser(
        { _id: requestUser._id },
        {
          password : password,
          firstTimePasswordChange : false
        }
      );

      const response = successResponse({
        handler: "user",
        data: result,
        messageCode: "S006",
      });
      return res.status(response?.statusCode).send(response);
    } else if (body.email) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E008",
        req,
      });
      return res.status(response?.statusCode).send(response);
    } 
    else if (body.phone) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E009",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const filter = {} as any;

    if (requestUser.type == "superadmin") {
      filter._id = body.id;
    } else {
      filter._id = requestUser._id;
    }

    const result = await userService.updateUser(filter, body);

    if (!result) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E004",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: "user",
      data: result,
      messageCode: "S002",
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in updateUserRoute function", error);

    const response = catchResponse({
      handler: "user",
      messageCode: "E004",
      req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const userProfile = async (req: any, res: any) => {
  try {
    const user = req.user;

    const response = successResponse({
      handler: "user",
      data: {
        userData: { ...user._doc, password: undefined },
      },
      messageCode: "S005",
      req,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in userProfile function", error);

    const response = catchResponse({
      handler: "user",
      messageCode: "E006",
      req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const updateUserProfileRoute = async (req: any, res: any) => {
  infoLogger("START:- updateUserProfileRoute function");
  dataLogger("req.body", req.body);

  try {
    const body: userDocument = req.body;
    const requestUser: userDocument = req.user;

    dataLogger("requestUser", requestUser);

     // Prevent updating email or password
    if (body.email || body.password) {
      const response = failureResponse({
        handler: "user",
        messageCode: body.email ? "E008" : "E010",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const filter = { _id: requestUser._id };

    // Directly use req.body for the update
    const result = await userService.updateUser(filter, body);

    if (!result) {
      const response = failureResponse({
        handler: "user",
        messageCode: "E004",
        req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: "user",
      messageCode: "S007",
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("Error in updateUserProfileRoute function", error);

    const response = catchResponse({
      handler: "user",
      messageCode: "E004",
      req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

// export const updateUserProfileRoute = async (req: any, res: any) => {
//   infoLogger("START:- updateUserProfileRoute function");
//   dataLogger("req.body", req.body);
//   dataLogger("req.query", req.query);

//   try {
//     const body: Partial<userDocument> = req.body;
//     const { id } = req.query; // Team member ID
//     const requestUser: userDocument = req.user;

//     dataLogger("requestUser", requestUser);

//     // Check if the user is a recruiter and handle accordingly
//     if (requestUser.type === "recruiter") {
//       // If the recruiter is a super admin, no need for team member ID
//       if (requestUser.role === "superadmin") {
//         // Super admin recruiters can update any profile without needing the team member ID
//         if (body.email || body.password) {
//           const response = failureResponse({
//             handler: "user",
//             messageCode: body.email ? "E008" : "E010", // Prevent email/password update
//             req,
//           });
//           return res.status(response?.statusCode).send(response);
//         }
//         // Update the recruiter field when superadmin is updating a profile
//         if (id && id !== requestUser.id) {
//           body.recruiter = requestUser.id; // Set the recruiter field to the superadmin's ID
//         }
//       } else if (!id) {
//         // Regular recruiters need the team member ID to update team member profiles
//         const response = failureResponse({
//           handler: "user",
//           messageCode: "E013", // Missing team member ID
//           req,
//         });
//         return res.status(response?.statusCode).send(response);
//       }
//     }

//     if (body.email || body.password) {
//       const response = failureResponse({
//         handler: "user",
//         messageCode: body.email ? "E008" : "E010", // Prevent email/password update
//         req,
//       });
//       return res.status(response?.statusCode).send(response);
//     }

//     let messageCode = "S007"; // Default message for profile update success

//     // Logic for recruiter token
//     if (requestUser.type === "recruiter") {
//       if (id && id !== requestUser.id) {
//         // Recruiter updating team member profile
//         const teamMember = await userService.findOneUserInUsers(id);

//         if (!teamMember) {
//           const response = failureResponse({
//             handler: "user",
//             messageCode: "E011", // Team member not found
//             req,
//           });
//           return res.status(response?.statusCode).send(response);
//         }

//         messageCode = "S008"; // Message for updating team profile
//       } else {
//         // Recruiter updating their own profile
//         messageCode = "S007"; // Message for own profile update
//       }
//     }

//     // Student token: Update their own profile (use their own ID)
//     const filter = requestUser.type === "candidate" ? { _id: requestUser.id } : { _id: id };
//     const result = await userService.updateUser(filter, body);

//     if (!result) {
//       const response = failureResponse({
//         handler: "user",
//         messageCode: "E004", // Update failed
//         req,
//       });
//       return res.status(response?.statusCode).send(response);
//     }

//     const response = successResponse({
//       handler: "user",
//       messageCode: messageCode, // Use appropriate success message code
//       data: result,
//     });
//     return res.status(response?.statusCode).send(response);
//   } catch (error) {
//     errorLogger("Error in updateUserProfileRoute function", error);

//     const response = catchResponse({
//       handler: "user",
//       messageCode: "E004", // General error
//       req,
//       error: error,
//     });
//     return res.status(response?.statusCode).send(response);
//   }
// };


