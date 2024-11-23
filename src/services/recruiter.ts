import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import { recruiterDocument, RecruiterModel } from "../models/recruiter";

export const recruiterService = {
    update : async (filter : any  , payload : recruiterDocument ) => {
        try {
            infoLogger("START:- update function in recruiter service");
            const result = await RecruiterModel.findOneAndUpdate(filter , payload , {new : true});
            dataLogger("result of update", result);
            return result;
          } catch (error) {
            errorLogger("error in update function in recruiter service", error);
            throw error;
          }

    }
}