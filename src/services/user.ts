import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import { TempSignupModel } from "../models/tempSignup";
import {UserModel ,  userDocument } from "../models/user";

export const userService = {
    updateUser: async (filter: any, body: any) => {
        infoLogger("START:- updateUser function");
        try {
            const result  : userDocument= await UserModel.findOneAndUpdate(filter, body, { new: true }).select('-password');
            return result;
            
        } catch (error) {
            errorLogger("error in updateUser function", error);
            throw error;
            
        }
    },

     findOneUser : async (filter : any) => {
            try {
                infoLogger("START:- findOneUser function in mongoose service");
                const result = await TempSignupModel.findOne(filter);
                dataLogger("result of findOneUser", result);
                return result;
            } catch (error) {
                errorLogger("error in findOneUser function in mongoose service", error);
                throw error;
            }
        }
     
};



