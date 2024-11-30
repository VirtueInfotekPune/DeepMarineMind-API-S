import { dataLogger, errorLogger, infoLogger } from "../../core/logger";
import { courseModel } from "../../models/cabdidateDetails/course";


interface CourseService {
    save : (data : any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const courseService : CourseService = {
    save : async (data : any) => {
        try{
            infoLogger("START:- save function in course service");
            const result = await courseModel.create(data);
            dataLogger("result of save", result);
            return result;
        }catch(error){
            errorLogger("error in save function in course service", error);
            throw error;
        }
    },

    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in course service");
            const result = await courseModel.updateOne(filter , payload);
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in course service", error);
            throw error;
        }
    },

    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in course service");
            const result = await courseModel.findOneAndDelete(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in course service", error);
            throw error;
        }
    },

    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in course service");
            const result = await courseModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in course service", error);
            throw error;
        }
    },

    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in course service");
            const result = await courseModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in course service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in course service");
            const result = await courseModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in course service", error);
            throw error;
        }
    }
}

export default courseService