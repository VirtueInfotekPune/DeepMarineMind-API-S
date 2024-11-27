import { dataLogger, errorLogger, infoLogger } from "../core/logger";
import { experienceModel } from "../models/experience";


interface ExperienceService{
    save : (data : any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const experienceService : ExperienceService = {
    save : async (data : any) => {
        try{
            infoLogger("START:- save function in experience service");
            const result = await experienceModel.create(data);
            dataLogger("result of save", result);
            return result;
        }catch(error){
            errorLogger("error in save function in experience service", error);
            throw error;
        }
    },

    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in experience service");
            const result = await experienceModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in experience service", error);
            throw error;
        }
    },

    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in experience service");
            const result = await experienceModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in experience service", error);
            throw error;
        }
    },

    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in experience service");
            const result = await experienceModel.findOneAndUpdate(filter , payload , {new : true});
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in experience service", error);
            throw error;
        }
    },

    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in experience service");
            const result = await experienceModel.findOneAndDelete(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in experience service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in experience service");
            const result = await experienceModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in experience service", error);
            throw error;
        }
    }
}

export default experienceService;