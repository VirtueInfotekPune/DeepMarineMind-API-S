import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import { personalDetailsModel } from "../../models/cabdidateDetails/personalDetails";

interface PersonalDetailsService {
    save : (data : any, session?: any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const personalDetailsService : PersonalDetailsService = {
    save: async (data: any, session: any) => {
        try {
            infoLogger("START:- save function in personal details service");
            const result = await personalDetailsModel.create(data, { session });
            dataLogger("result of save", result);
            return result;
        } catch (error) {
            errorLogger("error in save function in personal details service", error);
            throw error;
        }
    },
    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in personal details service");
            const result = await personalDetailsModel.updateOne(filter , payload);
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in personal details service", error);
            throw error;
        }
    },
    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in personal details service");
            const result = await personalDetailsModel.deleteOne(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in personal details service", error);
            throw error;
        }
    },
    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in personal details service");
            const result = await personalDetailsModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in personal details service", error);
            throw error;
        }
    },
    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in personal details service");
            const result = await personalDetailsModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in personal details service", error);
            throw error;
        }
    },
    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in personal details service");
            const result = await personalDetailsModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in personal details service", error);
            throw error;
        }
    }
}

export default personalDetailsService