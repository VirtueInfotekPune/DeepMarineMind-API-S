import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import {UserModel ,  userDocument } from "../models/user";

export const userService = {
    updateUser: async (filter: any, body: any) => {
        infoLogger("START:- updateUser function");
        try {
            const result = await UserModel.findOneAndUpdate(filter, body, { new: true });
            return result;
            
        } catch (error) {
            errorLogger("error in updateUser function", error);
            throw error;
            
        }
    }
    
};



