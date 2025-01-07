import { paginate } from "mongoose-paginate-v2";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import { recruiterDocument, RecruiterModel } from "../models/recruiter";
import { TempSignupModel } from "../models/tempSignup";

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

    },

    findOne : async (filter : any) => {
        try {
            infoLogger("START:- findOne function in recruiter service");
            const result = await RecruiterModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
          } catch (error) {
            errorLogger("error in findOne function in recruiter service", error);
            throw error;
          }
    },

    paginate : async (filter : any , options : any) => {
        try {
            infoLogger("START:- paginate function in recruiter service");
            const result = await RecruiterModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
          } catch (error) {
            errorLogger("error in paginate function in recruiter service", error);
            throw error;
          }
    },

    findTeamMembers : async (filter : any) => {
        try {
            infoLogger("START:- findTeamMembers function in recruiter service");
            const result = await TempSignupModel.find(filter);
            dataLogger("result of findTeamMembers", result);
            return result;
          } catch (error) {
            errorLogger("error in findTeamMembers function in recruiter service", error);
            throw error;
          }
    },

    updateTeamMember: async (teamMemberId: string, updateData: any) => {
      try {
        infoLogger("START:- updateTeamMember function in recruiter service");
        const result = await TempSignupModel.findByIdAndUpdate(
          teamMemberId,
          updateData,
          { new: true }
        );
        dataLogger("result of updateTeamMember", result);
        return result;
      } catch (error) {
        errorLogger("error in updateTeamMember function in recruiter service", error);
        throw error;
      }
    }


}