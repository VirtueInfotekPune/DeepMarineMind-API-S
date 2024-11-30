import { dataLogger, errorLogger, infoLogger } from "../../core/logger";
import{activitiesModel} from "../../models/cabdidateDetails/activities";


interface ActivityService{
    save : (data : any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const activityService : ActivityService = {
    save : async (data : any) => {
        try{
            infoLogger("START:- save function in activity service");
            const result = await activitiesModel.create(data);
            dataLogger("result of save", result);
            return result;
        }catch(error){
            errorLogger("error in save function in activity service", error);
            throw error;
        }
    },
    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in activity service");
            const result = await activitiesModel.findOneAndUpdate(filter, payload, { new: true }).exec();
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in activity service", error);
            throw error;
        }
    },

    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in activity service");
            const result = await activitiesModel.deleteOne(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in activity service", error);
            throw error;
        }
    },

    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in activity service");
            const result = await activitiesModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in activity service", error);
            throw error;
        }
    },

    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in activity service");
            const result = await activitiesModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in activity service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in activity service");
            const result = await activitiesModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in activity service", error);
            throw error;
        }
    },  
}

export default activityService