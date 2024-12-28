import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import {educationModel} from "../../models/cabdidateDetails/education";

interface EducationService{
    save : (data : any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const educationService : EducationService = {
    save : async (data : any) => {
        try{
            infoLogger("START:- save function in education service");
            const result = await educationModel.create(data);
            dataLogger("result of save", result);
            return result;
        }catch(error){
            errorLogger("error in save function in education service", error);
            throw error;
        }
    },
    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in education service");
            const result = await educationModel.updateOne(filter , payload);
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in education service", error);
            throw error;
        }
    },
    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in education service");
            const result = await educationModel.findOneAndDelete(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in education service", error);
            throw error;
        }
    },
    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in education service");
            const result = await educationModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in education service", error);
            throw error;
        }
    },

    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in education service");
            const result = await educationModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in education service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in education service");
            const result = await educationModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in education service", error);
            throw error;
        }
    },
}

export default educationService;